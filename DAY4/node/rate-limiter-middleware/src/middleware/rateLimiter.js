const config = require('../config/rateLimiter.config');
const RateLimit = require('../models/RateLimit');
const logger = require('../utils/logger');

// In-memory store for rate limiting
const requestStore = new Map();

/**
 * Get client IP address
 */
const getClientIp = (req) => {
  return req.ip || 
         req.headers['x-forwarded-for']?.split(',')[0] || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress ||
         'unknown';
};

/**
 * Clean up expired entries from memory store
 */
const cleanupExpiredEntries = () => {
  const now = Date.now();
  for (const [ip, data] of requestStore.entries()) {
    if (now > data.resetTime) {
      requestStore.delete(ip);
    }
  }
};

// Run cleanup every minute
setInterval(cleanupExpiredEntries, 60000);

/**
 * Rate Limiter Middleware
 */
const rateLimiter = async (req, res, next) => {
  try {
    const clientIp = getClientIp(req);
    const now = Date.now();
    
    // Get or create rate limit data for this IP
    let rateLimitData = requestStore.get(clientIp);
    
    if (!rateLimitData || now > rateLimitData.resetTime) {
      // Create new rate limit window
      rateLimitData = {
        count: 0,
        resetTime: now + config.windowMs,
        firstRequestTime: now
      };
      requestStore.set(clientIp, rateLimitData);
    }
    
    // Increment request count
    rateLimitData.count++;
    
    // Calculate remaining requests and reset time
    const remaining = Math.max(0, config.maxRequests - rateLimitData.count);
    const resetTime = new Date(rateLimitData.resetTime);
    const retryAfter = Math.ceil((rateLimitData.resetTime - now) / 1000);
    
    // Set rate limit headers
    if (config.headers) {
      res.setHeader('X-RateLimit-Limit', config.maxRequests);
      res.setHeader('X-RateLimit-Remaining', remaining);
      res.setHeader('X-RateLimit-Reset', resetTime.toISOString());
    }
    
    // Check if limit exceeded
    if (rateLimitData.count > config.maxRequests) {
      res.setHeader('Retry-After', retryAfter);
      
      logger.warn(`Rate limit exceeded for IP: ${clientIp}`);
      
      // Optional: Save to MongoDB for analytics
      try {
        await RateLimit.create({
          ipAddress: clientIp,
          requestCount: rateLimitData.count,
          exceeded: true,
          timestamp: new Date()
        });
      } catch (dbError) {
        // Continue even if MongoDB save fails
        logger.error(`Failed to save rate limit to DB: ${dbError.message}`);
      }
      
      return res.status(config.statusCode).json({
        status: 'error',
        message: config.message,
        retryAfter: `${retryAfter} seconds`,
        limit: config.maxRequests,
        windowMs: config.windowMs
      });
    }
    
    // Log successful request (optional)
    logger.info(`Request from ${clientIp}: ${rateLimitData.count}/${config.maxRequests}`);
    
    next();
  } catch (error) {
    logger.error(`Rate limiter error: ${error.message}`);
    // On error, allow the request to proceed
    next();
  }
};

/**
 * Reset rate limit for a specific IP
 */
const resetRateLimit = (ip) => {
  const deleted = requestStore.delete(ip);
  logger.info(`Rate limit reset for IP: ${ip}, Success: ${deleted}`);
  return deleted;
};

/**
 * Reset all rate limits
 */
const resetAllRateLimits = () => {
  const size = requestStore.size;
  requestStore.clear();
  logger.info(`All rate limits reset. Cleared ${size} entries.`);
  return size;
};

/**
 * Get current rate limit status for an IP
 */
const getRateLimitStatus = (ip) => {
  const data = requestStore.get(ip);
  if (!data) {
    return {
      ip,
      count: 0,
      limit: config.maxRequests,
      remaining: config.maxRequests,
      resetTime: null
    };
  }
  
  const now = Date.now();
  const remaining = Math.max(0, config.maxRequests - data.count);
  
  return {
    ip,
    count: data.count,
    limit: config.maxRequests,
    remaining,
    resetTime: new Date(data.resetTime),
    isExpired: now > data.resetTime
  };
};

/**
 * Get all rate limit statuses
 */
const getAllRateLimitStatuses = () => {
  const statuses = [];
  for (const [ip] of requestStore.entries()) {
    statuses.push(getRateLimitStatus(ip));
  }
  return statuses;
};

module.exports = {
  rateLimiter,
  resetRateLimit,
  resetAllRateLimits,
  getRateLimitStatus,
  getAllRateLimitStatuses
};