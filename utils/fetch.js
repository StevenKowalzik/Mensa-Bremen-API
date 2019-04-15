import rp from 'request-promise';
import cheerio from 'cheerio';
import Cache from './cache';

const cache = new Cache();

const options = {
  uri: 'https://www.stw-bremen.de/de/essen-trinken/uni-mensa',
  transform: body => cheerio.load(body),
};

async function fetch() {
  const cacheData = cache.get();
  if (cacheData) {
    return cacheData;
  }
  try {
    const data = await rp(options);
    cache.set(data);
    return data;
  } catch (e) {
    throw new Error('Downloading of the website failed.');
  }
}

module.exports = fetch;
