describe("once - alternate", function() {
    beforeEach(() => {
        this.myFn = () => {};
        spyOn(this, "myFn");
    });

    it("without 'once', a function always runs", () => {
        this.myFn();
        this.myFn();
        this.myFn();

        expect(this.myFn).toHaveBeenCalledTimes(3);
    });

    it("with 'once', a function runs one time", () => {
        this.onceFn = once(this.myFn);
        spyOn(this, "onceFn").and.callThrough();

        this.onceFn();
        this.onceFn();
        this.onceFn();

        expect(this.onceFn).toHaveBeenCalledTimes(3);
        expect(this.myFn).toHaveBeenCalledTimes(1);
    });
});
