export type FoodType =
  | "fruit"
  | "vegetables"
  | "lean-meat-and-fish"
  | "nuts-seeds"
  | "whole-grains"
  | "dairy"
  | "refined-grains"
  | "sweets"
  | "fried-foods"
  | "fatty-proteins"
  | "unknown";

export interface CategoriserInterface {
  categorise(food: string): FoodType;
}
