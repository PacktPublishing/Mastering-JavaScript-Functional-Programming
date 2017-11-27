const markers = [
    {name: "UY", lat: -34.9, lon: -56.2},
    {name: "AR", lat: -34.6, lon: -58.4},
    {name: "BR", lat: -15.8, lon: -47.9},
    // ...
    {name: "BO", lat: -16.5, lon: -68.1}
];
const binary = fn => (x,y) => fn(x,y);

const curry = fn =>
    fn.length === 0 ? fn() : p => curry(fn.bind(null, p));

const flipTwo = fn => (arg1,arg2) => fn(arg2,arg1);
const demethodize = fn => (arg0, ...args) => fn.apply(arg0, args);
const map = demethodize(Array.prototype.map);

const pipeTwo = (f, g) => (...args) => g(f(...args));
const pipeline = (...fns) => (...args) => {
    let result = fns[0](...args);
    for (let i = 1; i < fns.length; i++) {
        result = fns[i](result);
    }
    return result;
};
const pipeline2 = (...fns) => fns.reduce((result, f) => (...args) => f(result(...args)));
const pipeline3 = (...fns) => fns.reduce(pipeTwo);

const sum = (x,y) => x+y;
const average = arr => arr.reduce(sum, 0) / arr.length;
const getField = attr => obj => obj[attr];
const myMap = curry(flipTwo(binary(map)));

const getLat = curry(getField)("lat");
console.log(myMap(getLat)(markers)) 
console.log(map(markers, getLat))
const getAllLats = curry(myMap)(getLat);

let averageLat = pipeline(getAllLats, average);
console.log(map(markers, getLat));
console.log(myMap(getLat)(markers));
// and similar code to average longitudes
console.log(averageLat(markers));

let averageLat2 = pipeline(curry(myMap)(curry(getField)("lat")), average);
let averageLon2 = pipeline(curry(myMap)(curry(getField)("lon")), average);
console.log(averageLat2(markers));

/* Node-only code
function getDir(path) {
    const fs = require("fs");
    const files = fs.readdirSync(path);
    return files;
}
const filterByText = (text, arr) => arr.filter(v => v.endsWith(text));
const filterOdt = arr => filterByText(".odt", arr);
const filterOdt2 = curry(filterByText)(".odt");
const count = arr => arr.length;
const countOdtFiles = (path) => {
    const files = getDir(path);
    const filteredFiles = filterOdt(files);
    const countOfFiles = count(filteredFiles);
    return countOfFiles;
}
countOdtFiles("/home/fkereki/Documents"); // 4, as with the command line solution
const countOdtFiles2 = path => count(filterOdt(getDir(path)));
countOdtFiles2("/home/fkereki/Documents"); // 4, as before
const countOdtFiles3 = path =>
    pipeTwo(pipeTwo(getDir, filterOdt), count)(path);
const countOdtFiles4 = path =>
    pipeTwo(getDir, pipeTwo(filterOdt, count))(path);

countOdtFiles3("/home/fkereki/Documents") ===
  pipeTwo(pipeTwo(getDir, filterOdt), count)("/home/fkereki/Documents") ===
    count(pipeTwo(getDir, filterOdt)("/home/fkereki/Documents")) ===
      count(filterOdt(getDir("/home/fkereki/Documents"))) // 4
countOdtFiles4("/home/fkereki/Documents") ===
  pipeTwo(getDir, pipeTwo(filterOdt, count))("/home/fkereki/Documents") ===
    pipeTwo(filterOdt, count)(getDir("/home/fkereki/Documents")) ===
      count(filterOdt(getDir("/home/fkereki/Documents"))) // 4
pipeline(getDir, filterOdt, count)("/home/fkereki/Documents"); // still 4
pipeline2(getDir, filterOdt, count)("/home/fkereki/Documents"); // 4
pipeline3(getDir, filterOdt, count)("/home/fkereki/Documents"); // again 4

const countOdtFiles3b = pipeTwo(pipeTwo(getDir, filterOdt), count);
const countOdtFiles4b = pipeTwo(getDir, pipeTwo(filterOdt, count));
*/

const tap = curry((fn, x) => (fn(x), x));
const tap2 = fn => x => (fn(x), x);

