module.exports = class Scraper {
  constructor(html) {
    this.$ = html;
  }

  scrapeDay(day = 1) {
    const foodPlan = { day: '', date: '', food: [] };
    foodPlan.day = this.getDay(day);
    foodPlan.date = this.getDate(day);
    for (let i = 1; i < 10; i++) {
      foodPlan.food.push(this.getMealInfo(day, i));
    }
    return foodPlan;
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
    const meal = this.getTextOfDom(`${mealSelector} .field-name-field-description`);
    mealObj[category] = meal;
    return mealObj;
  }

  getCost(day, mealClass) {
    const mealSelector = this.domFoodSelector(day, mealClass);
    const cost = this.$(`${mealSelector} .field-name-field-price-students`).text();
    return cost;
  }

  getMealInfo(day, mealClass) {
    const mealInfo = this.getMeal(day, mealClass);
    mealInfo.costs = this.getCost(day, mealClass);
    return mealInfo;
  }

  getDay(x) { return this.$(`.tabs li:nth-of-type(${x}) .tab-title`).text(); }

  getDate(x) { return this.$(`.tabs li:nth-of-type(${x}) .tab-date`).text(); }
  
};
