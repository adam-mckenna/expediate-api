import { Test, TestingModule } from "@nestjs/testing";
import { LogService } from "./log.service";
import { TransformerService } from "./../transformer/transformer.service";
import { CategoriserService } from "./../categoriser/categoriser.service";
import { ScorerService } from "./../scorer/scorer.service";

describe("LogService", () => {
  let service: LogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LogService,
        TransformerService,
        CategoriserService,
        ScorerService,
      ],
    }).compile();

    service = module.get<LogService>(LogService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should give a lot of negative points for a junk food", () => {
    const payload = {
      log: "2 scoops ice cream, 4 biscuits, 1 piece cake",
    };
    const { totalScore } = service.create(payload);
    expect(totalScore).toBe(-10);
  });

  it("should correct log a random day of eating", () => {
    const payload = {
      log: "1 serving oats, 15g honey, 25g peanut butter, banana, apple, 1 black coffee, 50g wholemeal pasta, tomato sauce, broccoli, red pepper, lettuce, 30g gorgonzola, 100g gnocchi, leeks, 50g dark chocolate",
    };
    // todo: implement test
  });

  it("should correctly score my breakfast", () => {
    // categories:
    // whole grains: oats
    // nuts and seeds: peanut butter
    // fruits: banana
    // dairy: milk
    const payload = {
      log: "oats, tahini, peanut butter, 1 banana, 1 portion milk, 15g honey",
    };
    const { totalScore, logs } = service.create(payload);
    expect(totalScore).toBe(7);
    expect(logs["whole-grains"]).toStrictEqual({
      score: 2,
      logs: [
        {
          category: "whole-grains",
          quantity: 1,
          servings: 1,
          unit: null,
          unitType: null,
          food: "oats",
          score: 2,
        },
      ],
    });
    expect(logs["nuts-seeds"]).toStrictEqual({
      score: 4,
      logs: [
        {
          category: "nuts-seeds",
          quantity: 1,
          servings: 1,
          unit: null,
          unitType: null,
          food: "tahini",
          score: 2,
        },
        {
          category: "nuts-seeds",
          quantity: 1,
          servings: 1,
          unit: null,
          unitType: null,
          food: "peanut butter",
          score: 2,
        },
      ],
    });
    expect(logs["fruit"]).toStrictEqual({
      score: 2,
      logs: [
        {
          category: "fruit",
          quantity: 1,
          servings: 1,
          unit: null,
          unitType: null,
          food: "banana",
          score: 2,
        },
      ],
    });
    expect(logs["dairy"]).toStrictEqual({
      score: 1,
      logs: [
        {
          category: "dairy",
          quantity: 1,
          servings: 1,
          unit: "portion",
          unitType: "subjective",
          food: "milk",
          score: 1,
        },
      ],
    });
    expect(logs["sweets"]).toStrictEqual({
      score: -2,
      logs: [
        {
          category: "sweets",
          quantity: 15,
          servings: 1,
          unit: "g",
          unitType: "objective",
          food: "honey",
          score: -2,
        },
      ],
    });
  });
});
