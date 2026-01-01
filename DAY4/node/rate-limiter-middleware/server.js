require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/database');
const logger = require('./src/utils/logger');

const PORT = process.env.PORT || 3000;

// Connect to MongoDB (optional - rate limiter works in-memory)
connectDB();

// Start server
app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
  logger.info(`📝 Environment: ${process.env.NODE_ENV}`);
  logger.info(`⏱️  Rate Limit: ${process.env.RATE_LIMIT_MAX_REQUESTS} requests per ${process.env.RATE_LIMIT_WINDOW_MS}ms`);
});