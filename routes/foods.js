import fetch from './../utils/fetch'
import express from 'express'
const app = module.exports = express();
let $;

const domFoodSelector = (day, mealClass) => `.food-plan:nth-of-type(${day}) .food-category:nth-of-type(${mealClass})`;

const getTextOfDom = (selector) => {
  return $(selector).contents().filter(function() {
    return this.type === 'text';
  }).text().replace(/\n/g, ' ').replace('  ', ' ');
}

const getMeal = (day, mealClass) =>  {
  let mealObj = {};
  const mealSelector = domFoodSelector(day, mealClass);
  let category = getTextOfDom(`${mealSelector} .category-name`);
  let meal = getTextOfDom(`${mealSelector} .field-name-field-description`);
  mealObj[category] = meal;
  return mealObj;
};

const getCost = (day, mealClass) => {
  const mealSelector = domFoodSelector(day, mealClass);
  let cost = $(`${mealSelector} .field-name-field-price-students`).text();
  return cost;
}

const getMealInfo = (day, mealClass) => {
  let mealInfo = getMeal(day, mealClass)
  mealInfo.costs = getCost(day, mealClass)
  return mealInfo
}

const getDay = x => $(`.tabs li:nth-of-type(${x}) .tab-title`).text();

const getDate = x => $(`.tabs li:nth-of-type(${x}) .tab-date`).text();

app.get('/', async (req, res) => {
  $ = await fetch();
  let foodPlan = { day: '', date: '', food: [] };
  foodPlan.day = getDay(1);
  foodPlan.date = getDate(1);
  for (let i = 1; i < 10; i++) {
    foodPlan.food.push(getMealInfo(1, i));
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
    foodPlan.food.push(getMealInfo(Number(req.params.day) + 1, i));
  }
  res.status(200).send(foodPlan);
});
