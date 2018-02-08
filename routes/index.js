// routes/index.js
// Main routes file
const cheerio = require('cheerio');
const rp = require('request-promise');
const options = {
  uri: `https://www.stw-bremen.de/de/essen-trinken/uni-mensa`,
  transform: (body) => {
    return cheerio.load(body);
  }
};

module.exports = (app) => {
  app.get('/', async (req, res) => {
    let $ = await fetch();
    //console.log($('.food-plan:nth-of-type(1) .food-category:first-of-type .field-name-field-description').children('sup').text());
    let essen1 = $('.food-plan:nth-of-type(1) .food-category:nth-of-type(1) .field-name-field-description').contents().filter(function() {
      return this.type === 'text';
    }).text();
    console.log(essen1);
    let essen2 = $('.food-plan:nth-of-type(1) .food-category:nth-of-type(2) .field-name-field-description').contents().filter(function() {
      return this.type === 'text';
    }).text();
    console.log(essen2)
    let veg = $('.food-plan:nth-of-type(1) .food-category:nth-of-type(3) .field-name-field-description').contents().filter(function() {
      return this.type === 'text';
    }).text();
    res.render('index', {essen1: essen1, essen2: essen2, veg: veg});
  })
}


const fetch = async (url) => {
  try {
    const response = await rp(options);
    return response;
  } catch (e) {
    console.log(e);
  }
}
