import { Module } from "@nestjs/common";
import { DqsModule } from "./dqs/dqs.module";

@Module({
  imports: [DqsModule],
})
export class AppModule {}
