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

  it("should return the 'fruit' category when a fruit is provided", () => {
    const bananaCategory = service.categorise("banana");
    const appleCategory = service.categorise("apple");
    const orangeCategory = service.categorise("orange");
    const quinoaCategory = service.categorise("quinoa");

    expect(bananaCategory).toBe("fruit");
    expect(appleCategory).toBe("fruit");
    expect(orangeCategory).toBe("fruit");
    expect(quinoaCategory).not.toBe("fruit");
  });

  it("should return the 'vegetable' category when a vegetable is provided", () => {
    const broccoliCategory = service.categorise("broccoli");
    const carrotCategory = service.categorise("carrot");
    const kohlrabiCategory = service.categorise("kohlrabi");
    const quinoaCategory = service.categorise("quinoa");

    expect(broccoliCategory).toBe("vegetables");
    expect(carrotCategory).toBe("vegetables");
    expect(kohlrabiCategory).toBe("vegetables");
    expect(quinoaCategory).not.toBe("vegetables");
  });

  it("should return the 'lean meat and fish' category when lean meat or fish is provided", () => {
    const salmonCategory = service.categorise("salmon");
    const lowFatTurkeyCategory = service.categorise("low fat turkey");
    const chickenBreastCategory = service.categorise("chicken breast");
    const steakCategory = service.categorise("steak");

    expect(salmonCategory).toBe("lean-meat-and-fish");
    expect(lowFatTurkeyCategory).toBe("lean-meat-and-fish");
    expect(chickenBreastCategory).toBe("lean-meat-and-fish");
    expect(steakCategory).not.toBe("lean-meat-and-fish");
  });

  it("should return the 'nuts and seeds' category when nuts or seeds are provided", () => {
    const sesameSeedsCategory = service.categorise("sesame seeds");
    const peanutButterCategory = service.categorise("peanut butter");
    const walnutsCategory = service.categorise("walnuts");
    const cheeseCategory = service.categorise("cheddar cheese");

    expect(sesameSeedsCategory).toBe("nuts-seeds");
    expect(peanutButterCategory).toBe("nuts-seeds");
    expect(walnutsCategory).toBe("nuts-seeds");
    expect(cheeseCategory).not.toBe("nuts-seeds");
  });

  it("should return the 'whole grain' category when a whole grain is provided", () => {
    const oatsCategory = service.categorise("oats");
    const quinoaCategory = service.categorise("quinoa");
    const wholeMealFlourCategory = service.categorise("wholemeal flour");
    const bananaCategory = service.categorise("banana");

    expect(oatsCategory).toBe("whole-grains");
    expect(quinoaCategory).toBe("whole-grains");
    expect(wholeMealFlourCategory).toBe("whole-grains");
    expect(bananaCategory).not.toBe("whole-grains");
  });

  it("should return the 'dairy' category when dairy is provided", () => {
    const milkCategory = service.categorise("milk");
    const kefirCategory = service.categorise("kefir");
    const fetaCheeseCategory = service.categorise("feta cheese");
    const steakCategory = service.categorise("steak");

    expect(milkCategory).toBe("dairy");
    expect(kefirCategory).toBe("dairy");
    expect(fetaCheeseCategory).toBe("dairy");
    expect(steakCategory).not.toBe("dairy");
  });

  it("should return the 'refined grains' category when refined grains are provided", () => {
    const whiteBreadCategory = service.categorise("white bread");
    const pastaCategory = service.categorise("pasta");
    const whiteRiceCategory = service.categorise("white rice");
    const brownRiceCategory = service.categorise("brown rice");

    expect(whiteBreadCategory).toBe("refined-grains");
    expect(pastaCategory).toBe("refined-grains");
    expect(whiteRiceCategory).toBe("refined-grains");
    expect(brownRiceCategory).not.toBe("refined-grains");
  });

  it("should return the 'sweets' category when sweets are provided", () => {
    const cakeCategory = service.categorise("cake");
    const chocolateCategory = service.categorise("chocolate");
    const sweetsCategory = service.categorise("sweets");
    const datesCategory = service.categorise("dates");

    expect(cakeCategory).toBe("sweets");
    expect(chocolateCategory).toBe("sweets");
    expect(sweetsCategory).toBe("sweets");
    expect(datesCategory).not.toBe("sweets");
  });

  it("should return the 'fried foods' category when fried foods are provided", () => {
    const crispsCategory = service.categorise("crisps");
    const friedChickenCategory = service.categorise("fried chicken");
    const tempuraCategory = service.categorise("tempura");
    const chickenBreastCategory = service.categorise("chicken breast");

    expect(crispsCategory).toBe("fried-foods");
    expect(friedChickenCategory).toBe("fried-foods");
    expect(tempuraCategory).toBe("fried-foods");
    expect(chickenBreastCategory).not.toBe("fried-foods");
  });

  it("should return the 'fatty proteins' category when fatty proteins are provided", () => {
    const steakCategory = service.categorise("steak");
    const sausagesCategory = service.categorise("sausage");
    const chickenThighCategory = service.categorise("chicken thigh");
    const chickenBreastCategory = service.categorise("chicken breast");

    expect(steakCategory).toBe("fatty-proteins");
    expect(sausagesCategory).toBe("fatty-proteins");
    expect(chickenThighCategory).toBe("fatty-proteins");
    expect(chickenBreastCategory).not.toBe("fatty-proteins");
  });

  it("should return the 'unknown' category when a non-food item is provided", () => {
    const unknownCategory = service.categorise("lembas bread");

    expect(unknownCategory).toBe("unknown");
  });
});
