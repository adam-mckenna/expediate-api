import { Test, TestingModule } from "@nestjs/testing";
import { LogService } from "./log.service";
import { CategoriserService } from "./../categoriser/categoriser.service";

describe("LogService", () => {
  let service: LogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogService, CategoriserService],
    }).compile();

    service = module.get<LogService>(LogService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
