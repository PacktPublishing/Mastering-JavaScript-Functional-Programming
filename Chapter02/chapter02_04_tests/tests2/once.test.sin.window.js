describe("once - alternate", function() {
    let myFn;

    beforeEach(() => {
        myFn = jasmine.createSpy("myFn");
    });

    it("without 'once', a function always runs", () => {
        myFn();
        myFn();
        myFn();

        expect(myFn).toHaveBeenCalledTimes(3);
    });

    it("with 'once', a function runs one time", () => {
        this.onceFn = once(myFn);
        
        spyOn(this, "onceFn").and.callThrough();

        this.onceFn();
        this.onceFn();
        this.onceFn();

        expect(this.onceFn).toHaveBeenCalledTimes(3);
        expect(myFn).toHaveBeenCalledTimes(1);
    });
});
