import { Module } from "@nestjs/common";

import { ScorerService } from "./scorer.service";

@Module({
  providers: [ScorerService],
})
export class ScorerModule {}
