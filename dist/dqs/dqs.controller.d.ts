import { DqsService } from './dqs.service';
import { FoodItemDto } from './dto/food-item.dto';
export declare class DqsController {
    private readonly dqsService;
    constructor(dqsService: DqsService);
    create(foodItems: FoodItemDto[]): Promise<{
        success: boolean;
        message: string;
        data: FoodItemDto[];
    }>;
}
