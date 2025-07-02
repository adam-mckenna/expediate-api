import { Injectable } from "@nestjs/common";

import { FoodCategory } from "src/categoriser/category.type";
import { ServingCategoryMap } from "./serving.map";
import { isObjectiveUnit, Unit } from "../transformer/units.type";
import { SubjectiveUnitToGramsCategoryMap, UnitMap } from "../transformer/units.map";

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

export type LogItem = { unit: Unit, quantity: number, category: FoodCategory }

// Note for the future: could potentially create a ScorerServiceInterface and convert this into
// a specific "DQSScoringService" - that will give the option to easily plug-and-play different
// food scoring systems if desired. Same for DQSCategoriserService, etc.
@Injectable()
export class ScorerService {
  score(log: Array<LogItem>) {
    let categoryCount: Record<string, number> = {};
    let totalScore = 0;

    const scoredLogs = log.map((entry) => {
      const { category, quantity, unit } = entry;

      let totalServings = quantity;
      if (unit) {
        const unitInGrams = this.convertUnitToGrams(
          unit,
          category,
          quantity,
        );
        totalServings = Math.floor(unitInGrams / ServingCategoryMap[category]);
        if (totalServings == 0) {
          totalServings = 1;
        }
      }

      let score = 0;

      // If the category doesn't exist, do not give the item a score.
      if (!(category in CategoryScores)) {
        return { ...entry, score };
      }

      const scoreArray = CategoryScores[category];
      for (let i = 0; i < totalServings; i++) {
        const count = categoryCount[category] ?? 0;
        categoryCount[category] = count + 1;
        score = score + scoreArray[Math.min(count, scoreArray.length - 1)];
      }

      totalScore += score;

      return { ...entry, score };
    });

    return {
      totalScore,
      scoredLogs,
    };
  }

  convertUnitToGrams = (
    unit: Unit,
    category: FoodCategory,
    quantity: number,
  ) => {
    // Default to 1g
    let unitMappedToGrams = 1;

    if (isObjectiveUnit(unit)) {
      if (unit !== "g") {
        unitMappedToGrams = UnitMap[unit];
      }
    } else {
      unitMappedToGrams = SubjectiveUnitToGramsCategoryMap[category][unit];
    }

    return unitMappedToGrams * quantity;
  };
}
