const app = require('./src/app');
// const connectDB = require('./src/config/database'); // COMMENTED OUT
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Connect to MongoDB - COMMENTED OUT FOR TESTING
// connectDB();

console.log('⚠️  Running in NO-DATABASE mode (events will only show in console)');

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📁 Watching directory: ${process.env.WATCH_DIRECTORY}`);
  console.log(`🌐 API available at http://localhost:${PORT}/api/events`);
  console.log('📝 Note: Events are NOT being saved to database');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

process.on('SIGINT', () => {
  console.log('\n🛑 SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});