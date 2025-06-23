import { Module } from "@nestjs/common";

import { TransformerService } from "./transformer.service";

@Module({
  providers: [TransformerService],
})
export class TransformerModule {}
