const mongoose = require('mongoose');

const processJobSchema = new mongoose.Schema({
  jobId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  originalFileName: {
    type: String,
    required: true
  },
  inputFilePath: {
    type: String,
    required: true
  },
  outputFilePath: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending',
    index: true
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  totalLines: {
    type: Number,
    default: 0
  },
  processedLines: {
    type: Number,
    default: 0
  },
  error: {
    type: String,
    default: null
  },
  startedAt: {
    type: Date,
    default: null
  },
  completedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Index for faster queries
processJobSchema.index({ createdAt: -1 });

module.exports = mongoose.model('ProcessJob', processJobSchema);