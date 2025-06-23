import { Test, TestingModule } from "@nestjs/testing";
import { LogController } from "./log.controller";
import { LogService } from "./log.service";
import { TransformerService } from "../transformer/transformer.service";
import { CategoriserService } from "./../categoriser/categoriser.service";
import { ScorerService } from "./../scorer/scorer.service";

describe("LogController", () => {
  let controller: LogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogController],
      providers: [LogService, CategoriserService, ScorerService, TransformerService],
    }).compile();

    controller = module.get<LogController>(LogController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
