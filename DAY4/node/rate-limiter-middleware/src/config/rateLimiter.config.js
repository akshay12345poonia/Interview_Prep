module.exports = {
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 60000, // 1 minute
  maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 10,
  message: 'Too many requests from this IP, please try again later.',
  statusCode: 429,
  headers: true,
  skipSuccessfulRequests: false,
  skipFailedRequests: false
};