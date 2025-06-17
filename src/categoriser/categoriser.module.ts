import { Module } from "@nestjs/common";

import { CategoriserService } from "./categoriser.service";

@Module({
  providers: [CategoriserService],
})
export class CategoriserModule {}
