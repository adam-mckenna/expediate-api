import { Injectable } from "@nestjs/common";
import { LogDto } from "./dto/logDto";
import { parseLoggedFood } from "./utils/parseLoggedFood";
import { CategoriserService } from "src/categoriser/categoriser.service";

@Injectable()
export class LogService {
  constructor(private foodCategoriser: CategoriserService) {}

  create({ log }: LogDto) {
    const logs = log
      .split(",")
      .map(parseLoggedFood)
      .map((log) => ({
        category: this.foodCategoriser.categorise(log.food),
        ...log,
      }));

    return logs;
  }
}
