const myArray = [22, 9, 60, 12, 4, 56];
const sum = (x, y) => x + y;
const mySum = myArray.reduce(sum, 0); // 163
console.log(mySum);

const sumAndLog = (x, y) => {
    console.log(`${x}+${y}=${x + y}`);
    return x + y;
};
myArray.reduce(sumAndLog, 0);

const average = arr => arr.reduce(sum, 0) / arr.length;
console.log(average(myArray)); // 27.166667

const average2 = (sum, val, ind, arr) => {
    sum += val;
    return ind == arr.length - 1 ? sum / arr.length : sum;
};
console.log(myArray.reduce(average2, 0)); // 27.166667

Array.prototype.average = function() {
    return this.reduce((x, y) => x + y, 0) / this.length;
};
let myAvg = [22, 9, 60, 12, 4, 56].average(); // 27.166667
console.log(myAvg);

const average3 = arr => {
    const sc = arr.reduce(
        (ac, val) => ({sum: val + ac.sum, count: ac.count + 1}),
        {sum: 0, count: 0}
    );
    return sc.sum / sc.count;
};
console.log(average3(myArray)); // 27.166667

const average4 = arr => {
    const sc = arr.reduce((ac, val) => [ac[0] + val, ac[1] + 1], [0, 0]);
    return sc[0] / sc[1];
};
console.log(average4(myArray)); // 27.166667

const reverseString = str => {
    let arr = str.split("");
    arr.reverse();
    return arr.join("");
};
console.log(reverseString("MONTEVIDEO")); // OEDIVETNOM

const reverseString2 = str =>
    str.split("").reduceRight((x, y) => x + y, "");
console.log(reverseString2("OEDIVETNOM")); // MONTEVIDEO

const markers = [
    {name: "UY", lat: -34.9, lon: -56.2},
    {name: "AR", lat: -34.6, lon: -58.4},
    {name: "BR", lat: -15.8, lon: -47.9},
    // ...
    {name: "BO", lat: -16.5, lon: -68.1}
];

let averageLat = average(markers.map(x => x.lat));
let averageLon = average(markers.map(x => x.lon));
console.log(averageLat, averageLon);

let averageLat2 = markers.map(x => x.lat).average();
let averageLon2 = markers.map(x => x.lon).average();
console.log(averageLat2, averageLon2);

console.log(["123.45", "67.8", "90"].map(parseFloat));
// [123.45, 67.8, 90]

console.log(["123.45", "-67.8", "90"].map(parseInt));
// [123, NaN, NaN]

console.log(["123.45", "-67.8", "90"].map(x => parseFloat(x)));
// [123.45, -67.8, 90]

console.log(["123.45", "-67.8", "90"].map(x => parseInt(x)));
// [123, -67, 90]

const range = (start, stop) =>
    new Array(stop - start).fill(0).map((v, i) => start + i);
let from2To6 = range(2, 7); // [2, 3, 4, 5, 6];
console.log(from2To6);

const factorialByRange = n => range(1, n + 1).reduce((x, y) => x * y, 1);
console.log(factorialByRange(5)); // 120
console.log(factorialByRange(3)); // 6

const ALPHABET = range("A".charCodeAt(), "Z".charCodeAt() + 1).map(x =>
    String.fromCharCode(x)
);
// ["A", "B", "C", ... "X", "Y", "Z"]
console.log(ALPHABET);

const myMap = (arr, fn) => arr.reduce((x, y) => x.concat(fn(y)), []);
const dup = x => 2 * x;
console.log(myArray.map(dup)); // [44, 18, 120, 24, 8, 112]
console.log(myMap(myArray, dup)); // [44, 18, 120, 24, 8, 112]
console.log(myArray); // [22, 9, 60, 12, 4, 56]

const objCopy = obj => {
    let copy = Object.create(Object.getPrototypeOf(obj));
    Object.getOwnPropertyNames(obj).forEach(prop =>
        Object.defineProperty(
            copy,
            prop,
            Object.getOwnPropertyDescriptor(obj, prop)
        )
    );
    return copy;
};
const myObj = {fk: 22, st: 12, desc: "couple"};
const myCopy = objCopy(myObj);
console.log(myObj, myCopy); // {fk: 22, st: 12, desc: "couple"}, twice

const factorial4 = n => {
    let result = 1;
    range(1, n + 1).forEach(v => result *= v);
    return result;
};
console.log(factorial4(5)); // 120

const serviceResult = {
    accountsData: [
        {
            id: "F220960K",
            balance: 1024
        },
        {
            id: "S120456T",
            balance: 2260
        },
        {
            id: "J140793A",
            balance: -38
        },
        {
            id: "M120396V",
            balance: -114
        },
        {
            id: "A120289L",
            balance: 55000
        }
    ]
};
const delinquent = serviceResult.accountsData.filter(v => v.balance < 0);
console.log(delinquent); // two objects, with id's J140793A and M120396V

const delinquentIds = delinquent.map(v => v.id);
console.log(delinquentIds);

const delinquentIds2 = serviceResult.accountsData
    .filter(v => v.balance < 0)
    .map(v => v.id);
console.log(delinquentIds2);

const myFilter = (arr, fn) =>
    arr.reduce((x, y) => (fn(y) ? x.concat(y) : x), []);

console.log(myFilter(serviceResult.accountsData, v => v.balance < 0));
// two objects, with id's J140793A and M120396V

let brazilData = markers.find(v => v.name === "BR");
// {name:"BR", lat:-15.8, lon:-47.9}
console.log(brazilData);

let brazilIndex = markers.findIndex(v => v.name === "BR"); // 2
console.log(brazilIndex);
let mexicoIndex = markers.findIndex(v => v.name === "MX"); // -1
console.log(mexicoIndex);

console.log(markers.every(v => v.lat < 0 && v.lon < 0)); // false
console.log(markers.some(v => v.lat < 0 && v.lon < 0)); // true

const none = (arr, fn) => arr.every(v => !fn(v));
Array.prototype.none = function(fn) {
    return this.every(v => !fn(v));
};