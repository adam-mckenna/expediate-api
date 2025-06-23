import { Module } from "@nestjs/common";
import { LogModule } from "./log/log.module";
import { CategoriserModule } from "./categoriser/categoriser.module";
import { TransformerModule } from "./transformer/transformer.module";
import { ScorerModule } from "./scorer/scorer.module";

@Module({
  imports: [LogModule, TransformerModule, CategoriserModule, ScorerModule],
})
export class AppModule {}
