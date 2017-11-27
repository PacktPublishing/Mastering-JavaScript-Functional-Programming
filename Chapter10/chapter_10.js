const maxStrings2 = a => [...a].sort().pop();
const maxStrings3 = a => a.slice().sort().pop();

let countries = ["Argentina", "Uruguay", "Brasil", "Paraguay"];
console.log(maxStrings3(countries)); // "Uruguay"
console.log(countries); // ["Argentina", "Uruguay", "Brasil", "Paraguay"] - unchanged
const myObj = {d: 22, m: 9};
console.log(myObj);
// {d: 22, m: 9}

// myObj = {d: 12, m: 4};
// Uncaught TypeError: Assignment to constant variable.

myObj.d = 12; // but this is fine!
myObj.m = 4;
console.log(myObj);
// {d: 12, m: 4}
myObj.m = 9;

Object.freeze(myObj);

myObj.d = 12; // won't have effect...
console.log(myObj);
// Object {d: 22, m: 9}

let myObj3 = {
    d: 22,
    m: 9,
    o: {c: "MVD", i: "UY", f: {a: 56}}
};
Object.freeze(myObj3);
console.log(myObj3);
// {d:22, m:9, o:{c:"MVD", i:"UY", f:{ a:56}}}
myObj3.d = 8888;          // wont' work
myObj3.o.f.a = 9999; // oops, does work!!
console.log(myObj3);
// {d:22, m:9, o:{c:"MVD", i:"UY", f:{ a:9999 }}}

const deepFreeze = obj => {
    if (obj && typeof obj === "object" && !Object.isFrozen(obj)) {
        Object.freeze(obj);
        Object.getOwnPropertyNames(obj).forEach(prop =>
            deepFreeze(obj[prop])
        );
    }
    return obj;
};

let oldObject = {
    d: 22,
    m: 9,
    o: {c: "MVD", i: "UY", f: {a: 56}}
};

let newObject = {
    d: oldObject.d,
    m: oldObject.m,
    o: {c: oldObject.o.c, i: oldObject.o.i, f: {a: oldObject.o.f.a}}
};

let newObject1 = Object.assign({}, myObj);
let newObject2 = {...myObj};
let myArray= [1, 2, 3, 4];
let newArray1 = myArray.slice();
let newArray2 = [...myArray];

oldObject = {
    d: 22,
    m: 9,
    o: { c: "MVD", i: "UY", f: { a: 56 } }
};
newObject = Object.assign({}, oldObject);

newObject.d = 8888;
newObject.o.f.a = 9999;

console.log(newObject);
// {d:8888, m:9, o: {c:"MVD", i:"UY", f: {a:9999}}} -- ok

console.log(oldObject);
// {d:22, m:9, o: {c:"MVD", i:"UY", f: {a:9999}}} -- oops!!

const jsonCopy = obj => JSON.parse(JSON.stringify(obj));

let myDate = new Date();
let newDate = jsonCopy(myDate);
console.log(typeof myDate, typeof newDate); // object string

const deepCopy = obj => {
    let aux = obj;
    if (obj && typeof obj === "object") {
        aux = new obj.constructor();
        Object.getOwnPropertyNames(obj).forEach(
            prop => (aux[prop] = deepCopy(obj[prop]))
        );
    }
    return aux;
};

oldObject = {
    d: 22,
    m: 9,
    o: { c: "MVD", i: "UY", f: { a: 56 } }
};

newObject = deepCopy(oldObject);
newObject.d = 8888;
newObject.o.f.a = 9999;
console.log(newObject);
// {d:8888, m:9, o:{c:"MVD", i:"UY", f:{a:9999}}}
console.log(oldObject);
// {d:22, m:9, o:{c:"MVD", i:"UY", f:{a:56}}} -- unchanged!

