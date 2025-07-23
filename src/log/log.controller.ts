import { Controller, Post, Body } from "@nestjs/common";

import { LogService } from "./log.service";
import { LogDto } from "./dto/logDto";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { CompleteLog } from "./scoredLog";

@Controller("log")
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Post()
  @ApiOperation({
    summary:
      "A parsed and scored collection based on a food log input of comma-separated food items.",
  })
  @ApiOkResponse({
    description: "A parsed, categorised and scored collection of food items",
    type: CompleteLog,
    example: "1 packet of oats, 2 bananas, 250ml milk",
  })
  create(@Body() logDto: LogDto) {
    return this.logService.create(logDto);
  }
}
