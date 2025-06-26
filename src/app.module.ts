import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { LogModule } from "./log/log.module";
import { CategoriserModule } from "./categoriser/categoriser.module";
import { TransformerModule } from "./transformer/transformer.module";
import { ScorerModule } from "./scorer/scorer.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    LogModule,
    TransformerModule,
    CategoriserModule,
    ScorerModule,
  ],
})
export class AppModule {}