const getField = attr => obj => obj[attr];
const getByPath = (arr, obj) => {
    if (arr[0] in obj) {
        return arr.length > 1
            ? getByPath(arr.slice(1), obj[arr[0]])
            : deepCopy(obj[arr[0]]);
    } else {
        return undefined;
    }
};
myObj3 = {
    d: 22,
    m: 9,
    o: {c: "MVD", i: "UY", f: {a: 56}}
};
deepFreeze(myObj3);
console.log(getByPath(["d"], myObj3)); // 22
console.log(getByPath(["o"], myObj3)); // {c: "MVD", i: "UY", f: {a: 56}}
console.log(getByPath(["o", "c"], myObj3)); // "MVD"
console.log(getByPath(["o", "f", "a"], myObj3)); // 56
let fObj = getByPath(["o", "f"], myObj3);
console.log(fObj); // {a: 56}
fObj.a = 9999;
console.log(fObj); // {a: 9999} -- it's not frozen

const setByPath = (arr, value, obj) => {
    if (!(arr[0] in obj)) {
        obj[arr[0]] =
            arr.length === 1 ? null : Number.isInteger(arr[1]) ? [] : {};
    }
    
    if (arr.length > 1) {
        return setByPath(arr.slice(1), value, obj[arr[0]]);
    } else {
        obj[arr[0]] = value;
        return obj;
    }
};
const updateObject = (arr, obj, value) => {
    let newObj = deepCopy(obj);
    setByPath(arr, value, newObj);
    return deepFreeze(newObj);
};

let new1 = updateObject(["m"], myObj3, "sep");
// {d: 22, m: "sep", o: {c: "MVD", i: "UY", f: {a: 56}}};
console.log(new1);

let new2 =updateObject(["b"], myObj3, 220960);
// {d: 22, m: 9, o: {c: "MVD", i: "UY", f: {a: 56}}, b: 220960};
console.log(new2);

let new3 =updateObject(["o", "f", "a"], myObj3, 9999);
// {d: 22, m: 9, o: {c: "MVD", i: "UY", f: {a: 9999}}};
console.log(new3);

let new4 =updateObject(["o", "f", "j", "k", "l"], myObj3, "deep");
// {d: 22, m: 9, o: {c: "MVD", i: "UY", f: {a: 56, j: {k: "deep"}}}};
console.log(new4);

// 

class ListNode {
   constructor(value, next = null) {
       this.value = value;
       this.next = next;
   }
}
const setIn = (arr, val, obj) => {
    const newObj = Number.isInteger(arr[0]) ? [] : {};
    
    Object.keys(obj).forEach(k => {
        newObj[k] = k !== arr[0] ? obj[k] : null;
    });
    
    newObj[arr[0]] =
        arr.length > 1 ? setIn(arr.slice(1), val, obj[arr[0]]) : val;
    return newObj;
};
let myObj1 = {
    a: 111,
    b: 222,
    c: 333,
    d: {
        e: 444,
        f: 555,
        g: {
            h: 666,
            i: 777
        },
        j: [{k: 100}, {k: 200}, {k: 300}]
    }
};
let myObj2 = setIn(["d", "f"], 88888, myObj1);
console.log(myObj1.d === myObj2.d);     // false
console.log(myObj1.d.f === myObj2.d.f); // false
console.log(myObj1.d.g === myObj2.d.g); // true

myObj3 = setIn(["d", "j", 1, "k"], 99999, myObj2);
console.log(myObj1.d.j === myObj3.d.j);       // false
console.log(myObj1.d.j[0] === myObj3.d.j[0]); // true
console.log(myObj1.d.j[1] === myObj3.d.j[1]); // false
console.log(myObj1.d.j[2] === myObj3.d.j[2]); // true

const deleteIn = (arr, obj) => {
    const newObj = Number.isInteger(arr[0]) ? [] : {};
    
    Object.keys(obj).forEach(k => {
        if (k !== arr[0]) {
            newObj[k] = obj[k];
        }
    });
    
    if (arr.length > 1) {
        newObj[arr[0]] = deleteIn(arr.slice(1), obj[arr[0]]);
    }
    return newObj;
};

let myObj4 = deleteIn(["d", "g"], myObj3);
let myObj5 = deleteIn(["d", "j"], myObj4);
// {a: 111, b: 222, c: 333, d: {e: 444, f: 88888}};
console.log(myObj5);