require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

// Initialize express app
const app = express();


connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS (if needed for frontend)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Routes
app.use('/api/auth', require('./routes/auth'));

// Home route
app.get('/', (req, res) => {
  res.json({
    message: 'JWT Authentication API',
    version: '1.0.0',
    endpoints: {
      signup: 'POST /api/auth/signup',
      login: 'POST /api/auth/login',
      getUser: 'GET /api/auth/me (Protected)',
      admin: 'GET /api/auth/admin (Admin only)',
      refresh: 'POST /api/auth/refresh (Protected)'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});