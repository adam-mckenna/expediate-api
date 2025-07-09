import { FoodCategory } from "src/categoriser/category.type";

// Maps out how many grams are in any given unit
export const UnitMap: Record<string, number> = {
  g: 1,
  kg: 1000,
  lb: 454,
};

// The base grams of each food item.
// For instance: 100g of "fruit" counts as 1 serving,
// 60g peanuts counts as 2 servings of "nuts-seeds", etc.
export const CategoryToGramsMap: Record<FoodCategory, number> = {
  fruit: 100,
  vegetables: 100,
  "lean-meat-and-fish": 80,
  "nuts-seeds": 30,
  "whole-grains": 50,
  dairy: 40,
  "refined-grains": 50,
  sweets: 50,
  "fried-foods": 50,
  "fatty-proteins": 80,
  unknown: 50,
};

// Override CategoryToGramsMap for specific foods. How many grams are in 1 portion.
// For instance: "potato" is a higher calorie vegetable, so fewer grams = more portions.
export const FoodToGramsMap: Record<string, number> = {
  sausage: CategoryToGramsMap["fatty-proteins"] / 2,
  sausages: CategoryToGramsMap["fatty-proteins"] / 2,
  potato: 50,
  potatoes: 50,
  // This means, for instance, that a biscuit = 1/2 a serving.
  biscuit: CategoryToGramsMap["sweets"] / 2,
  biscuits: CategoryToGramsMap["sweets"] / 2,
};

// Default subjective serving sizes for each category.
// If a subjective category (e.g. "scoop") does not have a specific measurement
// (defined in SubjectiveUnitToGramsCategoryMap) then it falls back to these values.
export const SubjectiveUnitFallbackCategoryMap: Record<FoodCategory, number> = {
  fruit: 100,
  vegetables: 100,
  "lean-meat-and-fish": 80,
  "nuts-seeds": 30,
  "whole-grains": 50,
  dairy: 40,
  "refined-grains": 50,
  sweets: 50,
  "fried-foods": 50,
  "fatty-proteins": 80,
  unknown: 50,
};

// Overrides for various subjective units. It will default
// to the BaseSubjectiveCategoryGramsMap if none is provided.
export const SubjectiveUnitToGramsCategoryMap: Record<
  FoodCategory,
  Record<string, number>
> = {
  fruit: {
    tbsp: 15,
    tbsps: 15,
    tsp: 5,
    tsps: 5,
    piece: 25,
    pieces: 25,
    bunch: 100,
  },
  vegetables: {
    tbsp: 15,
    tbsps: 15,
    tsp: 5,
    tsps: 5,
    piece: 25,
    pieces: 25,
    bunch: 100,
  },
  "lean-meat-and-fish": {
    tbsp: 15,
    tbsps: 15,
    tsp: 5,
    tsps: 5,
    piece: 25,
    pieces: 25,
    bunch: 100,
  },
  "nuts-seeds": {
    tbsp: 15,
    tbsps: 15,
    tsp: 5,
    tsps: 5,
    piece: 25,
    pieces: 25,
    bunch: 100,
  },
  "whole-grains": {
    tbsp: 15,
    tbsps: 15,
    tsp: 5,
    tsps: 5,
    piece: 25,
    pieces: 25,
    bunch: 100,
  },
  dairy: {
    tbsp: 15,
    tbsps: 15,
    tsp: 5,
    tsps: 5,
    piece: 25,
    pieces: 25,
    bunch: 100,
  },
  "refined-grains": {
    tbsp: 15,
    tbsps: 15,
    tsp: 5,
    tsps: 5,
    piece: 25,
    pieces: 25,
    bunch: 100,
  },
  sweets: {
    tbsp: 15,
    tbsps: 15,
    tsp: 5,
    tsps: 5,
    piece: 25,
    pieces: 25,
    bunch: 100,
  },
  "fried-foods": {
    tbsp: 15,
    tbsps: 15,
    tsp: 5,
    tsps: 5,
    piece: 25,
    pieces: 25,
    bunch: 100,
  },
  "fatty-proteins": {
    tbsp: 15,
    tbsps: 15,
    tsp: 5,
    tsps: 5,
    piece: 25,
    pieces: 25,
    bunch: 100,
  },
  unknown: {
    tbsp: 15,
    tbsps: 15,
    tsp: 5,
    tsps: 5,
    piece: 25,
    pieces: 25,
    bunch: 100,
  },
};
