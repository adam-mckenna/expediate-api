import { Test, TestingModule } from "@nestjs/testing";
import { DqsService } from "./dqs.service";

describe("DqsService", () => {
  let service: DqsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DqsService],
    }).compile();

    service = module.get<DqsService>(DqsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
