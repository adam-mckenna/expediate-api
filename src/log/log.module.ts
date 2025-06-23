import { Module } from "@nestjs/common";
import { LogService } from "./log.service";
import { LogController } from "./log.controller";
import { TransformerService } from "../transformer/transformer.service";
import { CategoriserService } from "./../categoriser/categoriser.service";
import { ScorerService } from "./../scorer/scorer.service";

@Module({
  controllers: [LogController],
  providers: [
    LogService,
    TransformerService,
    CategoriserService,
    ScorerService,
  ],
})
export class LogModule {}
