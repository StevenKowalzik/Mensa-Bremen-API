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
    let plan = {
      day: weekdays[new Date().getDay()],
      essen1: getMeals(1, 1),
      essen2: getMeals(1, 2),
      vegetarisch: getMeals(1, 3),
      pfannewokco: getMeals(1, 4),
      veganes: getMeals(1, 5),
      auflaeufegraetins: getMeals(1, 6),
      pastasuppenco: getMeals(1, 7),
      salatbar: getMeals(1, 8),
      beilagen: getMeals(1, 9)
    }
    res.status(200).send(plan);
  })
}

const getMeals = (day, meal) =>  {
  return $(`.food-plan:nth-of-type(${day}) .food-category:nth-of-type(${meal}) .field-name-field-description`).contents().filter(function() {
    return this.type === 'text';
  }).text().replace(/\n/g, ' ').replace('  ', ' '); //Das ist unschoen, geht das anders?
}

const fetch = async (url) => {
  try {
    return await rp(options);
  } catch (e) {
    console.log(e);
  }
}
