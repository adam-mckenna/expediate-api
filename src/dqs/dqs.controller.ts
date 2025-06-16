import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { DqsService } from "./dqs.service";
import { DqsDto } from "./dto/dqsDto";

@Controller("dqs")
export class DqsController {
  constructor(private readonly dqsService: DqsService) {}

  @Post()
  create(@Body() dqsDto: DqsDto) {
    return this.dqsService.create(dqsDto);
  }

  @Get()
  findAll() {
    return this.dqsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.dqsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string) {
    return this.dqsService.update(+id, null);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.dqsService.remove(+id);
  }
}
