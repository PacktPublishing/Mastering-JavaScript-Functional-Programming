const addLogging = fn => (...args) => {
    console.log(`entering ${fn.name}: ${args})`);
    const valueToReturn = fn(...args);
    console.log(`exiting ${fn.name}: ${valueToReturn}`);
    return valueToReturn;
};

function subtract(a, b) {
    b = changeSign(b);
    return a + b;
}

function changeSign(a) {
    return -a;
}

subtract = addLogging(subtract);
changeSign = addLogging(changeSign);
let x = subtract(7, 5);

const addLogging2 = fn => (...args) => {
    console.log(`entering ${fn.name}: ${args}`);
    try {
        const valueToReturn = fn(...args);
        console.log(`exiting ${fn.name}: ${valueToReturn}`);
        return valueToReturn;
    } catch (thrownError) {
        console.log(`exiting ${fn.name}: threw ${thrownError}`);
        throw thrownError;
    }
};

const addLogging3 = (fn, logger = console.log) => (...args) => {
    logger(`entering ${fn.name}: ${args}`);
    try {
        const valueToReturn = fn(...args);
        logger(`exiting ${fn.name}: ${valueToReturn}`);
        return valueToReturn;
    } catch (thrownError) {
        logger(`exiting ${fn.name}: threw ${thrownError}`);
        throw thrownError;
    }
};

const myLogger = t => console.log(t);
subtract = addLogging3(subtract, myLogger);
changeSign = addLogging3(changeSign, myLogger);
x = subtract(7, 5);

const myPut = (text, name, tStart, tEnd) =>
    console.log(`${name} - ${text} ${tEnd - tStart} ms`);

const myGet = () => performance.now();

const addTiming = (fn, getTime = myGet, output = myPut) => (...args) => {
    let tStart = getTime();
    try {
        const valueToReturn = fn(...args);
        output("normal exit", fn.name, tStart, getTime());
        return valueToReturn;
    } catch (thrownError) {
        output("exception thrown", fn.name, tStart, getTime());
        throw thrownError;
    }
};

subtract = addTiming(subtract);
x = subtract(7, 5);
console.log(x);
y = subtract(4, 0);
console.log(y);

function fib(n) {
    if (n == 0) {
        return 0;
    } else if (n == 1) {
        return 1;
    } else {
        return fib(n - 2) + fib(n - 1);
    }
}

const memoize = fn => {
    let cache = {};
    return x => (x in cache ? cache[x] : (cache[x] = fn(x)));
};

const testFib = n => fib(n);
//addTiming(testFib)(45); // 15,382.255 ms
//addTiming(testFib)(40); //  1,600.600 ms
//addTiming(testFib)(35); //    146.900 ms

const testMemoFib = memoize(n => fib(n));
//addTiming(testMemoFib)(45); // 15,537.575 ms
//addTiming(testMemoFib)(45); //          0.005 ms
//addTiming(testMemoFib)(40); //  1,368.880 ms
//addTiming(testMemoFib)(35); //    123.970 ms

fib = memoize(fib);
addTiming(testFib)(45); // 0.080 ms
addTiming(testFib)(45); // 0.080 ms
addTiming(testFib)(40); // 0.025 ms
addTiming(testFib)(35); // 0.009 ms

const memoize2 = fn => {
    if (fn.length === 1) {
        let cache = {};
        return x => (x in cache ? cache[x] : (cache[x] = fn(x)));
    } else {
        return fn;
    }
};

const memoize3 = fn => {
    let cache = {};
    const PRIMITIVES = ["number", "string", "boolean"];
    return (...args) => {
        let strX = args.length === 1 && PRIMITIVES.includes(typeof args[0])
            ? args[0]
            : JSON.stringify(args);
        return strX in cache ? cache[strX] : (cache[strX] = fn(...args));
    };
};

const memoize4 = fn => {
    let cache = {};
    return (...args) => {
        let strX = JSON.stringify(args);
        return strX in cache ? cache[strX] : (cache[strX] = fn(...args));
    };
};

const once = func => {
    let done = false;
    return (...args) => {
        if (!done) {
            done = true;
            func(...args);
        }
    };
};

const once2 = func => {
    let done = false;
    let result;
    return (...args) => {
        if (!done) {
            done = true;
            result = func(...args);
        }
        return result;
    };
};

const onceAndAfter = (f, g) => {
    let done = false;
    return (...args) => {
        if (!done) {
            done = true;
            return f(...args);
        } else {
            return g(...args);
        }
    };
};

const onceAndAfter2 = (f, g) => {
    let toCall = f;
    return (...args) => {
        let result = toCall(...args);
        toCall = g;
        return result;
    };
};

const squeak = x => console.log(x, "squeak!!");
const creak = x => console.log(x, "creak!!");
const makeSound = onceAndAfter2(squeak, creak);
makeSound("door"); // "door squeak!!"
makeSound("door"); // "door creak!!"
makeSound("door"); // "door creak!!"
makeSound("door"); // "door creak!!"

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
const notDelinquent = serviceResult.accountsData.filter(
    v => v.balance >= 0
);
console.log(notDelinquent);
const notDelinquent2 = serviceResult.accountsData.filter(
    v => !(v.balance < 0)
);
console.log(notDelinquent2);
const isNegativeBalance = v => v.balance < 0;
const delinquent2 = serviceResult.accountsData.filter(isNegativeBalance);
console.log(delinquent2);
const not = fn => (...args) => !fn(...args);
const notDelinquent3 = serviceResult.accountsData.filter(
    not(isNegativeBalance)
);
console.log(notDelinquent3);

const filterNot = arr => fn => arr.filter(not(fn));
const invert = fn => (...args) => -fn(...args);
const spanishComparison = (a, b) => a.localeCompare(b, "es");

