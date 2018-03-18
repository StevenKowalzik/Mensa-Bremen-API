// routes/index.js
// Main routes file
const fetch = require('./../utils/fetch');

let $;

const getTextOfDom = (selector) => {
  return $(selector).contents().filter(function() {
    return this.type === 'text';
  }).text().replace(/\n/g, ' ').replace('  ', ' ');
}

const getMeal = (day, mealClass) =>  {
  let mealObj = {};
  const mealSelector = `.food-plan:nth-of-type(${day}) .food-category:nth-of-type(${mealClass})`;
  let category = getTextOfDom(`${mealSelector} .category-name`);
  let meal = getTextOfDom(`${mealSelector} .field-name-field-description`);
  mealObj[category] = meal;
  return mealObj;
};

const getDay = x => $(`.tabs li:nth-of-type(${x}) .tab-title`).text();

const getDate = x => $(`.tabs li:nth-of-type(${x}) .tab-date`).text();

module.exports = (app) => {
  app.get('/', async (req, res) => {
    $ = await fetch();
    let foodPlan = { day: '', date: '', food: [] };
    foodPlan.day = getDay(1);
    foodPlan.date = getDate(1);
    for (let i = 1; i < 10; i++) {
      foodPlan.food.push(getMeal(1, i));
    }
    res.status(200).send(foodPlan);
  });

  app.get('/:day', async (req, res) => {
    if (req.params.day < 0 && req.params.day > 5) {
      return res.status(404).send('Das ist kein valider Endpunkt');
    }
    $ = await fetch();
    let foodPlan = {day: '', date: '', food: []};
    foodPlan.day = getDay(Number(req.params.day) + 1);
    foodPlan.date = getDate(Number(req.params.day) + 1);
    for (let i = 1; i < 10; i++) {
      foodPlan.food.push(getMeal(Number(req.params.day) + 1, i));
    }
    res.status(200).send(foodPlan);
  });
};
