import LRU from "lru-cache";

const cache = new LRU({
  max: 100000, // maximum number of items in the cache
  maxAge: 1000 * 60 * 60, // maximum age of an item in the cache (1 hour)
});

module.exports = cache;
