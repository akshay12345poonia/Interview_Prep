
const mongoose = require('mongoose');

const indexRecommendationSchema = new mongoose.Schema(
  {
    collectionName: {
      type: String,
      required: true,
      index: true,
    },
    indexFields: [
      {
        field: String,
        direction: { type: Number, enum: [1, -1], default: 1 },
      },
    ],
    priority: {
      type: Number,
      min: 0,
      max: 100,
    },
    reason: String,
    potentialImprovement: Number,
    frequency: Number,
    status: {
      type: String,
      enum: ['pending', 'applied', 'rejected'],
      default: 'pending',
    },
  },
  { 
    timestamps: true,
    collection: 'index_recommendations',
    suppressReservedKeysWarning: true
  }
);

indexRecommendationSchema.index({ collectionName: 1, status: 1 });

module.exports = mongoose.model('IndexRecommendation', indexRecommendationSchema);