let limitYear = 1999;
const isOldEnough = birthYear => birthYear <= limitYear;
console.log(isOldEnough(1960)); // true
console.log(isOldEnough(2001)); // false

const PI = 3.14159265358979;
const circleArea = r => PI * Math.pow(r, 2); // or PI * r ** 2

const roundFix = (function() {
    let accum = 0;
    return n => {
        // reals get rounded up or down
        // depending on the sign of accum
        let nRounded = accum > 0 ? Math.ceil(n) : Math.floor(n);
        console.log("accum", accum.toFixed(5), " result", nRounded);
        accum += n - nRounded;
        return nRounded;
    };
})();

roundFix(3.14159); // accum  0.00000    result 3
roundFix(2.71828); // accum  0.14159    result 3
roundFix(2.71828); // accum -0.14013    result 2
roundFix(3.14159); // accum  0.57815    result 4
roundFix(2.71828); // accum -0.28026    result 2
roundFix(2.71828); // accum  0.43802    result 3
roundFix(2.71828); // accum  0.15630    result 3

const maxStrings = a => a.sort().pop();
let countries = ["Argentina", "Uruguay", "Brasil", "Paraguay"];
console.log(maxStrings(countries)); // "Uruguay"
console.log(countries); // ["Argentina", "Brasil", "Paraguay"]

const maxStrings2 = a => [...a].sort().pop();
countries = ["Argentina", "Uruguay", "Brasil", "Paraguay"];
console.log(maxStrings2(countries)); // "Uruguay"
console.log(countries); // ["Argentina", "Uruguay", "Brasil", "Paraguay"]

const getRandomLetter = () => {
    const min = "A".charCodeAt();
    const max = "Z".charCodeAt();
    return String.fromCharCode(
        Math.floor(Math.random() * (1 + max - min)) + min
    );
};

const getRandomFileName = (fileExtension = "") => {
    const NAME_LENGTH = 12;
    let namePart = new Array(NAME_LENGTH);
    for (let i = 0; i < NAME_LENGTH; i++) {
        namePart[i] = getRandomLetter();
    }
    return namePart.join("") + fileExtension;
};

console.log(getRandomFileName(".pdf")); // "SVHSSKHXPQKG.pdf"
console.log(getRandomFileName(".pdf")); // "DCHKTMNWFHYZ.pdf"
console.log(getRandomFileName(".pdf")); // "GBTEFTVVHADO.pdf"
console.log(getRandomFileName(".pdf")); // "ATCBVUOSXLXW.pdf"
console.log(getRandomFileName(".pdf")); // "OIFADZKKNVAH.pdf"

const isOldEnough2 = birthYear =>
    birthYear <= new Date().getFullYear() - 18;
console.log(isOldEnough2(1960)); // true
console.log(isOldEnough2(2001)); // false

var mult = 1;
const f = x => {
    mult = -mult;
    return x * mult;
};
console.log(f(2) + f(5)); //  3
console.log(f(5) + f(2)); // -3

const fib = n => {
    if (n == 0) {
        return 0;
    } else if (n == 1) {
        return 1;
    } else {
        return fib(n - 2) + fib(n - 1);
    }
};
console.log(fib(10)); // 55, a bit slowly

let cache = [];
const fib2 = n => {
    if (cache[n] == undefined) {
        if (n == 0) {
            cache[0] = 0;
        } else if (n == 1) {
            cache[1] = 1;
        } else {
            cache[n] = fib2(n - 2) + fib2(n - 1);
        }
    }
    return cache[n];
};
console.log(fib2(10)); // 55, as before, but more quickly!

const roundFix1 = (function() {
    let accum = 0;
    return n => {
        let nRounded = accum > 0 ? Math.ceil(n) : Math.floor(n);
        accum += n - nRounded;
        return nRounded;
    };
})();

const roundFix2 = (a, n) => {
    let r = a > 0 ? Math.ceil(n) : Math.floor(n);
    a += n - r;
    return {a, r};
};

let accum = 0;

// ...some other code...

let {a, r} = roundFix2(accum, 3.1415);
accum = a;
console.log(accum, r); // 0.1415 3

const getRandomFileName2 = (
    fileExtension = "",
    randomLetterFunc = getRandomLetter
) => {
    const NAME_LENGTH = 12;
    let namePart = new Array(NAME_LENGTH);
    for (let i = 0; i < NAME_LENGTH; i++) {
        namePart[i] = randomLetterFunc();
    }
    return namePart.join("") + fileExtension;
};
let fn = getRandomFileName2(".pdf", getRandomLetter);
console.log(fn);

const sum3 = (x, y, z) => x + y + z;
let x = {};
x.valueOf = Math.random;
let y = 1;
let z = 2;
console.log(sum3(x, y, z)); // 3.2034400919849431
console.log(sum3(x, y, z)); // 3.8537045249277906
console.log(sum3(x, y, z)); // 3.0833258308458734
