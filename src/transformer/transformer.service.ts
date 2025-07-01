import { Injectable } from "@nestjs/common";

import * as z from "zod/v4";

const FillerWords = ["of", "a", "an", "the"];
const stripFillerWords = (log: string) =>
  log
    .split(" ")
    .filter((word) => !FillerWords.includes(word.toLowerCase()))
    .join(" ");

const SubjectiveUnitSchema = z.enum([
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
]);

const ObjectiveUnitSchema = z.enum([
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
type SubjectiveUnit = z.infer<typeof SubjectiveUnitSchema>;
type ObjectiveUnit = z.infer<typeof ObjectiveUnitSchema>;
type Unit = SubjectiveUnit | ObjectiveUnit | null;
const isSubjectiveUnit = (value: string): value is SubjectiveUnit =>
  SubjectiveUnitSchema.safeParse(value).success;
const isObjectiveUnit = (value: string): value is ObjectiveUnit =>
  ObjectiveUnitSchema.safeParse(value).success;
type UnitType = "subjective" | "objective" | null;

type LoggedData = {
  unit: Unit;
  unitType: UnitType;
  food: string;
  quantity: number;
};

@Injectable()
export class TransformerService {
  parse = (log: string): LoggedData => {
    // This splits the string into parts which can be individually broken down.
    let parts = stripFillerWords(log).trim().toLowerCase().split(" ");
    let index = 0;

    // The quantity is generally provided first.
    let { quantity, unit, unitType } = this.getQuantityAndUnit(
      parts[0],
      parts[1],
    );

    // ToDo: refactor this confusing situation
    // This code iterates the index based on what units/quantity etc has been parsed
    // If the user provides "100g oats", then the string index only moves forward 1 place (100g)
    // Whereas if the user provides "25 hostages" (oops, I mean "sausages"), then the index moves forward 2 places (25 sausages)
    if (!quantity) {
      if (unitType == "subjective") {
        index = 1;
      } else {
        index = 0;
      }
      quantity = 1;
    } else {
      if (unitType === "subjective") index = 2;
      else index = 1;
    }

    let food: string = "";
    for (let j = index; j < parts.length; j++) {
      food += `${parts[j]} `;
    }

    return {
      quantity,
      unit,
      unitType,
      food: food.trim(),
    };
  };

  getQuantityAndUnit = (
    value: string,
    potentialUnit: string,
  ): {
    quantity: number | null;
    unit: ObjectiveUnit | SubjectiveUnit | null;
    unitType: UnitType | null;
  } => {
    let quantity: number = null;
    let unit: ObjectiveUnit | SubjectiveUnit | null = null;
    let unitType: UnitType | null = null;

    const hasFoundObjectiveUnit = value
      .trim()
      .match(/^(\d+(?:\.\d+)?)([a-zA-Z]+)$/);
    if (hasFoundObjectiveUnit) {
      const potentialObjectiveUnit = hasFoundObjectiveUnit?.[2]?.toLowerCase();

      if (isObjectiveUnit(potentialObjectiveUnit)) {
        const { data, success } = ObjectiveUnitSchema.safeParse(
          potentialObjectiveUnit,
        );
        if (success) {
          unit = data;
          unitType = "objective";
        }
      }
    }

    if (
      (!hasFoundObjectiveUnit && isSubjectiveUnit(value)) ||
      isSubjectiveUnit(potentialUnit)
    ) {
      const { data, success } = SubjectiveUnitSchema.safeParse(potentialUnit);
      if (success) {
        unit = data;
        unitType = "subjective";
      } else {
        const { data, success } = SubjectiveUnitSchema.safeParse(value);
        if (success) {
          unit = data;
          unitType = "subjective";
        }
      }
    }

    if (hasFoundObjectiveUnit) {
      quantity = parseFloat(hasFoundObjectiveUnit[1]);
    } else {
      quantity = parseFloat(value);
    }

    return {
      quantity,
      unit,
      unitType,
    };
  };
}
