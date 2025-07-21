import { FoodCategory } from "src/categoriser/category.type";
import { Unit } from "src/transformer/units.type";

export type ScoredResults = {
  totalScore: number;
  scoredLogs: Array<{
    score: number;
    food: string;
    unit: Unit;
    quantity: number;
    category: FoodCategory;
  }>;
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
