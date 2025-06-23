import { Test, TestingModule } from "@nestjs/testing";
import { LogService } from "./log.service";
import { ParserService } from "src/parser/parser.service";
import { CategoriserService } from "src/categoriser/categoriser.service";
import { ScorerService } from "src/scorer/scorer.service";

describe("LogService", () => {
  let service: LogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogService, ParserService, CategoriserService, ScorerService],
    }).compile();

    service = module.get<LogService>(LogService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
