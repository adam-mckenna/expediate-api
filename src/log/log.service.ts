import { Injectable } from "@nestjs/common";
import { LogDto } from "./dto/logDto";
import { CategoriserService } from "./../categoriser/categoriser.service";
import { ScorerService } from "./../scorer/scorer.service";
import { TransformerService } from "./../transformer/transformer.service";

@Injectable()
export class LogService {
  constructor(
    private foodCategoriser: CategoriserService,
    private scorerService: ScorerService,
    private transformerService: TransformerService,
  ) {}

  create({ log }: LogDto) {
    const mappedLog = log
      .split(",")
      .map(this.transformerService.parse)
      .map((log) => ({
        category: this.foodCategoriser.categorise(log.food),
        ...log,
      }));

    return this.scorerService.score(mappedLog);
  }
}
