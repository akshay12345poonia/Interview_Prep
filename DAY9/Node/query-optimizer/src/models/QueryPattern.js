
const mongoose = require('mongoose');

const queryPatternSchema = new mongoose.Schema(
  {
    collectionName: {
      type: String,
      required: true,
      index: true,
    },
    filters: {
      type: Map,
      of: String,
    },
    filterKeys: [String],
    frequency: {
      type: Number,
      default: 1,
    },
    executionTime: {
      type: Number,
      default: 0,
    },
    lastExecuted: {
      type: Date,
      default: Date.now,
    },
  },
  { 
    timestamps: true,
    collection: 'query_patterns',
    suppressReservedKeysWarning: true
  }
);

queryPatternSchema.index({ collectionName: 1, filterKeys: 1 });

module.exports = mongoose.model('QueryPattern', queryPatternSchema);