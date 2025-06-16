import { Injectable } from '@nestjs/common';
import { FoodItemDto } from './dto/food-item.dto';

@Injectable()
export class DqsService {
  handleFoodItems(foodItems: FoodItemDto[]): FoodItemDto[] {
    // You can add business logic here
    console.log(foodItems);
    return foodItems;
  }
}
