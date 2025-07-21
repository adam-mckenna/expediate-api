import { Controller, Get, Param } from "@nestjs/common";

import { FoodCategoryMap } from "./foods.map";
import { FoodCategory } from "./category.type";

@Controller("categories")
export class CategoriserController {
  constructor() {}

  @Get()
  allCategorises() {
    return FoodCategoryMap;
  }

  @Get(":category")
  category(@Param("category") category: FoodCategory) {
    return FoodCategoryMap[category];
  }
}
