// routes/index.js
// Main routes file
const cheerio = require('cheerio');
const weekdays = ['sonntag', 'montag', 'dienstag', 'mittwoch', 'donnerstag', 'freitag', 'samstag'];
const fetch = require('./../utils/fetch');
let $;

module.exports = (app) => {
  // Get today route for now
  app.get('/', async (req, res) => {
    $ = await fetch();
    let plan = {
      day: getDay(),
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
  }).text().replace(/\n/g, ' ').replace('  ', ' ');
}

const getDay = () => new Date().getDay() != 0 || new Date().getDay() != 6 ? weekdays[new Date().getDay()] : weekdays[1];
