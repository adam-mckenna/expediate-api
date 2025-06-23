import { Module } from "@nestjs/common";
import { LogModule } from "./log/log.module";
import { CategoriserModule } from "./categoriser/categoriser.module";
import { ParserModule } from "./parser/parser.module";
import { ScorerModule } from "./scorer/scorer.module";

@Module({
  imports: [LogModule, ParserModule, CategoriserModule, ScorerModule],
})
export class AppModule {}
