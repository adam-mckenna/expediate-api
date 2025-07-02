import { FoodCategory } from "src/categoriser/category.type";

export const CategoryScores: Record<FoodCategory, number[]> = {
  fruit: [2, 2, 2, 1, 0, 0],
  vegetables: [2, 2, 2, 1, 0, 0],
  "lean-meat-and-fish": [2, 2, 1, 0, 0, -1],
  "nuts-seeds": [2, 2, 1, 0, 0, -1],
  "whole-grains": [2, 2, 1, 0, 0, -1],
  dairy: [1, 1, 1, 0, -1, -2],
  "refined-grains": [-1, -1, -2, -2, -2, -2],
  sweets: [-2, -2, -2, -2, -2, -2],
  "fried-foods": [-2, -2, -2, -2, -2, -2],
  "fatty-proteins": [-1, -1, -2, -2, -2, -2],
  unknown: [0],
};
