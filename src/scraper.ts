import { Url } from "url"

export class Scraper {

  constructor(url: Url) {
    this.url = url
  }

  async load(): Promise<void> {
    
  }

  getTextOfDom(selector: string) {
    return this.$(selector).contents().filter(function () {
      return this.type === 'text';
    }).text()
      .replace(/\n/g, ' ')
      .replace('  ', ' ');
  }
}