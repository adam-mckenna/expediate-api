import { FoodCategory } from "src/categoriser/category.type";
import { Unit } from "src/transformer/units.type";

export type ScoredResults = {
  totalScore: number;
  logs: Record<
    string,
    {
      score: number;
      logs: Array<{
        score: number;
        food: string;
        unit: Unit;
        quantity: number;
        category: FoodCategory;
      }>;
    }
  >;
};

export type LogItem = {
  food: string;
  unit: Unit;
  quantity: number;
  category: FoodCategory;
};

export interface ScorerInterface {
  score(log: Array<LogItem>): ScoredResults;
}
