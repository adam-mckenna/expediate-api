import { Injectable } from "@nestjs/common";
import { LogDto } from "./dto/logDto";

@Injectable()
export class LogService {
  create(createDqDto: LogDto) {
    console.log(createDqDto);
    return "This action adds a new dq";
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
