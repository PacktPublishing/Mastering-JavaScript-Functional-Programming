describe("getRandomLetter", function() {

    it("returns A for values close to 0", () => {
        spyOn(Math, "random").and.returnValue(0.0001);
        let letterSmall = getRandomLetter();
        expect(Math.random).toHaveBeenCalled();
        expect(letterSmall).toBe("A");
    });

    it("returns Z for values close to 1", () => {
        spyOn(Math, "random").and.returnValues(0.98, 0.999);
        let letterBig1 = getRandomLetter();
        let letterBig2 = getRandomLetter();
        expect(Math.random).toHaveBeenCalledTimes(2);
        expect(letterBig1).toBe("Z");
        expect(letterBig2).toBe("Z");
    });

    it("returns a middle letter for values around 0.5", () => {
        spyOn(Math, "random").and.returnValue(0.49384712);
        let letterMiddle = getRandomLetter();
        expect(Math.random.calls.count()).toEqual(1);
        expect(letterMiddle).toBeGreaterThan("G");
        expect(letterMiddle).toBeLessThan("S");
    });
});




describe("getRandomLetter2", function() {

    it("returns A for values close to 0", () => {
        let letterSmall = getRandomLetter2(() => 0.0001);
        expect(letterSmall).toBe("A");
    });

    it("returns Z for values close to 1", () => {
        let letterBig = getRandomLetter2(() => 0.99999);
        expect(letterBig).toBe("Z");
    });

    it("returns a middle letter for values around 0.5", () => {
        let letterMiddle = getRandomLetter2(() => 0.49384712);
        expect(letterMiddle).toBeGreaterThan("G");
        expect(letterMiddle).toBeLessThan("S");
    });

    it("returns an ascending sequence of letters for ascending values", () => {
        let a = [0.09, 0.22, 0.60];
        const f = () => a.shift(); // impure!!

        let letter1 = getRandomLetter2(f);
        let letter2 = getRandomLetter2(f);
        let letter3 = getRandomLetter2(f);
        expect(letter1).toBeLessThan(letter2);
        expect(letter2).toBeLessThan(letter3);
    });
    
});
