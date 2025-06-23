import { Test, TestingModule } from "@nestjs/testing";
import { LogController } from "./log.controller";
import { LogService } from "./log.service";
import { ParserService } from "./../parser/parser.service";
import { CategoriserService } from "./../categoriser/categoriser.service";
import { ScorerService } from "src/scorer/scorer.service";

describe("LogController", () => {
  let controller: LogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogController],
      providers: [LogService, ParserService, CategoriserService, ScorerService],
    }).compile();

    controller = module.get<LogController>(LogController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
