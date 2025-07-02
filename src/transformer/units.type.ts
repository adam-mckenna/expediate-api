import z from "zod/v4";

export const SubjectiveUnitSchema = z.enum([
  "portion",
  "portions",
  "slice",
  "slices",
  "cup",
  "cups",
  "tbsp",
  "tbsps",
  "tsp",
  "tsps",
  "glass",
  "glasses",
  "bottle",
  "bottles",
  "piece",
  "pieces",
  "bunch",
  "serving",
  "servings",
]);

export const ObjectiveUnitSchema = z.enum([
  "g",
  "gram",
  "grams",
  "kg",
  "kilogram",
  "kilograms",
  "ml",
  "milliliter",
  "milliliters",
  "l",
  "liter",
  "liters",
  "oz",
  "ounce",
  "ounces",
  "lb",
  "pound",
  "pounds",
]);

export type SubjectiveUnit = z.infer<typeof SubjectiveUnitSchema>;
export type ObjectiveUnit = z.infer<typeof ObjectiveUnitSchema>;

export type Unit = SubjectiveUnit | ObjectiveUnit | null;
export type UnitType = "subjective" | "objective" | null;

export const isSubjectiveUnit = (value: string): value is SubjectiveUnit =>
  SubjectiveUnitSchema.safeParse(value).success;

export const isObjectiveUnit = (value: string): value is ObjectiveUnit =>
  ObjectiveUnitSchema.safeParse(value).success;
