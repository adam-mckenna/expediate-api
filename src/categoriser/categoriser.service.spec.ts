import { Test, TestingModule } from "@nestjs/testing";
import { CategoriserService } from "./categoriser.service";

describe("CategoriserService", () => {
  let service: CategoriserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriserService],
    }).compile();

    service = module.get<CategoriserService>(CategoriserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
