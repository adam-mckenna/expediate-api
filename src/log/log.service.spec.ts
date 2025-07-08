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

  it("should correctly score my breakfast", () => {
    const payload = {
      log: "oats, peanut butter, 1 banana, 1 portion milk, 15g honey",
    };
    const { totalScore, scoredLogs } = service.create(payload);
    expect(scoredLogs.length).toBe(5);
    expect(totalScore).toBe(5);
    expect(scoredLogs[0]).toStrictEqual({
      category: "whole-grains",
      quantity: 1,
      unit: null,
      unitType: null,
      food: "oats",
      score: 2,
    });
    expect(scoredLogs[1]).toStrictEqual({
      category: "nuts-seeds",
      quantity: 1,
      unit: null,
      unitType: null,
      food: "peanut butter",
      score: 2,
    });
    expect(scoredLogs[2]).toStrictEqual({
      category: "fruit",
      quantity: 1,
      unit: null,
      unitType: null,
      food: "banana",
      score: 2,
    });
    expect(scoredLogs[3]).toStrictEqual({
      category: "dairy",
      quantity: 1,
      unit: "portion",
      unitType: "subjective",
      food: "milk",
      score: 1,
    });
    expect(scoredLogs[4]).toStrictEqual({
      category: "sweets",
      quantity: 15,
      unit: "g",
      unitType: "objective",
      food: "honey",
      score: -2,
    });
  });
});
