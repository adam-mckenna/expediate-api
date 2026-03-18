import { Controller, Post, Body } from "@nestjs/common";

import { LogService } from "./log.service";
import { LogDto } from "./dto/logDto";
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  getSchemaPath,
} from "@nestjs/swagger";
import { CategoryLog, CompleteLog, ScoredLogItem } from "./scoredLog";

@Controller("log")
@ApiExtraModels(CompleteLog, CategoryLog, ScoredLogItem)
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Post()
  @ApiOperation({
    summary:
      "A parsed and scored collection based on a food log input of comma-separated food items.",
  })
  @ApiOkResponse({
    description: "A parsed, categorised and scored collection of food items",
    schema: {
      allOf: [
        { $ref: getSchemaPath(CompleteLog) },
        {
          example: {
            totalScore: 6,
            logs: {
              fruit: {
                score: 4,
                logs: [
                  {
                    score: 2,
                    food: "banana",
                    unit: "piece",
                    quantity: 2,
                    category: "fruit",
                  },
                ],
              },
              dairy: {
                score: 2,
                logs: [
                  {
                    score: 2,
                    food: "milk",
                    unit: "ml",
                    quantity: 250,
                    category: "dairy",
                  },
                ],
              },
            },
          },
        },
      ],
    },
  })
  create(@Body() logDto: LogDto) {
    return this.logService.create(logDto);
  }
}
