const search = (arr, key) => {
    if (arr.length === 0) {
        return false;
    } else if (arr[0] === key) {
        return true;
    } else {
        return search(arr.slice(1), key);
    }
};

const search2 = (arr, key) =>
    arr.length === 0
        ? false
        : arr[0] === key || search2(arr.slice(1), key);
        
const search3 = (arr,key) => arr.length && (arr[0] === key || search3(arr.slice(1), key));


const powerN = (base, power) => {
    if (power === 0) {
        return 1;
    } else if (power % 2) { // odd power?
        return base * powerN(base, power - 1);
    } else { // even power?
        return powerN(base * base, power / 2);
    }
};



const hanoi = (disks, from, to, extra) => {
    if (disks === 1) {
        console.log(`Move disk 1 from post ${from} to post ${to}`);
    } else {
        hanoi(disks - 1, from, extra, to);
        console.log(`Move disk ${disks} from post ${from} to post ${to}`);
        hanoi(disks - 1, extra, to, from);
    }
};
const hanoi2 = (disks, from, to, extra) => {
    if (disks > 0) {
        hanoi(disks - 1, from, extra, to);
        console.log(`Move disk ${disks} from post ${from} to post ${to}`);
        hanoi(disks - 1, extra, to, from);
    }
};


const quicksort = arr => {
  if (arr.length < 2) {
    return arr;
  } else {
    const pivot = arr[0];
    const smaller = arr.slice(1).filter(x => x < pivot);
    const greaterEqual = arr.slice(1).filter(x => x >= pivot);
    return [...quicksort(smaller), pivot, ...quicksort(greaterEqual)];
  }
};


const makeChange = (n, bills) => {
    if (n < 0) {
        return 0; // no way of paying negative amounts
       
    } else if (n == 0) {
        return 1; // one single way of paying $0: with no bills
        
    } else if (bills.length == 0) {
        // here, n>0
        return 0; // no bills? no way of paying
        
    } else {
        return (
            makeChange(n, bills.slice(1)) + makeChange(n - bills[0], bills)
        );
    }
};

const memoize3 = fn => {
    let cache = {};
    return (...args) => {
        let strX = JSON.stringify(args);
        return strX in cache ? cache[strX] : (cache[strX] = fn(...args));
    };
};

const makeChange2 = memoize3((n, bills) => {
    if (n < 0) {
        return 0; // no way of paying negative amounts
       
    } else if (n == 0) {
        return 1; // one single way of paying $0: with no bills
        
    } else if (bills.length == 0) {
        // here, n>0
        return 0; // no bills? no way of paying
        
    } else {
        return (
            makeChange2(n, bills.slice(1)) + makeChange2(n - bills[0], bills)
        );
    }
});


const mapR = (arr, cb) =>
    arr.length === 0 ? [] : [cb(arr[0])].concat(mapR(arr.slice(1), cb));
const mapR2 = (arr, cb, i = 0, orig = arr) =>
    arr.length == 0
        ? []
        : [cb(arr[0], i, orig)].concat(
              mapR2(arr.slice(1), cb, i + 1, orig)
          );
const mapR3 = (orig, cb) => {
    const mapLoop = (arr, i) =>
        arr.length == 0
            ? []
            : [cb(arr[0], i, orig)].concat(
                  mapR3(arr.slice(1), cb, i + 1, orig)
              );
    
    return mapLoop(orig, 0);
};
const mapR4 = (orig, cb) => {
    const mapLoop = (arr, i) => {
        if (arr.length == 0) {
            return [];
        } else {
            const mapRest = mapR4(arr.slice(1), cb, i + 1, orig);
            if (!(0 in arr)) {
                return [,].concat(mapRest);
            } else {
                return [cb(arr[0], i, orig)].concat(mapRest);
            }
        }
    };
    return mapLoop(orig, 0);
};


const filterR = (orig, cb) => {
    const filterLoop = (arr, i) => {
        if (arr.length == 0) {
            return [];
        } else {
            const filterRest = filterR(arr.slice(1), cb, i + 1, orig);
            if (!(0 in arr)) {
                return filterRest;
            } else if (cb(arr[0], i, orig)) {
                return [arr[0]].concat(filterRest);
            } else {
                return filterRest;
            }
        }
    };
    return filterLoop(orig, 0);
};


const reduceR = (orig, cb, accum) => {
    const reduceLoop = (arr, i) => {
        return arr.length == 0
            ? accum
            : reduceR(
                  arr.slice(1),
                  cb,
                  !(0 in arr) ? accum : cb(accum, arr[0], i, orig),
                  i + 1,
                  orig
              );
    };
    return reduceLoop(orig, 0);
};

const findR = (arr, cb) => {
    if (arr.length === 0) {
        return undefined;
    } else {
        return cb(arr[0]) ? arr[0] : findR(arr.slice(1), cb);
    }
};
const findR2 = (arr, cb) =>
    arr.length === 0
        ? undefined
        : cb(arr[0]) ? arr[0] : findR(arr.slice(1), cb);



const pipelineR = (first, ...rest) =>
    rest.length == 0
        ? first
        : (...args) => pipelineR(...rest)(first(...args));



