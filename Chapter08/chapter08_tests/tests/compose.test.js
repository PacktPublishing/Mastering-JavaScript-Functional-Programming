var fn1, fn2, fn3, fn4;

describe("composeTwo", function() {
  beforeEach(() => {
    fn1 = () => {};
    fn2 = () => {};
  });

  it("works with single arguments", () => {
    spyOn(window, "fn1").and.returnValue(1);
    spyOn(window, "fn2").and.returnValue(2);

    const result = composeTwo(fn1, fn2)(22);

    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn2).toHaveBeenCalledTimes(1);
    expect(fn1).toHaveBeenCalledWith(2);
    expect(fn2).toHaveBeenCalledWith(22);
    expect(result).toBe(1);
  });

  it("works with multiple arguments", () => {
    spyOn(window, "fn1").and.returnValue(11);
    spyOn(window, "fn2").and.returnValue(22);

    const result = composeTwo(fn1, fn2)(12, 4, 56);

    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn2).toHaveBeenCalledTimes(1);
    expect(fn1).toHaveBeenCalledWith(22);
    expect(fn2).toHaveBeenCalledWith(12, 4, 56);
    expect(result).toBe(11);
  });
});

describe("compose", function() {
  beforeEach(() => {
    fn1 = () => {};
    fn2 = () => {};
    fn3 = () => {};
    fn4 = () => {};
  });

  it("works with a single function", () => {
    spyOn(window, "fn1").and.returnValue(11);

    const pipe = compose(fn1);

    const result = pipe(60);

    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn1).toHaveBeenCalledWith(60);
    expect(result).toBe(11);
  });

  it("works with 2 functions, single arguments", () => {
    spyOn(window, "fn1").and.returnValue(1);
    spyOn(window, "fn2").and.returnValue(2);

    const pipe = compose(fn2, fn1);
    const result = pipe(24); 

    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn2).toHaveBeenCalledTimes(1);

    expect(fn1).toHaveBeenCalledWith(24);
    expect(fn2).toHaveBeenCalledWith(1);
    expect(result).toBe(2);
  });

  it("works with 3 functions, single arguments", () => {
    spyOn(window, "fn1").and.returnValue(1);
    spyOn(window, "fn2").and.returnValue(2);
    spyOn(window, "fn3").and.returnValue(3);

    const pipe = compose(fn3, fn2, fn1);
    const result = pipe(24);

    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn2).toHaveBeenCalledTimes(1);
    expect(fn3).toHaveBeenCalledTimes(1);

    expect(fn1).toHaveBeenCalledWith(24);
    expect(fn2).toHaveBeenCalledWith(1);
    expect(fn3).toHaveBeenCalledWith(2);
    expect(result).toBe(3);
  });

  it("works with 4 functions, multiple arguments", () => {
    spyOn(window, "fn1").and.returnValue(111);
    spyOn(window, "fn2").and.returnValue(222);
    spyOn(window, "fn3").and.returnValue(333);
    spyOn(window, "fn4").and.returnValue(444);

    const pipe = compose(fn4, fn3, fn2, fn1);
    const result = pipe(24, 11, 63);

    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn2).toHaveBeenCalledTimes(1);
    expect(fn3).toHaveBeenCalledTimes(1);
    expect(fn4).toHaveBeenCalledTimes(1);

    expect(fn1).toHaveBeenCalledWith(24, 11, 63);
    expect(fn2).toHaveBeenCalledWith(111);
    expect(fn3).toHaveBeenCalledWith(222);
    expect(fn4).toHaveBeenCalledWith(333);
    expect(result).toBe(444);
  });
});
