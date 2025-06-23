import { Injectable } from "@nestjs/common";

const UNITS = [
  "portion",
  "slice",
  "cup",
  "tbsp",
  "tsp",
  "glass",
  "bottle",
  "piece",
];
type Unit = (typeof UNITS)[number];
const isUnit = (unit: string): unit is Unit =>
  UNITS.includes(unit) || UNITS.map((UNIT) => `${UNIT}s`).includes(unit);

@Injectable()
export class TransformerService {
  parse(log) {
    const parts = log.trim().toLowerCase().split(" ");

    // ToDo: an error has occurred, figure out how to handle this.
    if (parts.length < 2) return null;

    const quantity = parseFloat(parts[0]);
    // ToDo: an error has occurred, figure out how to handle this.
    if (isNaN(quantity)) return null;

    let unit: Unit | null = null;
    let food: string = "";

    if (isUnit(parts[1])) {
      unit = parts[1];
      food = parts[2];
    } else {
      food = parts[1];
    }

    return {
      quantity,
      unit,
      food,
    };
  }
}
