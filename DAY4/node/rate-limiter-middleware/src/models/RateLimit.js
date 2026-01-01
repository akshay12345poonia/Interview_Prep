const mongoose = require('mongoose');

const rateLimitSchema = new mongoose.Schema({
  ipAddress: {
    type: String,
    required: true,
    index: true
  },
  requestCount: {
    type: Number,
    required: true
  },
  exceeded: {
    type: Boolean,
    default: false
  },
  timestamp: {
    type: Date,
    default: Date.now,
    expires: 86400 // Auto-delete after 24 hours
  }
});

// Index for faster queries
rateLimitSchema.index({ ipAddress: 1, timestamp: -1 });

module.exports = mongoose.model('RateLimit', rateLimitSchema);