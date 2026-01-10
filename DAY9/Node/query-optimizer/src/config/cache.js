const NodeCache = require('node-cache');

class CacheManager {
  constructor(stdTTL = 3600) {
    this.cache = new NodeCache({ stdTTL });
  }

  get(key) {
    return this.cache.get(key);
  }

  set(key, value, ttl) {
    return this.cache.set(key, value, ttl);
  }

  delete(key) {
    this.cache.del(key);
  }

  clear() {
    this.cache.flushAll();
  }

  getStats() {
    return this.cache.getStats();
  }
}

module.exports = new CacheManager(parseInt(process.env.CACHE_DURATION) || 3600);