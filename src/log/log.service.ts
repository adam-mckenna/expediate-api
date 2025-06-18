import { Injectable } from "@nestjs/common";
import { LogDto } from "./dto/logDto";
import { parseLoggedFood } from "./utils/parseLoggedFood";
import { CategoriserService } from "./../categoriser/categoriser.service";
import { ScorerService } from "./../scorer/scorer.service";

@Injectable()
export class LogService {
  constructor(
    private foodCategoriser: CategoriserService,
    private scorerService: ScorerService,
  ) {}

  create({ log }: LogDto) {
    const mappedLog = log
      .split(",")
      .map(parseLoggedFood)
      .map((log) => ({
        category: this.foodCategoriser.categorise(log.food),
        ...log,
      }));

    return this.scorerService.score(mappedLog);
  }
}
