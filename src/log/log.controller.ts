import { Controller, Post, Body } from "@nestjs/common";

import { LogService } from "./log.service";
import { LogDto } from "./dto/logDto";

@Controller("log")
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Post()
  create(@Body() dqsDto: LogDto) {
    return this.logService.create(dqsDto);
  }
}
