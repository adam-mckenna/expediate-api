import { Module } from "@nestjs/common";
import { LogModule } from "./log/log.module";
import { CategoriserModule } from "./categoriser/categoriser.module";

@Module({
  imports: [LogModule, CategoriserModule],
})
export class AppModule {}
