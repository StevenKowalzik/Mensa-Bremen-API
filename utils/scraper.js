module.exports = class Scraper {
  constructor(html) {
    this.$ = html;
  }

  getAllDays() {
    let foodPlan = [];
    for (var i = 1; i < 6; i++) {
      foodPlan.push(this.scrapeDay(i));
    }
    return foodPlan;
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
    mealObj["type"] = category;
    mealObj["meal"] = [];
    for (var i = 0; i < this.$(`${mealSelector} tbody`).children().length; i++) {
      const meal = this.getTextOfDom(`${mealSelector} tr:nth-of-type(${i+1}) .field-name-field-description`);
      const costs = this.getTextOfDom(`${mealSelector} tr:nth-of-type(${i+1}) .field-name-field-price-students`);
      mealObj["meal"].push({
        "name": meal,
        "costs": costs
      });
    }
    return mealObj;
  }

  getMealInfo(day, mealClass) {
    const mealInfo = this.getMeal(day, mealClass);
    //mealInfo.costs = this.getCost(day, mealClass);
    return mealInfo;
  }

  getDay(x) { return this.$(`.tabs li:nth-of-type(${x}) .tab-title`).text(); }

  getDate(x) { return this.$(`.tabs li:nth-of-type(${x}) .tab-date`).text(); }

};