const tee = arg => {
    console.log(arg);
    return arg;
};
const tee2 = (arg, logger = console.log) => {
    logger(arg);
    return args;
};
const tee3 = tap(console.log);


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
let myCity = new City("Montevideo, Uruguay", -34.9011, -56.1645);
console.log(myCity.getCoords(), myCity.getName());
// [ -34.9011, -56.1645 ] 'Montevideo, Uruguay'


const getHandler = {
    get(target, property, receiver) {
        if (typeof target[property] === "function") {
            // requesting a method? return a wrapped version
            return (...args) => {
                const result = target[property](...args);
                return result === undefined ? receiver : result;
            };
        } else {
            // an attribute was requested - just return it
            return target[property];
        }
    }
};

const chainify = obj => new Proxy(obj, getHandler);

myCity = chainify(myCity);

console.log(myCity
    .setName("Pune, India")
    .setLat(18.5626)
    .setLong(73.8087)
    .getCoords(), 
    myCity.getName());
// [ 18.5626, 73.8087 ] 'Pune, India'

const binaryOp = op => new Function("x", "y", `return x ${op} y;`);
const binaryLeftOp = (x, op) => (y) => binaryOp2(op)(x,y);
const binaryOpRight = (op, y) => (x) => binaryOp2(op)(x,y);
const unaryOp = op  => new Function("x", `return ${op}(x);`);


const getBalance = curry(getField)("balance");
const isNegative = x => x < 0;
const isNegativeBalance = v => v.balance < 0;
const isNegativeBalance2 = pipeline(getBalance, isNegative);
const isNegative2= curry(binaryOp(">"))(0);
const isNegative3 = binaryOpRight("<", 0);
const isNegativeBalance3 = pipeline(
    curry(getField)("balance"),
    curry(binaryOp(">"))(0)
);
const isNegativeBalance4 = pipeline(
    curry(getField)("balance"),
    binaryOpRight("<", 0)
);


const composeTwo = (f, g) => (...args) => f(g(...args));
const composeTwoByFlipping = flipTwo(pipeTwo);
const compose = (...fns) => pipeline(...(fns.reverse()));
const compose2 = (...fns) => fns.reduceRight(pipeTwo);
const compose2b = (...fns) => 
    fns.reduceRight((f,g) => (...args) => g(f(...args)));
const compose3 = (...fns) => fns.reduce(composeTwo);

const not = fn => (...args) => !fn(...args);
const positiveBalance = not(isNegativeBalance);
const logicalNot = unaryOp("!");
const positiveBalance2 = compose(logicalNot, isNegativeBalance);
const changeSign = unaryOp("-");

var palabras = ["ñandú", "oasis", "mano", "natural", "mítico", "musical"];
const spanishComparison = (a, b) => a.localeCompare(b, "es");
palabras.sort(spanishComparison);
palabras.sort(compose(changeSign, spanishComparison));
console.log(palabras);

/* Node only
const countOdtFiles2b = path => compose(count, filterOdt, getDir)(path);
countOdtFiles2b("/home/fkereki/Documents"); // 4, no change here
compose(count, filterOdt, getDir)("/home/fkereki/Documents");
*/

const removeNonAlpha = str => str.replace(/[^a-z]/gi, " ");
const toUpperCase = demethodize(String.prototype.toUpperCase);
const splitInWords = str => str.trim().split(/\s+/);
const arrayToSet = arr => new Set(arr);
const setToList = set => Array.from(set).sort();
const getUniqueWords = compose(
    setToList,
    arrayToSet,
    splitInWords,
    toUpperCase,
    removeNonAlpha
);
const getUniqueWords1 = str => {
    const str1 = removeNonAlpha(str);
    const str2 = toUpperCase(str1);
    const arr1 = splitInWords(str2);
    const set1 = arrayToSet(arr1);
    const arr2 = setToList(set1);
    return arr2;
};
const getUniqueWords2 = str =>
    setToList(arrayToSet(splitInWords(toUpperCase(removeNonAlpha(str)))));
const getUniqueWords3 = composeTwo(
    setToList,
    composeTwo(
        arrayToSet,
        composeTwo(splitInWords, composeTwo(toUpperCase, removeNonAlpha))
    )
);
