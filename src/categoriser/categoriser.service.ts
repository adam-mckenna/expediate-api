import { Injectable } from "@nestjs/common";

import { CategoriserInterface } from "./categoriser.interface";
import { FoodCategory } from "./category.type";
import { FoodCategoryMap, singularise } from "./foods.map";

const FoodCategoriser = (food: string): FoodCategory => {
  for (const [category, foods] of Object.entries(FoodCategoryMap)) {
    food = singularise(food);
    if (foods.includes(food)) {
      return category as FoodCategory;
    }
  }
  return "unknown";
};

@Injectable()
export class CategoriserService implements CategoriserInterface {
  categorise(food: string): FoodCategory {
    return FoodCategoriser(food);
  }
}
