import { FoodCategory } from "src/categoriser/category.type";

// Maps each food category to a general serving in grams
export const ServingCategoryMap: Record<FoodCategory, number> = {
  fruit: 50,
  vegetables: 50,
  "lean-meat-and-fish": 50,
  "nuts-seeds": 50,
  "whole-grains": 50,
  dairy: 50,
  "refined-grains": 50,
  sweets: 50,
  "fried-foods": 50,
  "fatty-proteins": 50,
  unknown: 50,
};
