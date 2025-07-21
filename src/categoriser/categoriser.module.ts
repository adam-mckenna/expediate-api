import { Module } from "@nestjs/common";

import { CategoriserService } from "./categoriser.service";
import { CategoriserController } from "./categoriser.controller";

@Module({
  controllers: [CategoriserController],
  providers: [CategoriserService],
})
export class CategoriserModule {}
