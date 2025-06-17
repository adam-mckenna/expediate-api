import { IsString } from "class-validator";

export class LogDto {
  @IsString()
  food: string;
}
