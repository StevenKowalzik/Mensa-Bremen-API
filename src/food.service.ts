import CacheService from './cache.service'
import { FoodPlan } from './food.interface'

class FoodService {
  private cache: CacheService
  private foodPlan: FoodPlan[] = []

  constructor() {
    this.cache = new CacheService()
  }

  get(day: number): FoodPlan[] {
    const foodPlan = this.cache.get<FoodPlan[]>()
    if (foodPlan?.[day]) return foodPlan[day]

    return this.foodPlan
  }

  getAll() {}
}