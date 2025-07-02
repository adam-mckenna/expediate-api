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

  it("should strip out filler words if provided", () => {
    const log = "1 portion of white bread";
    const { unit, food, quantity } = service.parse(log);
    expect(food).toBe("white bread");
    expect(unit).toBe("portion");
    expect(quantity).toBe(1);
  });

  it("should return a unit if provided", () => {
    const log = "1 portion of white bread";
    const { unit } = service.parse(log);
    expect(unit).toBe("portion");
  });

  it("should not return a unit if not provided", () => {
    const log = "1 steak";
    const { unit } = service.parse(log);
    expect(unit).toBe(null);
  });

  it("should return a unit even when no quantity provided", () => {
    const log = "portion white bread";
    const { unit, quantity } = service.parse(log);
    expect(unit).toBe("portion");
    expect(quantity).toBe(1);
  });

  it("should return a quanity", () => {
    const log = "20 lembas breadrolls";
    const { quantity } = service.parse(log);
    expect(quantity).toBe(20);
  });

  it("should default to 1 if no quantity provided", () => {
    const log = "bananas";
    const { quantity, unit, unitType } = service.parse(log);
    expect(quantity).toBe(1);
    expect(unit).toBe(null);
    expect(unitType).toBe(null);
  });

  it("should give me an objective type based on the unit provided", () => {
    const log = "100g oats";
    const { unit, unitType, quantity } = service.parse(log);
    expect(unit).toBe("g");
    expect(unitType).toBe("objective");
    expect(quantity).toBe(100);
  });

  it("should give me a subjective type based on the unit provided", () => {
    const log = "1 portion oats";
    const { unit, unitType, quantity } = service.parse(log);
    expect(unit).toBe("portion");
    expect(unitType).toBe("subjective");
    expect(quantity).toBe(1);
  });
});
