import { Injectable } from "@nestjs/common";

import { CategoriserInterface } from "src/interfaces/CategoriserInterface";

const WHOLE_GRAINS = ["oats", "brown rice", "wholemeal pasta"];
type WholeGrain = (typeof WHOLE_GRAINS)[number];
const isWholeGrain = (food: string): food is WholeGrain =>
  WHOLE_GRAINS.includes(food) ||
  WHOLE_GRAINS.map((grain) => `${grain}s`).includes(food);

const FRUIT = ["banana", "apple", "orange"];
type Fruit = (typeof WHOLE_GRAINS)[number];
const isFruit = (food: string): food is Fruit =>
  FRUIT.includes(food) || FRUIT.map((fruit) => `${fruit}s`).includes(food);

@Injectable()
export class CategoriserService implements CategoriserInterface {
  categorise(food: string) {
    if (isWholeGrain(food)) {
      return "whole-grain";
    }
    if (isFruit(food)) {
      return "fruit";
    }
    return "unknown";
  }
}
