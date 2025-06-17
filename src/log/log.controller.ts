import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { LogService } from "./log.service";
import { LogDto } from "./dto/logDto";

@Controller("log")
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Post()
  create(@Body() dqsDto: LogDto) {
    return this.logService.create(dqsDto);
  }

  @Get()
  findAll() {
    return this.logService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.logService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string) {
    return this.logService.update(+id, null);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.logService.remove(+id);
  }
}
