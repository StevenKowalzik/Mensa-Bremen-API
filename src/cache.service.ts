export default class Cache {
    private data: unknown
    private lastUpdated: number
    private TTL: number

    constructor() {
      this.data = []
      this.lastUpdated = new Date(0).getTime();
      this.TTL = 1800000;
    }
  
    set(data: any): void {
      this.lastUpdated = Date.now();
      this.data = data;
    }
  
    get<T>(): T | undefined {
      if (!this.data) {
        return undefined
      }
  
      if (Date.now() - this.lastUpdated > this.TTL) {
        return undefined
      }
  
      return this.data as T;
    }
  };
  