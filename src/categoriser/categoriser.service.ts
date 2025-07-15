import { Injectable } from "@nestjs/common";

import { CategoriserInterface } from "src/categoriser/categoriser.interface";
import { FoodCategory } from "src/categoriser/category.type";
import { FoodCategoryMap, singularise } from "src/categoriser/foods.map";

const FoodCategoriser = (food: string): FoodCategory => {
  console.log(FoodCategoryMap["whole-grains"]);
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
