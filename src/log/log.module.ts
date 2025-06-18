import { Module } from "@nestjs/common";
import { LogService } from "./log.service";
import { LogController } from "./log.controller";
import { CategoriserService } from "./../categoriser/categoriser.service";
import { ScorerService } from "./../scorer/scorer.service";

@Module({
  controllers: [LogController],
  providers: [LogService, CategoriserService, ScorerService],
})
export class LogModule {}
