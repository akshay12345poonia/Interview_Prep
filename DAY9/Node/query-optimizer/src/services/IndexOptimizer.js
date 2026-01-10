const IndexRecommendation = require('../models/IndexRecommendation');
const QueryPattern = require('../models/QueryPattern');
const cacheManager = require('../config/cache');

class IndexOptimizer {
  async generateRecommendations(collection) {
    try {
      const cacheKey = `recommendations:${collection}`;
      let existing = cacheManager.get(cacheKey);

      if (existing) return existing;

      const patterns = await QueryPattern.find({ collection }).sort({ frequency: -1 });

      if (patterns.length === 0) {
        return { message: 'No query patterns found for this collection' };
      }

      const recommendations = [];
      const processedIndexes = new Set();

      for (const pattern of patterns) {
        if (pattern.frequency < 2) continue; // Only recommend for frequent patterns

        const indexKey = pattern.filterKeys.join(',');

        if (!processedIndexes.has(indexKey)) {
          const priority = Math.min(
            100,
            Math.round((pattern.frequency / patterns[0].frequency) * 100)
          );

          const potentialImprovement = Math.round(
            (pattern.executionTime * (pattern.frequency - 1)) / pattern.frequency
          );

          const indexFields = pattern.filterKeys.map(field => ({
            field,
            direction: 1,
          }));

          const recommendation = {
            collection,
            indexFields,
            priority,
            reason: `Composite index recommended for frequently used filters: ${pattern.filterKeys.join(', ')}`,
            potentialImprovement,
            frequency: pattern.frequency,
          };

          recommendations.push(recommendation);
          processedIndexes.add(indexKey);
        }
      }

      // Save recommendations
      for (const rec of recommendations) {
        await IndexRecommendation.findOneAndUpdate(
          {
            collection,
            indexFields: rec.indexFields,
          },
          rec,
          { upsert: true }
        );
      }

      cacheManager.set(cacheKey, recommendations);
      return recommendations;
    } catch (error) {
      console.error('Error generating recommendations:', error);
      throw error;
    }
  }

  async getRecommendations(collection, status = 'pending') {
    const cacheKey = `recommendations:${collection}:${status}`;
    let recommendations = cacheManager.get(cacheKey);

    if (!recommendations) {
      recommendations = await IndexRecommendation.find({ collection, status }).sort({
        priority: -1,
      });

      cacheManager.set(cacheKey, recommendations);
    }

    return recommendations;
  }

  async applyRecommendation(recommendationId) {
    try {
      const recommendation = await IndexRecommendation.findByIdAndUpdate(
        recommendationId,
        { status: 'applied' },
        { new: true }
      );

      // Clear related cache
      const cacheKey = `recommendations:${recommendation.collection}`;
      cacheManager.delete(cacheKey);

      return recommendation;
    } catch (error) {
      console.error('Error applying recommendation:', error);
      throw error;
    }
  }

  async rejectRecommendation(recommendationId, reason) {
    try {
      const recommendation = await IndexRecommendation.findByIdAndUpdate(
        recommendationId,
        { status: 'rejected' },
        { new: true }
      );

      cacheManager.delete(`recommendations:${recommendation.collection}`);
      return recommendation;
    } catch (error) {
      console.error('Error rejecting recommendation:', error);
      throw error;
    }
  }
}

module.exports = new IndexOptimizer();