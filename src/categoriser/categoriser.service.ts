import { Injectable } from "@nestjs/common";

import {
  CategoriserInterface,
  FoodType,
} from "src/interfaces/CategoriserInterface";

const FoodCategoryMap: Record<FoodType, string[]> = {
  fruit: ["banana", "apple", "orange", "kiwi"],
  vegetable: [
    "broccoli",
    "lettuce",
    "tomato",
    "aubergine",
    "courgette",
    "sweet potato",
    "beetroot",
  ],
  "lean-meat-and-fish": ["chicken", "salmon", "tuna"],
  "nuts-seeds": ["almond", "walnut", "chia seed"],
  "whole-grain": ["brown rice", "oats", "quinoa", "wholemeal pasta"],
  dairy: ["milk", "cheese", "yogurt"],
  "refined-grains": ["white bread", "white pasta"],
  sweets: ["chocolate", "cake", "biscuits"],
  "fatty-foods": ["butter", "oil", "margarine"],
  "fatty-proteins": ["bacon", "sausages"],
  unknown: [],
};

const pluralise = (word: string): string =>
  word.endsWith("s") ? word.slice(0, -1) : `${word}s`;

const FoodCategoriser = (food: string): FoodType => {
  for (const [category, foods] of Object.entries(FoodCategoryMap)) {
    if (foods.includes(food) || foods.includes(pluralise(food))) {
      return category as FoodType;
    }
  }
  return "unknown";
};
@Injectable()
export class CategoriserService implements CategoriserInterface {
  categorise(food: string): FoodType {
    return FoodCategoriser(food);
  }
}
