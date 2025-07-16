import { Test, TestingModule } from "@nestjs/testing";
import { LogItem, ScorerService } from "./scorer.service";

describe("ScorerService", () => {
  let service: ScorerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScorerService],
    }).compile();

    service = module.get<ScorerService>(ScorerService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should give a total score of '10' with the following input", () => {
    const payload = [
      // score = 7
      { category: "fruit", quantity: 4, unit: null, food: "bananas" },
      // score = -2 (2 sausages = 1 portion)
      {
        category: "fatty-proteins",
        quantity: 3,
        unit: "portion",
        food: "sausages",
      },
      // score = 0
      { category: "fruit", quantity: 1, unit: null, food: "apple" },
      // score = 4
      {
        category: "lean-meat-and-fish",
        quantity: 2,
        unit: "portion",
        food: "tuna",
      },
      // score = 4
      {
        category: "whole-grains",
        quantity: 2,
        unit: "portion",
        food: "brown rice",
      },
      // score = -2
      {
        category: "refined-grains",
        quantity: 2,
        unit: "slices",
        food: "white bread",
      },
    ];
    expect(service.score(payload as Array<LogItem>).totalScore).toBe(11);
  });

  it("should give a score of 2 when 1 portion of fruit is provided", () => {
    const payload = [{ category: "fruit", quantity: 50, unit: "g" }];
    expect(service.score(payload as Array<LogItem>).totalScore).toBe(2);
  });

  it("should give a score of 7 when 5+ portions of fruit is provided", () => {
    const payload = [{ category: "fruit", quantity: 7 }];
    expect(service.score(payload as Array<LogItem>).totalScore).toBe(7);
  });

  it("should give a score of 2 when 1 portion of vegetables is provided", () => {
    const payload = [{ category: "vegetables", quantity: 1 }];
    expect(service.score(payload as Array<LogItem>).totalScore).toBe(2);
  });

  it("should give a score of 7 when 5+ portions of vegetables is provided", () => {
    const payload = [{ category: "vegetables", quantity: 7 }];
    expect(service.score(payload as Array<LogItem>).totalScore).toBe(7);
  });

  it("should give a score of 2 when 1 portion of lean meat/fish is provided", () => {
    const payload = [{ category: "lean-meat-and-fish", quantity: 1 }];
    expect(service.score(payload as Array<LogItem>).totalScore).toBe(2);
  });

  it("should give a score of 5 when 5 portions of lean meat/fish is provided", () => {
    const payload = [{ category: "lean-meat-and-fish", quantity: 5 }];
    expect(service.score(payload as Array<LogItem>).totalScore).toBe(5);
  });

  it("should give a score of 4 when 6 portions of lean meat/fish is provided", () => {
    const payload = [{ category: "lean-meat-and-fish", quantity: 6 }];
    expect(service.score(payload as Array<LogItem>).totalScore).toBe(4);
  });

  it("should give a score of 2 when 1 portion of nuts/seeds is provided", () => {
    const payload = [{ category: "nuts-seeds", quantity: 1 }];
    expect(service.score(payload as Array<LogItem>).totalScore).toBe(2);
  });

  it("should give a score of 5 when 5 portions of nuts/seeds is provided", () => {
    const payload = [{ category: "nuts-seeds", quantity: 5 }];
    expect(service.score(payload as Array<LogItem>).totalScore).toBe(5);
  });

  it("should give a score of 4 when 6 portions of nuts/seeds is provided", () => {
    const payload = [{ category: "nuts-seeds", quantity: 6 }];
    expect(service.score(payload as Array<LogItem>).totalScore).toBe(4);
  });

  it("should give a score of 2 when 1 portion of whole grain is provided", () => {
    const payload = [{ category: "whole-grains", quantity: 1 }];
    expect(service.score(payload as Array<LogItem>).totalScore).toBe(2);
  });

  it("should give a score of 5 when 5 portions of whole grain is provided", () => {
    const payload = [{ category: "whole-grains", quantity: 5 }];
    expect(service.score(payload as Array<LogItem>).totalScore).toBe(5);
  });

  it("should give a score of 4 when 6 portions of whole grain is provided", () => {
    const payload = [{ category: "whole-grains", quantity: 6 }];
    expect(service.score(payload as Array<LogItem>).totalScore).toBe(4);
  });

  it("should give a score of 1 when 1 portion of dairy is provided", () => {
    const payload = [{ category: "dairy", quantity: 1 }];
    expect(service.score(payload as Array<LogItem>).totalScore).toBe(1);
  });

  it("should give a score of 3 when 4 portions of dairy is provided", () => {
    const payload = [{ category: "dairy", quantity: 4 }];
    expect(service.score(payload as Array<LogItem>).totalScore).toBe(3);
  });

  it("should give a score of 2 when 5 portions of dairy is provided", () => {
    const payload = [{ category: "dairy", quantity: 5 }];
    expect(service.score(payload as Array<LogItem>).totalScore).toBe(2);
  });

  it("should give a score of 0 when 6 portions of dairy is provided", () => {
    const payload = [{ category: "dairy", quantity: 6 }];
    expect(service.score(payload as Array<LogItem>).totalScore).toBe(0);
  });

  it("should give a score of -1 when 1 portion of refined grains is provided", () => {
    const payload = [{ category: "refined-grains", quantity: 1 }];
    expect(service.score(payload as Array<LogItem>).totalScore).toBe(-1);
  });

  it("should give a score of -4 when 3 portions of refined grains is provided", () => {
    const payload = [{ category: "refined-grains", quantity: 3 }];
    expect(service.score(payload as Array<LogItem>).totalScore).toBe(-4);
  });

  it("should give a score of -10 when 6 portions of refined grains is provided", () => {
    const payload = [{ category: "refined-grains", quantity: 6 }];
    expect(service.score(payload as Array<LogItem>).totalScore).toBe(-10);
  });

  it("should give a score of -2 when 1 portion of sweets is provided", () => {
    const payload = [{ category: "sweets", quantity: 1 }];
    expect(service.score(payload as Array<LogItem>).totalScore).toBe(-2);
  });

  it("should give a score of -6 when 3 portions of sweets is provided", () => {
    const payload = [{ category: "sweets", quantity: 3 }];
    expect(service.score(payload as Array<LogItem>).totalScore).toBe(-6);
  });

  it("should give a score of -12 when 6 portions of sweets is provided", () => {
    const payload = [{ category: "sweets", quantity: 6 }];
    expect(service.score(payload as Array<LogItem>).totalScore).toBe(-12);
  });

  it("should give a score of -2 when 1 portion of fried foods is provided", () => {
    const payload = [{ category: "fried-foods", quantity: 1 }];
    expect(service.score(payload as Array<LogItem>).totalScore).toBe(-2);
  });

  it("should give a score of -6 when 3 portions of fried foods is provided", () => {
    const payload = [{ category: "fried-foods", quantity: 3 }];
    expect(service.score(payload as Array<LogItem>).totalScore).toBe(-6);
  });

  it("should give a score of -12 when 6 portions of fried foods is provided", () => {
    const payload = [{ category: "fried-foods", quantity: 6 }];
    expect(service.score(payload as Array<LogItem>).totalScore).toBe(-12);
  });

  it("should give a score of -1 when 1 portion of fatty proteins is provided", () => {
    const payload = [{ category: "fatty-proteins", quantity: 1 }];
    expect(service.score(payload as Array<LogItem>).totalScore).toBe(-1);
  });

  it("should give a score of -4 when 3 portions of fatty proteins is provided", () => {
    const payload = [{ category: "fatty-proteins", quantity: 3 }];
    expect(service.score(payload as Array<LogItem>).totalScore).toBe(-4);
  });

  it("should give a score of -10 when 6 portions of fatty proteins is provided", () => {
    const payload = [{ category: "fatty-proteins", quantity: 6 }];
    expect(service.score(payload as Array<LogItem>).totalScore).toBe(-10);
  });

  it("should give a score of 4 when 100g of oats is provided", () => {
    const payload = [{ category: "whole-grains", quantity: 100, unit: "g" }];
    expect(service.score(payload as Array<LogItem>).totalScore).toBe(4);
  });

  it("should give a score of 4 when 2 servings of oats is provided", () => {
    const payload = [
      { category: "whole-grains", quantity: 2, unit: "serving" },
    ];
    expect(service.score(payload as Array<LogItem>).totalScore).toBe(4);
  });
});
