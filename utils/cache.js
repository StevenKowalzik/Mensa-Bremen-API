module.exports = class Cache {



  constructor() {
    this.data;
    this.lastUpdated;
    this.TTL = 1800000;
  }

  set(data) {
    this.lastUpdated = Date.now();
    this.data = data;
  }

  get() {
    if (!this.data) {
      return null;
    }

    if (Date.now() - this.lastUpdated > this.TTL) {
      return null;
    }

    return this.data;
  }
};
