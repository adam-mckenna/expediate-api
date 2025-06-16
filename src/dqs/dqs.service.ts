import { Injectable } from "@nestjs/common";
import { DqsDto } from "./dto/dqsDto";

@Injectable()
export class DqsService {
  create(createDqDto: DqsDto) {
    return "This action adds a new dq";
  }

  findAll() {
    return `This action returns all dqs`;
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
