import { Test, TestingModule } from "@nestjs/testing";
import { LogController } from "./log.controller";
import { LogService } from "./log.service";
import { CategoriserService } from "./../categoriser/categoriser.service";

describe("LogController", () => {
  let controller: LogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogController],
      providers: [LogService, CategoriserService],
    }).compile();

    controller = module.get<LogController>(LogController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
