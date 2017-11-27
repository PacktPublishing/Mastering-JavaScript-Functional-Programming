const make3 = (a, b, c) => String(100 * a + 10 * b + c);

const make3curried = a => b => c => String(100 * a + 10 * b + c);

const make3curried2 = function(a) {
  return function(b) {
    return function(c) {
      return String(100 * a + 10 * b + c);
    };
  };
};

const addVAT = (rate, amount) => amount * (1 + rate / 100);
console.log(addVAT(20, 500)); // 600 -- that is, 500 + 20%
console.log(addVAT(15, 200)); // 230 -- 200 +15%

const addVATcurried = rate => amount => amount * (1 + rate / 100);
const addNationalVAT = addVATcurried(6);
console.log(addNationalVAT(1500)); // 1590 -- 1500 + 6%


let myLog = (severity, logText) => {
    // display logText in an appropriate way,
    // according to its severity ("NORMAL", "WARNING", or "ERROR")
	console.log("SEVERITY",severity,"TEXT",logText);
};

const curryByBind = fn =>
    fn.length === 0 ? fn() : p => curryByBind(fn.bind(null, p));
    
const f1 = curryByBind(make3); // f1 is a function, that will fix make3's 1st parameter
const f2 = f1(6); // f2 is a function, that will fix make3's 2nd parameter
const f3 = f2(5); // f3 is a function, that will fix make3's last parameter
const f4 = f3(8); // "658" is calculated, since there are no more parameters to fix
console.log(f4);

const step1 = make3.bind(null, 6);
const step2 = step1.bind(null, 5);
const step3 = step2.bind(null, 8);
console.log(step3()); // "658"

const curryByBind2 = (fn, len = fn.length) =>
    len === 0 ? fn() : p => curryByBind2(fn.bind(null, p), len - 1);

const sum2 = (...args) => args.reduce((x, y) => x + y, 0);
console.log(sum2.length); // 0; curryByBind() wouldn't work

console.log(sum2(1, 5, 3)); // 9
console.log(sum2(1, 5, 3, 7)); // 16
console.log(sum2(1, 5, 3, 7, 4)); // 20

curriedSum5 = curryByBind2(sum2, 5); // curriedSum5 will expect 5 parameters
console.log(curriedSum5(1)(5)(3)(7)(4)); // 20

const range = (start, stop) =>
    new Array(stop - start).fill(0).map((v, i) => start + i);

const curryByEval = (fn, len = fn.length) =>
    eval(`${range(0, len).map(i => `x${i}`).join("=>")} => 
        ${fn.name}(${range(0, len).map(i => `x${i}`).join(",")})`);

console.log(curryByEval(make3)); // x0=>x1=>x2=> make3(x0,x1,x2)

const curryByEval2 = (fn, len = fn.length) =>
    eval(`${range(0, len).map(i => `x${i}`).join("=>")} => 
        (${fn.toString()})(${range(0, len).map(i => `x${i}`).join(",")})`);

console.log(curryByEval2(make3)); // x0=>x1=>x2=> ((a,b,c) => 100*a+10*b+c)(x0,x1,x2)

const add = (x, y) => x + y;

add(2, 5); // 7
add(2, 5); // 7
((x, y) => x + y)(2, 5); // 7

curry = curryByEval;
myLog = curry(myLog);
// replace myLog by a curried version of itself

const myNormalLog = myLog("NORMAL");
const myWarningLog = myLog("WARNING");
const myErrorLog = myLog("ERROR");
const myNormalLog2 = curry(myLog)("NORMAL");
const myWarningLog2 = curry(myLog)("WARNING");
const myErrorLog2 = curry(myLog)("ERROR");
 
const sum = (x, y) => {
    if (x !== undefined && y !== undefined) {
        return x + y;
    } else if (x !== undefined && y == undefined) {
        return z => sum(x, z);
    } else {
        return sum;
    }
};

sum(3, 5); // 8; did you expect otherwise?
const add2 = sum(2);
console.log(add2(3)); // 5
console.log(sum(2)(7)); // 9 -- as if it were curried


const nonsense = (a, b, c, d, e) => `${a}/${b}/${c}/${d}/${e}`;
const fix2and5 = (a, c, d) => nonsense(a, 22, c, d, 1960);
const fixLast = (a, c) => fix2and5(a, c, 9);

const partialByEval = (fn, ...args) => {
    const rangeArgs = range(0, fn.length);
    const leftList = rangeArgs
        .map(v => (args[v] === undefined ? `x${v}` : null))
        .filter(v => !!v)
        .join(",");
    const rightList = rangeArgs
        .map(v => (args[v] === undefined ? `x${v}` : args[v]))
        .join(",");
    return eval(`(${leftList}) => ${fn.name}(${rightList})`);
};

const partialByEval2 = (fn, ...args) =>
    eval(
        `(${range(0, fn.length)
            .map(v => (args[v] === undefined ? `x${v}` : null))
            .filter(v => !!v)
            .join(",")}) => ${fn.name}(${range(0, fn.length)
            .map(v => (args[v] == undefined ? `x${v}` : args[v]))
            .join(",")})`
    );
    
 const partialByClosure = (fn, ...args) => {
    const partialize = (...args1) => (...args2) => {
        for (let i = 0; i < args1.length && args2.length; i++) {
            if (args1[i] === undefined) {
                args1[i] = args2.shift();
            }
        }
        const allParams = [...args1, ...args2];
        return (allParams.includes(undefined) ||
        allParams.length < fn.length
            ? partialize
            : fn)(...allParams);
    };
    
    return partialize(...args);
};

const ff1 = partialByClosure(make3, undefined, 4);
const ff2 = ff1(7);
const ff3 = ff2(9);
console.log(ff3)


const partialCurryingByBind = fn =>
    fn.length === 0
        ? fn()
        : (...pp) => partialCurryingByBind(fn.bind(null, ...pp));

const fg1 = partialCurryingByBind(make3);
const fg2 = fg1(6, 5); // f2 is a function, that fixes make3's first two arguments
const fg3 = fg2(8); // "658" is calculated, since there are no more parameters to fix
console.log(fg3);

const g1 = partialCurryingByBind(make3)(8, 7);
const g2 = g1(6); // "876"
console.log(g2);

const partialCurryingByBind2 = (fn, len = fn.length) =>
    len === 0
        ? fn()
        : (...pp) =>
              partialCurryingByBind2(
                  fn.bind(null, ...pp),
                  len - pp.length
              );

pcSum5 = partialCurryingByBind2(sum2, 5); // curriedSum5 will expect 5 parameters
console.log(pcSum5(1, 5)(3)(7, 4)); // 20

const partialCurryByClosure = fn => {
    const curryize = (...args1) => (...args2) => {
        const allParams = [...args1, ...args2];
        return (allParams.length < func.length ? curryize : fn)(
            ...allParams
        );
    };
    return curryize();
};

const partialCurryByClosure2 = (fn, len = fn.length) => {
    const curryize = (...args1) => (...args2) => {
        const allParams = [...args1, ...args2];
        return (allParams.length < len ? curryize : fn)(...allParams);
    };
    return curried();
};

const pcNonsense = partialCurryingByBind(nonsense);
const fix1And2 = pcNonsense(9, 22); // fix1And2 is now a ternary function
const fix3 = fix1And2(60); // fix3 is a binary function
const fix4and5 = fix3(12, 4); // fix4and5 === nonsense(9,22,60,12,4), "9/22/60/12/4"
console.log(fix4and5);

