const express = require('express');
const eventRoutes = require('./routes/eventRoutes');
const FileWatcher = require('./services/fileWatcher');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/events', eventRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'File Watcher API',
    endpoints: {
      getAllEvents: 'GET /api/events',
      getEventById: 'GET /api/events/:id',
      getEventsByType: 'GET /api/events/type/:type',
      clearEvents: 'DELETE /api/events'
    }
  });
});

// Initialize File Watcher
const watchDirectory = process.env.WATCH_DIRECTORY || './watched-folder';
const fileWatcher = new FileWatcher(watchDirectory);
fileWatcher.start();

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested resource was not found'
  });
});

module.exports = app;