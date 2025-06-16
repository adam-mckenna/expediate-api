import { Test, TestingModule } from "@nestjs/testing";
import { DqsController } from "./dqs.controller";
import { DqsService } from "./dqs.service";

describe("DqsController", () => {
  let controller: DqsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DqsController],
      providers: [DqsService],
    }).compile();

    controller = module.get<DqsController>(DqsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
