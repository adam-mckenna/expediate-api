import { Injectable } from "@nestjs/common";

import * as z from "zod/v4";

const UnitSchema = z.enum([
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
]);
type UnitType = z.infer<typeof UnitSchema>;

@Injectable()
export class TransformerService {
  parse = (log) => {
    // This splits the string into parts which can be individually broken down.
    const parts = log.trim().toLowerCase().split(" ");

    let index = 0;

    // The quantity is generally provided first.
    let quantity = parseFloat(parts[index]);
    const hasNotProvidedQuantity = isNaN(quantity);
    if (hasNotProvidedQuantity) {
      quantity = 1;
    } else {
      index = index + 1;
    }

    let unit: UnitType | null = this.getUnit(parts[index]);
    if (unit) {
      index = index + 1;
    }

    let food: string = "";
    for (let j = index; j < parts.length; j++) {
      food += `${parts[j]} `;
    }

    return {
      quantity,
      unit,
      food: food.trim(),
    };
  };

  getUnit(string) {
    const { data, success } = UnitSchema.safeParse(string);
    return success ? data : null;
  }
}
