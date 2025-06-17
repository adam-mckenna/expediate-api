import { Injectable } from "@nestjs/common";
import { LogDto } from "./dto/logDto";
import { parseLoggedFood } from "./utils/parseLoggedFood";

@Injectable()
export class LogService {
  create(logDto: LogDto) {
    const logs = logDto.food.split(",").map((log) => parseLoggedFood(log));

    return logs;
  }

  findAll() {
    return `This action returns all Log`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dq`;
  }

  update(id: number, updateDqDto) {
    return `This action updates a #${id} dq`;
  }

  remove(id: number) {
    return `This action removes a #${id} dq`;
  }
}
