import { Body, Controller, Post } from '@nestjs/common';
import { DqsService } from './dqs.service';
import { FoodItemDto } from './dto/food-item.dto';

@Controller('dqs')
export class DqsController {
  constructor(private readonly dqsService: DqsService) {}

  @Post()
  async create(@Body() foodItems: FoodItemDto[]) {
    const data = this.dqsService.handleFoodItems(foodItems);
    return {
      success: true,
      message: 'DQS received',
      data,
    };
  }
}
