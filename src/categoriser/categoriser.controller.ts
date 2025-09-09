import { Controller, Get, Param } from "@nestjs/common";

import { FoodCategoryMap } from "./foods.map";
import { FoodCategory } from "./category.type";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller("categories")
export class CategoriserController {
  constructor() {}

  @Get()
  @ApiOperation({ summary: "Get all categories and the food items inside." })
  @ApiResponse({
    status: 200,
    description:
      "An object containing all food categories, which themselves contain an array of their food items",
    type: Object,
  })
  allCategories() {
    return FoodCategoryMap;
  }

  @Get(":category")
  @ApiOperation({
    summary: "Get all food items inside a specific category by category name.",
  })
  @ApiResponse({
    status: 200,
    description: "An array containing all the food items in the category",
    type: String,
    isArray: true,
  })
  category(@Param("category") category: FoodCategory) {
    return FoodCategoryMap[category];
  }
}
