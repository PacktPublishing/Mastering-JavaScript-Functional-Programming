describe("circle area", function() {

    it("is zero for radius 0", () => {
        let area = circleArea(0);
        expect(area).toBe(0);
    });

    it("is PI for radius 1", () => {
        let area = circleArea(1);
        expect(area).toBeCloseTo(Math.PI);
    });

    it("is approximately 12.5664 for radius 2", () => {
        let area = circleArea(2);
        expect(area).toBeCloseTo(12.5664);
    });
});
