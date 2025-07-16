import { Injectable } from "@nestjs/common";

import { FoodCategory } from "src/categoriser/category.type";
import { isObjectiveUnit, Unit } from "../transformer/units.type";
import {
  FoodToGramsMap,
  CategoryToGramsMap,
  SubjectiveUnitToGramsCategoryMap,
  UnitMap,
  SubjectiveUnitFallbackCategoryMap,
} from "../transformer/units.map";

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
        quantity,
        category,
        unit,
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
    quantity: number,
    category: FoodCategory,
    unit?: Unit,
  ) => {
    const unitInGrams = this.convertUnitToGrams(
      food,
      unit || "serving",
      category,
      quantity,
    );
    // Always round UP to the nearest serving - this is a critical detail.
    // It means that if 1.5 of serving is provided, it will count as 2 in score.
    // This choice keeps things simple.
    return Math.ceil(unitInGrams / CategoryToGramsMap[category]) || 1;
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
      unitMappedToGrams = UnitMap[unit];
    } else {
      unitMappedToGrams =
        // First, check if the subjective unit "override" exists for the specific food item.
        FoodToGramsMap[food] ||
        // If no override exists, check the category overrides for the specific unit.
        SubjectiveUnitToGramsCategoryMap[category][unit] ||
        // If that doesn't exist, fallback to category defaults.
        SubjectiveUnitFallbackCategoryMap[category];
    }

    return unitMappedToGrams * quantity;
  };
}
