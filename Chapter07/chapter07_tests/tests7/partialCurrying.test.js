describe("with partialCurryingByBind", function() {
  it("you could fix arguments in several steps", () => {
    const make3a = partialCurryingByBind(make3);
    const make3b = make3a(1,2);
    const make3c = make3b(3);
    expect(make3c).toBe(make3(1,2,3));
  });

  it("you could fix arguments in a single step", () => {
    const make3a = partialCurryingByBind(make3);
    const make3b = make3a(10,11,12);
    expect(make3b).toBe(make3(10,11,12));
  });

  it("you could fix ALL the arguments", () => {
    const make3all = partialCurryingByBind(make3);
    expect(make3all(20,21,22)).toBe(make3(20,21,22));
  });

  it("you could fix one argument at a time", () => {
    const make3one = partialCurryingByBind(make3)(30)(31)(32);
    expect(make3one).toBe(make3(30,31,32));
  });
});

// const sum = (...args) => args.reduce((x,y) => x+y, 0);

describe("with partialCurryingByBind2", function() {
  it("you could fix arguments in several steps", () => {
    const suma = partialCurryingByBind2(sum,3);
    const sumb = suma(1,2);
    const sumc = sumb(3);
    expect(sumc).toBe(sum(1,2,3));
  });

  it("you could fix arguments in a single step", () => {
    const suma = partialCurryingByBind2(sum,4);
    const sumb = suma(10,11,12,13);
    expect(sumb).toBe(sum(10,11,12,13));
  });

  it("you could fix ALL the arguments", () => {
    const sumall = partialCurryingByBind2(sum,5);
    expect(sumall(20,21,22,23,24)).toBe(sum(20,21,22,23,24));
  });

  it("you could fix one argument at a time", () => {
    const sumone = partialCurryingByBind2(sum,6)(30)(31)(32)(33)(34)(35);
    expect(sumone).toBe(sum(30,31,32,33,34,35));
  });
});
