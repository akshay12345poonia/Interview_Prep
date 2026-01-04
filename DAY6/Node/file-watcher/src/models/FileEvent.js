const mongoose = require('mongoose');

const fileEventSchema = new mongoose.Schema({
  eventType: {
    type: String,
    required: true,
    enum: ['added', 'modified', 'deleted', 'renamed'],
    index: true
  },
  fileName: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  fileSize: {
    type: Number,
    default: null
  },
  details: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Index for better query performance
fileEventSchema.index({ timestamp: -1 });
fileEventSchema.index({ eventType: 1, timestamp: -1 });

// Virtual for formatted timestamp
fileEventSchema.virtual('formattedTimestamp').get(function() {
  return this.timestamp.toLocaleString();
});

// Ensure virtuals are included in JSON
fileEventSchema.set('toJSON', { virtuals: true });
fileEventSchema.set('toObject', { virtuals: true });

const FileEvent = mongoose.model('FileEvent', fileEventSchema);

module.exports = FileEvent;