var palabras = ["ñandú", "oasis", "mano", "natural", "mítico", "musical"];

palabras.sort(spanishComparison);
// ["mano", "mítico", "musical", "natural", "ñandú", "oasis"]
console.log(palabras);

palabras.sort(invert(spanishComparison));
// ["oasis", "ñandú", "natural", "musical", "mítico", "mano"]
console.log(palabras);

console.log(["123.45", "-67.8", "90"].map(parseInt)); // problem: parseInt isn't monadic!
// [123, NaN, NaN]
const unary = fn => (...args) => fn(args[0]);
console.log(["123.45", "-67.8", "90"].map(unary(parseInt)));
// [123, -67, 90]

const binaryOp1 = op => {
    switch (op) {
        case "+":
            return (x, y) => x + y;
        case "-":
            return (x, y) => x - y;
        case "*":
            return (x, y) => x * y;
        //
        // etc.
        //
    }
};
const binaryOp2 = op => new Function("x", "y", `return x ${op} y;`);
const binaryLeftOp = (x, op) => y => binaryOp2(op)(x, y);
const binaryOpRight = (op, y) => x => binaryOp2(op)(x, y);
const binaryLeftOp2 = (x, op) => y => binaryOp2(op)(x, y);
const binaryOpRight2 = (op, y) => x => binaryOp2(op)(x, y);

const myArray = [22, 9, 60, 12, 4, 56];
const mySum = myArray.reduce(binaryOp2("+"), 0);

const range = (start, stop) =>
    new Array(stop - start).fill(0).map((v, i) => start + i);
const factorialByRange = n => range(1, n + 1).reduce(binaryOp2("*"), 1);

const isNegative1 = binaryLeftOp(0, ">");
const isNegative2 = binaryOpRight("<", 0);
const isNegative3 = x => x < 0;

const promisify = fn => (...args) =>
    new Promise((resolve, reject) =>
        fn(...args, (err, data) => (err ? reject(err) : resolve(data)))
    );

/*
const fs = require("fs");
const cb = (err, data) =>
    err ? console.log("ERROR", err) : console.log("SUCCESS", data);
fs.readFile("./exists.txt", cb); // success, list the data
fs.readFile("./doesnt_exist.txt", cb); // failure, show exception

const fspromise = promisify(fs.readFile.bind(fs));
const goodRead = data => console.log("SUCCESSFUL PROMISE", data);
const badRead = err => console.log("UNSUCCESSFUL PROMISE", err);

fspromise("./readme.txt") // success
    .then(goodRead)
    .catch(badRead);

fspromise("./readmenot.txt") // failure
    .then(goodRead)
    .catch(badRead);
*/
const getField = attr => obj => obj[attr];

const sum = (x, y) => x + y;
const average = arr => arr.reduce(sum, 0) / arr.length;
const markers = [
    {name: "UY", lat: -34.9, lon: -56.2},
    {name: "AR", lat: -34.6, lon: -58.4},
    {name: "BR", lat: -15.8, lon: -47.9},
    // ...
    {name: "BO", lat: -16.5, lon: -68.1}
];
let averageLat = average(markers.map(getField("lat")));
let averageLon = average(markers.map(getField("lon")));
console.log(averageLat, averageLon);

const getId = getField("id");
const delinquentIds = delinquent.map(getId);

const demethodize1 = fn => (arg0, ...args) => fn.apply(arg0, args);
const demethodize2 = fn => (arg0, ...args) => fn.call(arg0, ...args);
const demethodize3 = fn => (...args) => fn.bind(...args)();
const name = "FUNCTIONAL";
const result = name.split("").map(x => x.toUpperCase());
// ["F", "U", "N", "C", "T", "I", "O", "N", "A", "L"]

const map = demethodize3(Array.prototype.map);
const toUpperCase = demethodize3(String.prototype.toUpperCase);
const result2 = map(name, toUpperCase);
// ["F", "U", "N", "C", "T", "I", "O", "N", "A", "L"]

const toLocaleString = demethodize3(Number.prototype.toLocaleString);

const numbers = [2209.6, 124.56, 1048576];
const strings = numbers.map(toLocaleString);
// ["2,209.6", "124.56", "1,048,576"]
const strings2 = map(numbers, toLocaleString);

const findOptimum = arr => Math.max(...arr);
console.log(findOptimum(myArray)); // 60

const findOptimum2 = fn => arr => arr.reduce(fn);
const findMaximum = findOptimum2((x, y) => (x > y ? x : y));
const findMinimum = findOptimum2((x, y) => (x < y ? x : y));
console.log(findMaximum(myArray)); // 60
console.log(findMinimum(myArray)); // 4

const compareHeroes = (card1, card2) => {
    const oneIfBigger = (x, y) => (x > y ? 1 : 0);

    const wins1 =
        oneIfBigger(card1.strength, card2.strength) +
        oneIfBigger(card1.powers, card2.powers) +
        oneIfBigger(card1.tech, card2.tech);

    const wins2 =
        oneIfBigger(card2.strength, card1.strength) +
        oneIfBigger(card2.powers, card1.powers) +
        oneIfBigger(card2.tech, card1.tech);

    return wins1 > wins2 ? card1 : card2;
};

function Hero(n, s, p, t) {
    this.name = n;
    this.strength = s;
    this.powers = p;
    this.tech = t;
}

const codingLeagueOfAmerica = [
    new Hero("Forceful", 20, 15, 2),
    new Hero("Electrico", 12, 21, 8),
    new Hero("Speediest", 8, 11, 4),
    new Hero("TechWiz", 6, 16, 30)
];

const findBestHero = findOptimum2(compareHeroes);
console.log(findBestHero(codingLeagueOfAmerica)); // Electrico is the top hero!
