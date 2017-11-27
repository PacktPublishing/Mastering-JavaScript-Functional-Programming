

describe("with partialByEval()", function() {
  it("you could fix no arguments", () => {
    const nonsensePC0 = partialByEval(nonsense);
    expect(nonsensePC0.length).toBe(5);
    expect(nonsensePC0(0,1,2,3,4)).toBe(nonsense(0,1,2,3,4));
  });

  it("you could fix only some initial arguments", () => {
    const nonsensePC1 = partialByEval(nonsense, 1, 2, 3);
    expect(nonsensePC1.length).toBe(2);
    expect(nonsensePC1(4,5)).toBe(nonsense(1,2,3,4,5));
  });

  it("you could skip some arguments", () => {
    const nonsensePC2 = partialByEval(nonsense, undefined, 22, undefined, 44);
    expect(nonsensePC2.length).toBe(3);
    expect(nonsensePC2(11,33,55)).toBe(nonsense(11,22,33,44,55));
  });

  it("you could fix only some last arguments", () => {
    const nonsensePC3 = partialByEval(nonsense, undefined, undefined, undefined, 444, 555);
    expect(nonsensePC3.length).toBe(3);
    expect(nonsensePC3(111,222,333)).toBe(nonsense(111,222,333,444,555));
  });

  it("you could fix ALL the arguments", () => {
    const nonsensePC4 = partialByEval(nonsense, 6, 7, 8, 9, 0);
    expect(nonsensePC4.length).toBe(0);
    expect(nonsensePC4()).toBe(nonsense(6,7,8,9,0));
  });
});

describe("with partialByClosure()", function() {
  it("you could fix no arguments", () => {
    const nonsensePC0 = partialByClosure(nonsense);
    expect(nonsensePC0(0,1,2,3,4)).toBe(nonsense(0,1,2,3,4));
  });

  it("you could fix only some initial arguments, and then some more", () => {
    const nonsensePC1 = partialByClosure(nonsense, 1, 2, 3);
    const nonsensePC1b = nonsensePC1(undefined, 5);
    expect(nonsensePC1b(4)).toBe(nonsense(1,2,3,4,5));
  });

  it("you could skip some arguments", () => {
    const nonsensePC2 = partialByClosure(nonsense, undefined, 22, undefined, 44);
    expect(nonsensePC2(11,33,55)).toBe(nonsense(11,22,33,44,55));
  });

  it("you could fix only some last arguments", () => {
    const nonsensePC3 = partialByClosure(nonsense, undefined, undefined, undefined, 444, 555);
    expect(nonsensePC3(111)(222,333)).toBe(nonsense(111,222,333,444,555));
  });

  it("you could simulate currying", () => {
    const nonsensePC4 = partialByClosure(nonsense);
    expect(nonsensePC4(6)(7)(8)(9)(0)).toBe(nonsense(6,7,8,9,0));
  });


  it("you could fix ALL the arguments", () => {
    const nonsensePC5 = partialByClosure(nonsense, 16, 17, 18, 19, 20);
    expect(nonsensePC5()).toBe(nonsense(16,17,18,19,20));
  });
});

