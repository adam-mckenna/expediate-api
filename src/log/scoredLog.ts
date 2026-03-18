import { FoodCategory } from "src/categoriser/category.type";
import { Unit } from "src/transformer/units.type";
import { ApiProperty } from "@nestjs/swagger";

export class ScoredLogItem {
  @ApiProperty({ description: "DQS for this food item." })
  score: number;

  @ApiProperty({ description: "The food item logged." })
  food: string;

  @ApiProperty({
    description:
      "The unit used to log the food (e.g. grams, serving, handful, ml, etc).",
    nullable: true,
  })
  unit: Unit;

  @ApiProperty({ description: "Quantity consumed, based on unit." })
  quantity: number;

  @ApiProperty({ description: "DQS food category." })
  category: FoodCategory;
}

export class CategoryLog {
  @ApiProperty({ description: "Score total for this category." })
  score: number;

  @ApiProperty({
    type: ScoredLogItem,
    isArray: true,
    description: "All scored log items in this category.",
  })
  logs: Array<ScoredLogItem>;
}

export class CompleteLog {
  @ApiProperty({ description: "Total DQS." })
  totalScore: number;

  @ApiProperty({
    description:
      "Category-keyed logs. Keys are category slugs (e.g. 'fruit', 'whole-grains').",
    type: "object",
    additionalProperties: { type: "CategoryLog" },
  })
  logs: Record<string, CategoryLog>;
}
