import { Module } from "@nestjs/common";
import { LogService } from "./log.service";
import { LogController } from "./log.controller";
import { CategoriserService } from "src/categoriser/categoriser.service";

@Module({
  controllers: [LogController],
  providers: [LogService, CategoriserService],
})
export class LogModule {}
