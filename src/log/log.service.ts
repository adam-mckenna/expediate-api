import { Injectable } from "@nestjs/common";
import { LogDto } from "./dto/logDto";

import { TransformerService } from "./../transformer/transformer.service";
import { CategoriserService } from "./../categoriser/categoriser.service";
import { ScorerService } from "./../scorer/scorer.service";

@Injectable()
export class LogService {
  constructor(
    private transformerService: TransformerService,
    private categoriserService: CategoriserService,
    private scorerService: ScorerService,
  ) {}

  create({ log }: LogDto) {
    const mappedLog = log
      .split(",")
      .map(this.transformerService.parse)
      .map((log) => ({
        category: this.categoriserService.categorise(log.food),
        ...log,
      }));

    return this.scorerService.score(mappedLog);
  }
}
