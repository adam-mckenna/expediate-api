import { Injectable } from "@nestjs/common";

import { FoodCategory } from "src/categoriser/category.type";
import { isObjectiveUnit, Unit } from "../transformer/units.type";
import {
  BaseSubjectiveCategoryGramsMap,
  SubjectiveFoodToGramsMap,
  SubjectiveUnitToGramsCategoryMap,
  UnitMap,
} from "../transformer/units.map";

import { ServingCategoryMap } from "./serving.map";
import { CategoryScores } from "./scores";

export type LogItem = {
  food: string;
  unit: Unit;
  quantity: number;
  category: FoodCategory;
};

// Note for the future: could potentially create a ScorerServiceInterface and convert this into
// a specific "DQSScoringService" - that will give the option to easily plug-and-play different
// food scoring systems if desired. Same for DQSCategoriserService, etc.
@Injectable()
export class ScorerService {
  score(log: Array<LogItem>) {
    let categoryCount: Record<string, number> = {};
    let totalScore = 0;

    const scoredLogs = log.map((entry) => {
      const { food, category, quantity, unit } = entry;

      // If the category doesn't exist, do not give the item a score.
      if (!(category in CategoryScores)) {
        return { ...entry, score: 0 };
      }

      const servings = this.calculateTotalServings(
        food,
        unit,
        quantity,
        category,
      );
      const scoreArray = CategoryScores[category];

      let score = 0;
      for (let i = 0; i < servings; i++) {
        const count = categoryCount[category] ?? 0;
        categoryCount[category] = count + 1;
        score += scoreArray[Math.min(count, scoreArray.length - 1)];
      }
      totalScore += score;

      return { ...entry, score };
    });

    return {
      totalScore,
      scoredLogs,
    };
  }

  calculateTotalServings = (
    food: string,
    unit: Unit,
    quantity: number,
    category: FoodCategory,
  ) => {
    let servings = quantity;
    if (unit) {
      const unitInGrams = this.convertUnitToGrams(
        food,
        unit,
        category,
        quantity,
      );
      servings = Math.floor(unitInGrams / ServingCategoryMap[category]);
    }
    return servings || 1;
  };

  convertUnitToGrams = (
    food: string,
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
      const foodToGrams = SubjectiveFoodToGramsMap[food];
      if (!foodToGrams) {
        unitMappedToGrams =
          SubjectiveUnitToGramsCategoryMap[category][unit] ||
          BaseSubjectiveCategoryGramsMap[category];
      } else {
        unitMappedToGrams = foodToGrams;
      }
    }

    return unitMappedToGrams * quantity;
  };
}
