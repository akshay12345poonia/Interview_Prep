require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/database');

// Environment variables
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Connect to MongoDB
connectDB();

// Start server
const server = app.listen(PORT, () => {
  console.log('\n' + '='.repeat(50));
  console.log('🚀 Blog System API Server Started');
  console.log('='.repeat(50));
  console.log(`📍 Environment: ${NODE_ENV}`);
  console.log(`🌐 Server: http://localhost:${PORT}`);
  console.log(`🔗 API Base: http://localhost:${PORT}/api/v1`);
  console.log(`💚 Health Check: http://localhost:${PORT}/health`);
  console.log('='.repeat(50) + '\n');
  
  console.log('📚 Available Endpoints:');
  console.log(`   Users:    http://localhost:${PORT}/api/v1/users`);
  console.log(`   Posts:    http://localhost:${PORT}/api/v1/posts`);
  console.log(`   Comments: http://localhost:${PORT}/api/v1/comments`);
  console.log('\n' + '='.repeat(50) + '\n');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Handle SIGTERM
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('✅ Process terminated');
  });
});