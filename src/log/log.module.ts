import { Module } from "@nestjs/common";
import { LogService } from "./log.service";
import { LogController } from "./log.controller";
import { ParserService } from "./../parser/parser.service";
import { CategoriserService } from "./../categoriser/categoriser.service";
import { ScorerService } from "./../scorer/scorer.service";

@Module({
  controllers: [LogController],
  providers: [LogService, ParserService, CategoriserService, ScorerService],
})
export class LogModule {}
