export type FoodType =
  | "fruit"
  | "vegetable"
  | "lean-meat-and-fish"
  | "nuts-seeds"
  | "whole-grain"
  | "dairy"
  | "refined-grains"
  | "sweets"
  | "fatty-foods"
  | "fatty-proteins"
  | "unknown";

export interface CategoriserInterface {
  categorise(food: string): FoodType;
}
