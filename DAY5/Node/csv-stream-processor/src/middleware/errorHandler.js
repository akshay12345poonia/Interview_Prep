/**
 * Global error handling middleware
 */
exports.errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Multer errors
  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        error: 'File size too large',
        message: 'Maximum file size is 100MB'
      });
    }
    return res.status(400).json({
      success: false,
      error: 'File upload error',
      message: err.message
    });
  }

  // File type error
  if (err.message === 'Only CSV files are allowed') {
    return res.status(400).json({
      success: false,
      error: 'Invalid file type',
      message: 'Only CSV files are allowed'
    });
  }

  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Validation error',
      message: err.message
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      error: 'Duplicate entry',
      message: 'Resource already exists'
    });
  }

  // Default server error
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
};