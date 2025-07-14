import z from "zod/v4";

export const SubjectiveUnitSchema = z.enum([
  "portion",
  "slice",
  "cup",
  "tbsp",
  "tsp",
  "glass",
  "bottle",
  "piece",
  "bunch",
  "serving",
  "packet",
  "scoop",
  "head",
  "handful",
]);

export const ObjectiveUnitSchema = z.enum([
  "g",
  "gram",
  "kg",
  "kilogram",
  "ml",
  "milliliter",
  "l",
  "liter",
  "oz",
  "ounce",
  "lb",
  "pound",
]);

// We only need to provide plural rules if the plural does not end in "s"
const pluralOverrides: Record<string, string> = {
  glass: "glasses",
  bunch: "bunches",
};

export type SubjectiveUnit = z.infer<typeof SubjectiveUnitSchema>;
export type ObjectiveUnit = z.infer<typeof ObjectiveUnitSchema>;

export type Unit = SubjectiveUnit | ObjectiveUnit | null;
export type UnitType = "subjective" | "objective" | null;

const singularise = (unit: string): string => {
  for (const [singular, plural] of Object.entries(pluralOverrides)) {
    if (unit === plural) return singular;
  }
  // Remove trailing 's' if not a known irregular plural
  if (unit.endsWith("s")) {
    return unit.slice(0, -1);
  }
  return unit;
};

export const isSubjectiveUnit = (unit: string): unit is SubjectiveUnit => {
  if (!unit) return false;
  // if already in singular form, return
  if (SubjectiveUnitSchema.safeParse(unit).success) return true;
  // otherwise, convert to singular
  const singular = singularise(unit);
  return SubjectiveUnitSchema.safeParse(singular).success;
};

export const isObjectiveUnit = (unit: string): unit is ObjectiveUnit => {
  if (!unit) return false;
  // if already in singular form, return
  if (ObjectiveUnitSchema.safeParse(unit).success) return true;
  // otherwise, convert to singular
  const singular = singularise(unit);
  return ObjectiveUnitSchema.safeParse(singular).success;
};
