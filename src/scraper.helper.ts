export function domFoodSelector(day: number, mealClass: number) {
    return `.food-plan:nth-of-type(${day}) .food-category:nth-of-type(${mealClass})`;
}

export function daySelector(day: string) { return `.tabs li:nth-of-type(${day}) .tab-title`) }

export function dateSelector(day: string) { return `.tabs li:nth-of-type(${day}) .tab-date`) }