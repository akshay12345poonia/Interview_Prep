const QueryPattern = require('../models/QueryPattern');
const cacheManager = require('../config/cache');

class QueryAnalyzer {
  async analyzeQuery(collection, filters, executionTime = 0) {
    try {
      const filterKeys = Object.keys(filters).sort();
      const cacheKey = `query:${collection}:${filterKeys.join(',')}`;

      // Check cache first
      let pattern = cacheManager.get(cacheKey);

      if (pattern) {
        pattern = await QueryPattern.findByIdAndUpdate(
          pattern._id,
          {
            $inc: { frequency: 1 },
            $set: { lastExecuted: new Date(), executionTime },
          },
          { new: true }
        );
      } else {
        pattern = await QueryPattern.findOneAndUpdate(
          { collection, filterKeys },
          {
            collection,
            filters: new Map(Object.entries(filters)),
            filterKeys,
            executionTime,
            frequency: 1,
          },
          { upsert: true, new: true }
        );
      }

      cacheManager.set(cacheKey, pattern);
      return pattern;
    } catch (error) {
      console.error('Error analyzing query:', error);
      throw error;
    }
  }

  async getQueryPatterns(collection, limit = 10) {
    const cacheKey = `patterns:${collection}`;
    let patterns = cacheManager.get(cacheKey);

    if (!patterns) {
      patterns = await QueryPattern.find({ collection })
        .sort({ frequency: -1 })
        .limit(limit);

      cacheManager.set(cacheKey, patterns);
    }

    return patterns;
  }

  async getCollectionStats(collection) {
    const cacheKey = `stats:${collection}`;
    let stats = cacheManager.get(cacheKey);

    if (!stats) {
      const patterns = await QueryPattern.find({ collection });
      stats = {
        totalQueries: patterns.reduce((sum, p) => sum + p.frequency, 0),
        uniquePatterns: patterns.length,
        avgExecutionTime:
          patterns.reduce((sum, p) => sum + p.executionTime, 0) / patterns.length,
        patterns,
      };

      cacheManager.set(cacheKey, stats);
    }

    return stats;
  }
}

module.exports = new QueryAnalyzer();