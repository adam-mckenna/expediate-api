import { Injectable } from "@nestjs/common";
import { FoodType } from "src/categoriser/categoriser.interface";

export const CategoryScores: Record<FoodType, number[]> = {
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

@Injectable()
export class ScorerService {
  score(log) {
    let categoryCount: Record<string, number> = {};
    let totalScore = 0;

    const scoredLogs = log.map((entry) => {
      const { category, quantity } = entry;
      const scoreArray = CategoryScores[category];

      if (!(category in CategoryScores)) {
        return { ...entry, score: 0 };
      }

      let score = 0;

      for (let i = 0; i < quantity; i++) {
        const count = categoryCount[category] ?? 0;
        categoryCount[category] = count + 1;

        score = score + scoreArray[Math.min(count, scoreArray.length - 1)];
      }

      totalScore = totalScore + score;

      return { ...entry, score };
    });

    return {
      totalScore,
      scoredLogs,
    };
  }
}
