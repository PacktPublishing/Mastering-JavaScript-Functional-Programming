class City {
  constructor(name, lat, long) {
    this.name = name;
    this.lat = lat;
    this.long = long;
  }

  getName() {
    return this.name;
  }

  setName(newName) {
    this.name = newName;
  }

  setLat(newLat) {
    this.lat = newLat;
  }

  setLong(newLong) {
    this.long = newLong;
  }

  getCoords() {
    return [this.lat, this.long];
  }
}

var myCity;

describe("chainify", function() {
  beforeEach(() => {
    myCity = new City("Montevideo, Uruguay", -34.9011, -56.1645);
    myCity = chainify(myCity);
  });

  it("doesn't affect get functions", () => {
    expect(myCity.getName()).toBe("Montevideo, Uruguay");
    expect(myCity.getCoords()[0]).toBe(-34.9011);
    expect(myCity.getCoords()[1]).toBe(-56.1645);
  });

  it("doesn't affect getting attributes", () => {
    expect(myCity.name).toBe("Montevideo, Uruguay");
    expect(myCity.lat).toBe(-34.9011);
    expect(myCity.long).toBe(-56.1645);
  });

  it("returns itself from setting functions", () => {
    expect(myCity.setName("Other name")).toBe(myCity);
    expect(myCity.setLat(11)).toBe(myCity);
    expect(myCity.setLong(22)).toBe(myCity);
  });

  it("allows chaining", () => {
    const newCoords = myCity
      .setName("Pune, India")
      .setLat(18.5626)
      .setLong(73.8087)
      .getCoords();

    expect(myCity.name).toBe("Pune, India");  
    expect(newCoords[0]).toBe(18.5626);
    expect(newCoords[1]).toBe(73.8087);
  });
});
