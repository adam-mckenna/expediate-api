import * as z from "zod/v4";

const FoodCategorySchema = z.enum([
  "fruit",
  "vegetables",
  "lean-meat-and-fish",
  "nuts-seeds",
  "whole-grains",
  "dairy",
  "refined-grains",
  "sweets",
  "fried-foods",
  "fatty-proteins",
  "unknown",
]);

export type FoodCategory = z.infer<typeof FoodCategorySchema>;
