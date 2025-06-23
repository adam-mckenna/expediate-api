import { Injectable } from "@nestjs/common";
import { LogDto } from "./dto/logDto";
import { ParserService } from "src/parser/parser.service";
import { CategoriserService } from "src/categoriser/categoriser.service";
import { ScorerService } from "src/scorer/scorer.service";

@Injectable()
export class LogService {
  constructor(
    private parserService: ParserService,
    private foodCategoriser: CategoriserService,
    private scorerService: ScorerService,
  ) {}

  create({ log }: LogDto) {
    const mappedLog = log
      .split(",")
      .map(this.parserService.parse)
      .map((log) => ({
        category: this.foodCategoriser.categorise(log.food),
        ...log,
      }));

    return this.scorerService.score(mappedLog);
  }
}
