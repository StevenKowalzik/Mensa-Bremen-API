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

  app.get('/:tag', async (req, res) => {
    if (req.params.tag < 1 && req.params.tag > 5)
      return res.status(301).send('Das ist kein valider Endpunkt');
    $ = await fetch();
    console.log((new Date().getDay() + Number(req.params.tag)) % 6)
    let plan = {
      day: getDay(Number(req.params.tag)),
      essen1: getMeals(req.params.tag, 1),
      essen2: getMeals(req.params.tag, 2),
      vegetarisch: getMeals(req.params.tag, 3),
      pfannewokco: getMeals(req.params.tag, 4),
      veganes: getMeals(req.params.tag, 5),
      auflaeufegraetins: getMeals(req.params.tag, 6),
      pastasuppenco: getMeals(req.params.tag, 7),
      salatbar: getMeals(req.params.tag, 8),
      beilagen: getMeals(req.params.tag, 9)
    }
    res.status(200).send(plan);
  })
}



const getMeals = (day, meal) =>  {
  return $(`.food-plan:nth-of-type(${day}) .food-category:nth-of-type(${meal}) .field-name-field-description`).contents().filter(function() {
    return this.type === 'text';
  }).text().replace(/\n/g, ' ').replace('  ', ' ');
}

const test = (x = 0) => x;

const getDay = (x = 0) => ((new Date().getDay()+x) % 6 != 0 && (new Date().getDay()+x) % 6 != 6) ? weekdays[(new Date().getDay()+x) % 6] : weekdays[1];
// const getDay = (x = 0) => {
//   console.log((new Date().getDay()+x) % 6 != 0| (new Date().getDay()+x) % 6 != 6)
//   if ((new Date().getDay()+x) % 6 != 0 || (new Date().getDay()+x) % 6 != 6)
//     return weekdays[(new Date().getDay()+x) % 6]
//   else
//     return weekdays[1];
// }
