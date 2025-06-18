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

  it("should return the 'whole-grain' category when a whole grain is provided", () => {
    const oatsCategory = service.categorise("oats");
    const quinoaCategory = service.categorise("quinoa");
    const bananaCategory = service.categorise("banana");

    expect(oatsCategory).toBe("whole-grain");
    expect(quinoaCategory).toBe("whole-grain");
    expect(bananaCategory).not.toBe("whole-grain");
  });
});
