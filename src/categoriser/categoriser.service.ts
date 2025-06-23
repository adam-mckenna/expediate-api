import { Injectable } from "@nestjs/common";

import {
  CategoriserInterface,
  FoodType,
} from "src/categoriser/categoriser.interface";

// todo: create a function that seperates adjectives or whatever like "low-fat", "brown", etc and categorises based on that
const FoodCategoryMap: Record<FoodType, string[]> = {
  fruit: ["banana", "apple", "orange", "kiwi"],
  vegetables: [
    "broccoli",
    "lettuce",
    "tomato",
    "aubergine",
    "courgette",
    "sweet potato",
    "beetroot",
    "kohlrabi",
    "carrot",
  ],
  "lean-meat-and-fish": [
    "chicken breast",
    "salmon",
    "tuna",
    "turkey breast",
    "low fat turkey",
  ],
  "nuts-seeds": [
    "almond",
    "walnut",
    "chia seed",
    "peanut butter",
    "sesame seed",
  ],
  "whole-grains": [
    "brown rice",
    "oats",
    "quinoa",
    "wholemeal pasta",
    "brown bread",
    "wholemeal flour",
  ],
  dairy: ["milk", "cheese", "yogurt", "kefir", "feta cheese"],
  "refined-grains": ["white bread", "pasta", "white rice"],
  sweets: ["chocolate", "cake", "biscuits", "sweets", "honey"],
  "fried-foods": [
    "butter",
    "oil",
    "margarine",
    "crisps",
    "fried chicken",
    "tempura",
  ],
  "fatty-proteins": ["bacon", "sausage", "chicken thigh", "steak"],
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
