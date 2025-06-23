import { Test, TestingModule } from "@nestjs/testing";
import { TransformerService } from "./transformer.service";

describe("TransformerService", () => {
  let service: TransformerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransformerService],
    }).compile();

    service = module.get<TransformerService>(TransformerService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return a unit if provided", () => {
    const log = "1 portion white bread";
    const { unit } = service.parse(log);
    expect(unit).toBe("portion");
  });

  it("should not return a unit if not provided", () => {
    const log = "1 steak";
    const { unit } = service.parse(log);
    expect(unit).toBe(null);
  });

  it("should return a quanity", () => {
    const log = "20 lembas breadrolls";
    const { quantity } = service.parse(log);
    expect(quantity).toBe(20);
  });

  it("should default to 1 if no quantity provided", () => {
    const log = "bananas";
    const { quantity } = service.parse(log);
    expect(quantity).toBe(1);
  });
});
