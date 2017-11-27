describe("after addLogging()", function() {
  it("a well behaved function should log twice", () => {
    let something = (a, b) => `result=${a}:${b}`;
    something = addLogging(something);

    spyOn(window.console, "log");
    something(22, 9);
    expect(window.console.log).toHaveBeenCalledTimes(2);
    expect(window.console.log).toHaveBeenCalledWith("entering something: 22,9");
    expect(window.console.log).toHaveBeenCalledWith("exiting something: result=22:9");
  });

  it("a throwing function should be reported", () => {
    let thrower = (a,b,c) => { throw "CRASH!";};
    spyOn(window.console, "log");
    expect(thrower).toThrow();

    thrower = addLogging(thrower);
    try {
        thrower(1,2,3);
    } catch (e) {
        expect(window.console.log).toHaveBeenCalledTimes(2);
        expect(window.console.log).toHaveBeenCalledWith("entering thrower: 1,2,3");
        expect(window.console.log).toHaveBeenCalledWith("exiting thrower: threw CRASH!");
    }
  });
});


describe("after addLogging2()", function(){
    let dummy;

    beforeEach(() => {
        dummy = { logger() {} };
        spyOn(dummy, 'logger');
    });

    it("should call the provided logger", () => {
        let something = (a, b) => `result=${a}:${b}`;
        something = addLogging2(something, dummy.logger);

        something(22, 9);
        expect(dummy.logger).toHaveBeenCalledTimes(2);
        expect(dummy.logger).toHaveBeenCalledWith("entering something: 22,9");
        expect(dummy.logger).toHaveBeenCalledWith("exiting something: result=22:9");
    });

    it("a throwing function should be reported", () => {
        let thrower = (a,b,c) => { throw "CRASH!";};
        thrower = addLogging2(thrower, dummy.logger);

        try {
            thrower(1,2,3);
        } catch (e) {
            expect(dummy.logger).toHaveBeenCalledTimes(2);
            expect(dummy.logger).toHaveBeenCalledWith("entering thrower: 1,2,3");
            expect(dummy.logger).toHaveBeenCalledWith("exiting thrower: threw CRASH!");
        }
  });
});