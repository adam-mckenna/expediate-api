import { Injectable } from "@nestjs/common";

import {
  isObjectiveUnit,
  isSubjectiveUnit,
  ObjectiveUnit,
  ObjectiveUnitSchema,
  SubjectiveUnit,
  Unit,
  UnitType,
} from "./units.type";

const FillerWords = ["of", "a", "an", "the"];

type TransformedLog = {
  unit: Unit;
  unitType: UnitType;
  food: string;
  quantity: number;
};

// The transformer service takes a given logged food string and breaks the string down
// into tangible data, such as the food item, quantity, unit and unit type.
// The service expects a string in a generally consistent format:
//
// Examples:
// 1: "100g oats"
// 2: "4 portions of cake"
// 3: "1ltrs of wine"
@Injectable()
export class TransformerService {
  parse = (log: string): TransformedLog => {
    // This splits the string into parts which can be individually broken down.
    let parts = this.stripFillerWords(log).trim().toLowerCase().split(" ");
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
      // Replace special characters (especially dashes) with spaces for easier comparison
      food: food
        .trim()
        .replace(/[^a-zA-Z0-9 ]+/g, " ")
        .replace(/\s+/g, " "),
    };
  };

  stripFillerWords = (log: string) =>
    log
      .split(" ")
      .filter((word) => !FillerWords.includes(word.toLowerCase()))
      .join(" ");

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

    if (!hasFoundObjectiveUnit) {
      if (isSubjectiveUnit(value)) {
        unit = value;
        unitType = "subjective";
      } else if (isSubjectiveUnit(potentialUnit)) {
        unit = potentialUnit as Unit;
        unitType = "subjective";
      }
    }

    quantity = parseFloat(
      hasFoundObjectiveUnit ? hasFoundObjectiveUnit[1] : value,
    );

    return {
      quantity,
      unit,
      unitType,
    };
  };
}
