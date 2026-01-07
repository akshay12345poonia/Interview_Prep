const winston = require('winston');
const path = require('path');

// Configure Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ 
      filename: path.join(__dirname, '../../logs/error.log'), 
      level: 'error' 
    }),
    new winston.transports.File({ 
      filename: path.join(__dirname, '../../logs/combined.log') 
    }),
  ],
});

// Also log to console in development
if (process.env.NODE_ENV === 'development') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

// Middleware function
const loggingMiddleware = (req, res, next) => {
  const start = Date.now();
  
  // Log request
  logger.info({
    type: 'REQUEST',
    method: req.method,
    url: req.originalUrl,
    ip: req.ip || req.connection.remoteAddress,
    userAgent: req.get('user-agent'),
    body: req.method !== 'GET' ? req.body : undefined,
    timestamp: new Date().toISOString()
  });

  // Log response
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info({
      type: 'RESPONSE',
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString()
    });
  });

  next();
};

module.exports = loggingMiddleware;