const SIZE = 8;
let places = Array(SIZE);
let solutions = 0;
const checkPlace = (column, row) =>
    places
        .slice(0, column)
        .every((v, i) => v !== row && Math.abs(v - row) !== column - i);
const checkPlace2 = (column, row) => {
    const checkColumn = i => {
        if (i == column) {
            return true;
        } else if (
            places[i] == row ||
            Math.abs(places[i] - row) == column - i
        ) {
            return false;
        } else {
            return checkColumn(i + 1);
        }
    };
    return checkColumn(0);
};
const finder = (column = 0) => {
    if (column === SIZE) {
        // all columns tried out?
        console.log(places.map(x => x + 1)); // print out solution
        solutions++; // count it
        
    } else {
        const testRowsInColumn = j => {
            if (j < SIZE) {
                if (checkPlace2(column, j)) {
                    places[column] = j;
                    finder(column + 1);
                }
                testRowsInColumn(j + 1);
            }
        };
        testRowsInColumn(0);
    }
};
finder();
console.log(`Solutions found: ${solutions}`);


/* Node-only code
const fs = require("fs");

const recursiveDir = path => {
    console.log(path);
    fs.readdirSync(path).forEach(entry => {
        if (entry.startsWith(".")) {
            // skip it!
            
        } else {
            const full = path + "/" + entry;
            const stats = fs.lstatSync(full);
            if (stats.isSymbolicLink()) {
                console.log("L ", full); // symlink, don't follow
                
            } else if (stats.isDirectory()) {
                console.log("D ", full);
                recursiveDir(full);
                
            } else {
                console.log(" ", full);
            }
        }
    });
};
*/

const traverseDom = (node, depth = 0) => {
    console.log(`${"| ".repeat(depth)}<${node.nodeName.toLowerCase()}>`);
    for (let i = 0; i < node.children.length; i++) {
        traverseDom(node.children[i], depth + 1);
    }
};
const traverseDom2 = (node, depth = 0) => {
    console.log(`${"| ".repeat(depth)}<${node.nodeName.toLowerCase()}>`);
    Array.from(node.children).forEach(child =>
        traverseDom2(child, depth + 1)
    );
};
var traverseDom3 = (node, depth = 0) => {
    console.log(`${"| ".repeat(depth)}<${node.nodeName.toLowerCase()}>`);
    
    const traverseChildren = (children, i = 0) => {
        if (i < children.length) {
            traverseDom3(children[i], depth + 1);
            return traverseChildren(children, i + 1); // loop
        }
        return;
    };
    
    return traverseChildren(Array.from(node.children));
};
var traverseDom3C = (node, depth = 0, cont = () => {}) => {
    console.log(`${"| ".repeat(depth)}<${node.nodeName.toLowerCase()}>`);
    
    const traverseChildren = (children, i = 0) => {
        if (i < children.length) {
            return traverseDom3C(children[i], depth + 1, () =>
                traverseChildren(children, i + 1)
            );
        }
        return cont();
    };
    
    return traverseChildren(Array.from(node.children));
};


function detectTCO() {
    const outerStackLen = new Error().stack.length;
    return (function inner() {
        const innerStackLen = new Error().stack.length;
        return innerStackLen <= outerStackLen;
    })();
}


function fact(n) {
    if (n === 0) {
        return 1;
    } else {
        return n * fact(n - 1);
    }
}
function fact2(n) {
    if (n === 0) {
        return 1;
    } else {
        const aux = fact2(n - 1);
        return n * aux;
    }
}
function factC(n, cont) {
    if (n === 0) {
        return cont(1);
    } else {
        return factC(n - 1, x => cont(n * x));
    }
}
factC(7, x => x); // 5040, correctly



function getTime() {
    return new Date().toTimeString();
}
console.log(getTime()); // "21:00:24 GMT+0530 (IST)"

function getTime2(cont) {
    return cont(new Date().toTimeString());
}
getTime2(console.log); // similar result as above



const fibC = (n, cont) => {
    if (n <= 1) {
        return cont(n);
    } else {
        return fibC(n - 2, p => fibC(n - 1, q => cont(p + q)));
    }
};


const trampoline = (fn) => {
    while (typeof fn === 'function') {
        fn = fn();
    }
    return fn;
};
const sumAll = n => (n == 0 ? 0 : n + sumAll(n - 1));
const sumAllC = (n, cont) =>
    n === 0 ? cont(0) : sumAllC(n - 1, v => cont(v + n));
// this will crash: sumAllC(10000, console.log); // crash as earlier
const sumAllT = (n, cont) =>
    n === 0 ? () => cont(0) : () => sumAllT(n - 1, v => () => cont(v + n));
const sumAll2 = n => trampoline(sumAllT(n, x => x));
const sumAll3 = n => {
    const sumAllT = (n, cont) =>
        n === 0
            ? () => cont(0)
            : () => sumAllT(n - 1, v => () => cont(v + n));
    
    return trampoline(sumAllT(n, x => x));
};

function Thunk(fn) {
    this.fn = fn;
}

var trampoline2 = thk => {
    while (typeof thk === "object" && thk.constructor.name === "Thunk") {
        thk = thk.fn();
    }
    return thk;
};


