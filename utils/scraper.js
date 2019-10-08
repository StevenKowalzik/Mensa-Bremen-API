// eslint-disable class-methods-use-this
module.exports = class Scraper {
  constructor(html) {
    this.$ = html;
  }

  getAllDays() {
    const foodPlan = [];
    for (let i = 1; i < 6; i += 1) {
      const food = this.scrapeDay(i);
      if (food) {
        foodPlan.push(food);
      }
    }
    return foodPlan;
  }

  scrapeDay(day = 1) {
    try {
      const foodPlan = { day: '', date: '', food: [] };
      foodPlan.day = this.getDay(day);
      foodPlan.date = this.getDate(day);
      for (let i = 1; i < 10; i += 1) {
        foodPlan.food.push(this.getMeal(day, i));
      }
      return foodPlan;
    } catch (error) {
      return null;
    }
  }


  domFoodSelector(day, mealClass) {
    return `.food-plan:nth-of-type(${day}) .food-category:nth-of-type(${mealClass})`;
  }

  getTextOfDom(selector) {
    return this.$(selector).contents().filter(function () {
      return this.type === 'text';
    }).text()
      .replace(/\n/g, ' ')
      .replace('  ', ' ');
  }

  getMeal(day, mealClass) {
    const mealObj = {};
    const mealSelector = this.domFoodSelector(day, mealClass);
    const category = this.getTextOfDom(`${mealSelector} .category-name`);
    mealObj.type = category;
    mealObj.meal = [];
    for (let i = 0; i < this.$(`${mealSelector} tbody`).children().length; i += 1) {
      const meal = this.getTextOfDom(`${mealSelector} tr:nth-of-type(${i + 1}) .field-name-field-description`);
      const costs = this.getTextOfDom(`${mealSelector} tr:nth-of-type(${i + 1}) .field-name-field-price-students`);
      mealObj.meal.push({
        name: meal,
        costs,
      });
    }
    return mealObj;
  }

  getDay(x) { return this.$(`.tabs li:nth-of-type(${x}) .tab-title`).text(); }

  getDate(x) { return this.$(`.tabs li:nth-of-type(${x}) .tab-date`).text(); }
};
