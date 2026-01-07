const timing = (req, res, next) => {
  const start = process.hrtime.bigint();
  
  // Store start time in request
  req.startTime = start;

  // When response finishes
  res.on('finish', () => {
    const end = process.hrtime.bigint();
    const duration = Number(end - start) / 1_000_000; // Convert to milliseconds
    
    // Add timing header
    res.setHeader('X-Response-Time', `${duration.toFixed(2)}ms`);
    
    // Log slow requests (> 1000ms)
    if (duration > 1000) {
      console.warn(`⚠️  Slow request detected: ${req.method} ${req.originalUrl} - ${duration.toFixed(2)}ms`);
    }
  });

  next();
};

// Middleware to get timing in route handlers
const getRequestTiming = (req) => {
  if (!req.startTime) return null;
  const current = process.hrtime.bigint();
  const duration = Number(current - req.startTime) / 1_000_000;
  return duration.toFixed(2);
};

module.exports = { timing, getRequestTiming };