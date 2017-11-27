function fact(n) {
    if (n === 0) {
        return 1;
    } else {
        return n * fact(n - 1);
    }
}
console.log(fact(5)); // 120

const fact2 = n => {
    if (n === 0) {
        return 1;
    } else {
        return n * fact2(n - 1);
    }
};
console.log(fact2(5)); // also 120

const fact3 = n => (n === 0 ? 1 : n * fact3(n - 1));
console.log(fact3(5)); // again 120


function newCounter() {
    let count = 0;
    return function() {
        count++;
        return count;
    };
}
const nc = newCounter();
console.log(nc()); // 1
console.log(nc()); // 2
console.log(nc()); // 3

function sum3(a, b, c) {
    return a + b + c;
}

const x = [1, 2, 3];
const y = sum3(...x); // equivalent to sum3(1,2,3)
console.log(y); // 6

const f = [1, 2, 3];
const g = [4, ...f, 5]; // [4,1,2,3,5]1
console.log(g);

const h = [...f, ...g]; // [1,2,3,4,1,2,3,5]
console.log(h);

const p = { some: 3, data: 5 };
const q = { more: 8, ...p }; // { more:8, some:3, data:5 }
console.log(q);

const numbers = [2, 2, 9, 6, 0, 1, 2, 4, 5, 6];
const minA = Math.min(...numbers); // 0
console.log(minA);

const maxArray = arr => Math.max(...arr);
const maxA = maxArray(numbers); // 9
console.log(maxA);