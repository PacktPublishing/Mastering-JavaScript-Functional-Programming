describe("shuffleTest", function() {

    it("shouldn't change the array length", () => {
        let a = [22, 9, 60, 12, 4, 56];
        shuffle(a);
        expect(a.length).toBe(6);
    });

    it("shouldn't change the values", () => {
        let a = [22, 9, 60, 12, 4, 56];
        shuffle(a);
        expect(a.includes(22)).toBe(true);
        expect(a.includes(9)).toBe(true);
        expect(a.includes(60)).toBe(true);
        expect(a.includes(12)).toBe(true);
        expect(a.includes(4)).toBe(true);
        expect(a.includes(56)).toBe(true);
    });
});
