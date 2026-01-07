const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Import middleware
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTTP request logger (morgan)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Custom logging middleware (applied globally)
app.use(logger);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// 404 handler
// app.use('*', (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: `Route ${req.originalUrl} not found`
//   });
// });

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Global error handler (must be last)
app.use(errorHandler);

module.exports = app;