// const make3 = (a, b, c) => String(100*a + 10*b + c);

describe("with curryByBind", function() {
  it("you fix arguments one by one", () => {
    const make3a = curryByBind(make3);
    const make3b = make3a(1)(2);
    const make3c = make3b(3);
    expect(make3c).toBe(make3(1,2,3));
  });
});


// const sum = (...args) => args.reduce((x,y) => x+y, 0);

describe("with curryByBind2", function() {
  it("you fix arguments one by one", () => {
    const suma = curryByBind2(sum,5);
    const sumb = suma(1)(2)(3)(4)(5);
    expect(sumb).toBe(sum(1,2,3,4,5));
  });

  it("you can also work with arity 1", () => {
    const suma = curryByBind2(sum,1);
    const sumb = suma(111);
    expect(sumb).toBe(sum(111));
  });
});
