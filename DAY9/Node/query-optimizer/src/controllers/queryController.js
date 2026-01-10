const QueryPattern = require('../models/QueryPattern');
const cacheManager = require('../config/cache');

const analyzeQuery = async (req, res) => {
  try {
    const { collection, filters, executionTime = 0 } = req.body;

    if (!collection || !filters) {
      return res.status(400).json({
        error: 'collection and filters are required',
      });
    }

    const filterKeys = Object.keys(filters).sort();
    const cacheKey = `query:${collection}:${filterKeys.join(',')}`;

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
        { collectionName: collection, filterKeys },
        {
          collectionName: collection,
          filters: new Map(Object.entries(filters)),
          filterKeys,
          executionTime,
          frequency: 1,
        },
        { upsert: true, new: true }
      );
    }

    cacheManager.set(cacheKey, pattern);

    res.json({
      success: true,
      data: pattern,
      message: 'Query analyzed successfully',
    });
  } catch (error) {
    console.error('Error in analyzeQuery:', error);
    res.status(500).json({ error: error.message });
  }
};

const getPatterns = async (req, res) => {
  try {
    const { collection, limit = 10 } = req.query;

    if (!collection) {
      return res.status(400).json({ error: 'collection parameter is required' });
    }

    const cacheKey = `patterns:${collection}`;
    let patterns = cacheManager.get(cacheKey);

    if (!patterns) {
      patterns = await QueryPattern.find({ collectionName: collection })
        .sort({ frequency: -1 })
        .limit(parseInt(limit));

      cacheManager.set(cacheKey, patterns);
    }

    res.json({
      success: true,
      count: patterns.length,
      data: patterns,
    });
  } catch (error) {
    console.error('Error in getPatterns:', error);
    res.status(500).json({ error: error.message });
  }
};

const getStats = async (req, res) => {
  try {
    const { collection } = req.query;

    if (!collection) {
      return res.status(400).json({ error: 'collection parameter is required' });
    }

    const cacheKey = `stats:${collection}`;
    let stats = cacheManager.get(cacheKey);

    if (!stats) {
      const patterns = await QueryPattern.find({ collectionName: collection });
      
      if (patterns.length === 0) {
        return res.json({
          success: true,
          data: {
            totalQueries: 0,
            uniquePatterns: 0,
            avgExecutionTime: 0,
            patterns: [],
          },
        });
      }

      stats = {
        totalQueries: patterns.reduce((sum, p) => sum + p.frequency, 0),
        uniquePatterns: patterns.length,
        avgExecutionTime:
          patterns.reduce((sum, p) => sum + p.executionTime, 0) / patterns.length,
        patterns,
      };

      cacheManager.set(cacheKey, stats);
    }

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('Error in getStats:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  analyzeQuery,
  getPatterns,
  getStats,
};
