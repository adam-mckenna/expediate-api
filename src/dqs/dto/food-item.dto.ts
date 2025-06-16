import { IsString, IsNumber, Min } from 'class-validator';

export class FoodItemDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  quantity: number;
}
