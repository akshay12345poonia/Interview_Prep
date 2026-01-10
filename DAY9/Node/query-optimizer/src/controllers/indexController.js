const IndexRecommendation = require('../models/IndexRecommendation');
const QueryPattern = require('../models/QueryPattern');
const cacheManager = require('../config/cache');

const generateRecommendations = async (req, res) => {
  try {
    const { collection } = req.body;

    if (!collection) {
      return res.status(400).json({ error: 'collection is required' });
    }

    const cacheKey = `recommendations:${collection}`;
    let cached = cacheManager.get(cacheKey);

    if (cached) {
      return res.json({
        success: true,
        data: cached,
        source: 'cache',
        message: 'Recommendations retrieved from cache',
      });
    }

    const patterns = await QueryPattern.find({ collectionName: collection }).sort({ frequency: -1 });

    if (patterns.length === 0) {
      return res.json({
        success: true,
        data: [],
        message: 'No query patterns found for this collection',
      });
    }

    const recommendations = [];
    const processedIndexes = new Set();

    for (const pattern of patterns) {
      if (pattern.frequency < 2) continue;

      const indexKey = pattern.filterKeys.join(',');

      if (!processedIndexes.has(indexKey)) {
        const priority = Math.min(
          100,
          Math.round((pattern.frequency / patterns[0].frequency) * 100)
        );

        const potentialImprovement = Math.round(
          (pattern.executionTime * (pattern.frequency - 1)) / pattern.frequency
        );

        const indexFields = pattern.filterKeys.map((field) => ({
          field,
          direction: 1,
        }));

        const recommendation = {
          collectionName: collection,
          indexFields,
          priority,
          reason: `Composite index recommended for frequently used filters: ${pattern.filterKeys.join(', ')}`,
          potentialImprovement,
          frequency: pattern.frequency,
          status: 'pending',
        };

        try {
          await IndexRecommendation.findOneAndUpdate(
            {
              collectionName: collection,
              'indexFields.field': { $all: pattern.filterKeys },
            },
            recommendation,
            { upsert: true }
          );
          recommendations.push(recommendation);
        } catch (e) {
          console.error('Error saving recommendation:', e);
        }

        processedIndexes.add(indexKey);
      }
    }

    cacheManager.set(cacheKey, recommendations);

    res.json({
      success: true,
      data: recommendations,
      count: recommendations.length,
      message: 'Recommendations generated successfully',
    });
  } catch (error) {
    console.error('Error in generateRecommendations:', error);
    res.status(500).json({ error: error.message });
  }
};

const getRecommendations = async (req, res) => {
  try {
    const { collection, status = 'pending' } = req.query;

    if (!collection) {
      return res.status(400).json({ error: 'collection parameter is required' });
    }

    const cacheKey = `recommendations:${collection}:${status}`;
    let recommendations = cacheManager.get(cacheKey);

    if (!recommendations) {
      recommendations = await IndexRecommendation.find({ collectionName: collection, status }).sort({
        priority: -1,
      });

      cacheManager.set(cacheKey, recommendations);
    }

    res.json({
      success: true,
      data: recommendations,
      total: recommendations.length,
    });
  } catch (error) {
    console.error('Error in getRecommendations:', error);
    res.status(500).json({ error: error.message });
  }
};

const applyRecommendation = async (req, res) => {
  try {
    const { recommendationId } = req.params;

    if (!recommendationId) {
      return res.status(400).json({ error: 'recommendationId is required' });
    }

    const recommendation = await IndexRecommendation.findByIdAndUpdate(
      recommendationId,
      { status: 'applied', updatedAt: new Date() },
      { new: true }
    );

    if (!recommendation) {
      return res.status(404).json({ error: 'Recommendation not found' });
    }

    cacheManager.delete(`recommendations:${recommendation.collectionName}`);
    cacheManager.delete(`recommendations:${recommendation.collectionName}:pending`);

    res.json({
      success: true,
      data: recommendation,
      message: 'Recommendation applied successfully',
    });
  } catch (error) {
    console.error('Error in applyRecommendation:', error);
    res.status(500).json({ error: error.message });
  }
};

const rejectRecommendation = async (req, res) => {
  try {
    const { recommendationId } = req.params;
    const { reason } = req.body;

    if (!recommendationId) {
      return res.status(400).json({ error: 'recommendationId is required' });
    }

    const recommendation = await IndexRecommendation.findByIdAndUpdate(
      recommendationId,
      { status: 'rejected', updatedAt: new Date() },
      { new: true }
    );

    if (!recommendation) {
      return res.status(404).json({ error: 'Recommendation not found' });
    }

    cacheManager.delete(`recommendations:${recommendation.collectionName}`);
    cacheManager.delete(`recommendations:${recommendation.collectionName}:pending`);

    res.json({
      success: true,
      data: recommendation,
      message: 'Recommendation rejected',
    });
  } catch (error) {
    console.error('Error in rejectRecommendation:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  generateRecommendations,
  getRecommendations,
  applyRecommendation,
  rejectRecommendation,
};