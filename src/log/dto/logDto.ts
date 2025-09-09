import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LogDto {
  @IsString()
  @ApiProperty({
    description: "A comma-separated list of all the food ate",
  })
  log: string;
}
