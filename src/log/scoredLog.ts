import { FoodCategory } from "src/categoriser/category.type";
import { Unit } from "src/transformer/units.type";
import { ApiProperty } from "@nestjs/swagger";

class ScoredLog {
  @ApiProperty({ description: "DQS for food item." })
  score: number;
  @ApiProperty({ description: "The food item logged." })
  food: string;
  @ApiProperty({
    description:
      "The unit used to log the food (e.g. grams, serving, handful, ml, etc).",
  })
  unit: Unit;
  @ApiProperty({ description: "Quantity of food consumed, based on unit." })
  quantity: number;
  @ApiProperty({ description: "DQS food category." })
  category: FoodCategory;
}

export class CompleteLog {
  @ApiProperty({ description: "Total DQS." })
  totalScore: number;
  @ApiProperty({
    isArray: true,
    type: ScoredLog,
    description: "All food items consumed, categorised and scored.",
  })
  scoredLogs: Array<ScoredLog>;
}
