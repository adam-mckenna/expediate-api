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
import {
  LogItem,
  ScoredResults,
  ScorerInterface,
} from "src/scorer/scorer.interface";

// Note for the future: could potentially create a ScorerServiceInterface and convert this into
// a specific "DQSScoringService" - that will give the option to easily plug-and-play different
// food scoring systems if desired. Same for DQSCategoriserService, etc.
@Injectable()
export class ScorerService implements ScorerInterface {
  score(log: Array<LogItem>): ScoredResults {
    let categoryLogs: Record<
      string,
      {
        score: number;
        logs: Array<{
          score: number;
          food: string;
          unit: Unit;
          servings: number;
          quantity: number;
          category: FoodCategory;
        }>;
      }
    > = {};
    let totalScore = 0;

    log.forEach((entry) => {
      const { food, category, quantity, unit } = entry;

      // If the category doesn't exist, do not give the item a score.
      if (!(category in CategoryScores)) {
        return { ...entry, score: 0 };
      }

      // if the category has no data yet, initialise it
      if (!categoryLogs[category]) {
        categoryLogs[category] = {
          score: 0,
          logs: [],
        };
      }

      const servings = this.calculateTotalServings(
        food,
        quantity,
        category,
        unit,
      );

      // Get the score array for the current category
      const scoreArray = CategoryScores[category];

      // For each serving, get the score and add it to the total
      // based on the current number of servings in that category
      let score = 0;
      for (let i = 0; i < servings; i++) {
        // Get the current number of servings in the category
        const count =
          categoryLogs[category].logs.reduce(
            (accumulator, { servings }) => (accumulator += servings),
            0,
          ) + i;
        // Increase the score based on the matrix
        score += scoreArray[Math.min(count, scoreArray.length - 1)];
      }

      // Update category logs
      categoryLogs[category] = {
        score: (categoryLogs[category].score += score),
        logs: [...categoryLogs[category].logs, { score, servings, ...entry }],
      };

      // Update the total score.
      totalScore += score;
    });

    return {
      totalScore,
      logs: categoryLogs,
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
        // First, check if the subjective "override" exists for the specific food item.
        FoodToGramsMap[food] ||
        // If no override exists, check the category overrides for the specific unit.
        SubjectiveUnitToGramsCategoryMap[category][unit] ||
        // If that doesn't exist, fallback to category defaults.
        SubjectiveUnitFallbackCategoryMap[category];
    }

    return unitMappedToGrams * quantity;
  };
}
