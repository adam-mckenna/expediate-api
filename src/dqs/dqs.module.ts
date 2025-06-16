import { Module } from "@nestjs/common";
import { DqsService } from "./dqs.service";
import { DqsController } from "./dqs.controller";

@Module({
  controllers: [DqsController],
  providers: [DqsService],
})
export class DqsModule {}
