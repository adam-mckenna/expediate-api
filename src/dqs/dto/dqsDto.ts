import { IsString, IsNumber, Min, IsArray, IsObject } from "class-validator";

class FoodItem {
  @IsString()
  name: string;

  @IsNumber()
  @Min(10)
  quantity: number;
}

export class DqsDto {
  // todo: figure out why nested validation isn't working
  @IsArray()
  @IsObject({ each: true })
  items: FoodItem[];
}
