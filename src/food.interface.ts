export interface FoodPlan {
  day: string
  date: string
  food: FoodOffer[]
}
  
export interface FoodOffer {
  type: string,
  meal: Meal
}
  
export interface Meal {
  name: string
  costs: {
    a: string
    b: string
  }
}