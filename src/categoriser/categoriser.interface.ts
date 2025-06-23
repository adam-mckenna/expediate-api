import { FoodCategory } from "src/categoriser/category.type";

export interface CategoriserInterface {
  categorise(food: string): FoodCategory;
}
