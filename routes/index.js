// routes/index.js
// Main routes file
const cheerio = require('cheerio');
const rp = require('request-promise');
const weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
let $;
const options = {
  uri: `https://www.stw-bremen.de/de/essen-trinken/uni-mensa`,
  transform: (body) => {
    return cheerio.load(body);
  }
};

module.exports = (app) => {
  // Get today route for now
  app.get('/', async (req, res) => {
    $ = await fetch();
    let day = {
      today: weekdays[new Date().getDay()],
      essen1: getMeals(1, 1),
      essen2: getMeals(1, 2),
      veg: getMeals(1, 3)
    }
    res.status(200).send(day);
  })
}

const getMeals = (day, meal) =>  {
  return $(`.food-plan:nth-of-type(${day}) .food-category:nth-of-type(${meal}) .field-name-field-description`).contents().filter(function() {
    return this.type === 'text';
  }).text();
}

const fetch = async (url) => {
  try {
    const response = await rp(options);
    return response;
  } catch (e) {
    console.log(e);
  }
}
