// Boolean.map :: Boolean ⇝ (Boolean → a) → Boolean
Boolean.prototype.map = function(fn) {
    return !!fn(this);
};

// Number.map :: Number ⇝ (Number → a) → Number
Number.prototype.map = function(fn) {
    return Number(fn(this));
};

// String.map :: String ⇝ (String → a) → String
String.prototype.map = function(fn) {
    return String(fn(this));
};

// Function.map :: (a → b) ⇝ (b → c) → (a → c)
Function.prototype.map = function(fn) {
    return (...args) => fn(this(...args));
};

const plus1 = x => x + 1;
const by10 = y => 10 * y;

console.log(plus1.map(by10)(3));
// 40: first add 1 to 3, then multiply by 10

const VALUE = Symbol("Value");

class Container {
    constructor(x) {
        this[VALUE] = x;
    }
    
    map(fn) {
        return fn(this[VALUE]);
    }
    
    static of(x) {
        return new Container(x);
    }
    
    toString() {
        return `${this.constructor.name}(${this[VALUE]})`;
    }

    valueOf() {
        return this[VALUE];
    }
}

class Functor extends Container {
    static of(x) {
        return new Functor(x);
    }

    map(fn) {
        return Functor.of(fn(this[VALUE]));
    }
}

class Nothing extends Functor {
    isNothing() {
        return true;
    }
    
    toString() {
        return "Nothing()";
    }
    
    map(fn) {
        return this;
    }
}

class Just extends Functor {
    isNothing() {
        return false;
    }
    
    map(fn) {
        return Maybe.of(fn(this[VALUE]));
    }
}

class Maybe extends Functor {
    constructor(x) {
        return x === undefined || x === null
            ? new Nothing()
            : new Just(x);
    }
  
    static of(x) {
        return new Maybe(x);
    }
    
    orElse(v) {
        return this.isNothing() ? v : this.valueOf();
    }    
}

console.log(Maybe.of(2209).map(plus1).map(plus1).toString()); // "Just(2211)"
console.log(Maybe.of(null).map(plus1).map(plus1).toString()); // "Nothing()"

/* Node.JS code:
const request = require("superagent");

const getAlerts = (lat, long, callback) => {
    const SERVER = "https://api.darksky.net/forecast";
    const UNITS = "units=si";
    const EXCLUSIONS = "exclude=minutely,hourly,daily,flags";
    const API_KEY = "you.need.to.get.your.own.api.key";
    
    request
        .get(`${SERVER}/${API_KEY}/${lat},${long}?${UNITS}&${EXCLUSIONS}`)
        .end(function(err, res) {
            if (err) {
                callback({});
            } else {
                callback(JSON.parse(res.text));
            }
        });
};

const getField = attr => obj => obj[attr];
const os = require("os");

const produceAlertsTable = weatherObj =>
    Maybe.of(weatherObj)
        .map(getField("alerts"))
        .map(a =>
            a.map(
                x =>
                    `<tr><td>${x.title}</td>` +
                    `<td>${x.description.substr(0, 500)}...</td></tr>`
            )
        )
        .map(a => a.join(os.EOL))
        .map(s => `<table>${s}</table>`)

getAlerts(29.76, -95.37, x =>
    console.log(produceAlertsTable(x).valueOf())
);
*/

class Monad extends Functor {
    static of(x) {
        return new Monad(x);
    }
    
    map(fn) {
        return Monad.of(fn(this[VALUE]));
    }
    
    unwrap() {
        const myValue = this[VALUE];
        return myValue instanceof Container ? myValue.unwrap() : this;
    }
    
    chain(fn) {
        return this.map(fn).unwrap();
    }
    
    ap(m) {
        return m.map(this.valueOf());
    }
}

const add = x => y => x+y; // or curry((x,y) => x+y)
const something = Monad.of(2).map(add);
const monad5 = something.ap(Monad.of(3));
console.log(monad5.toString()); 

class Left extends Monad {
    isLeft() {
        return true;
    }
    
    map(fn) {
        return this;
    }
}

class Right extends Monad {
    isLeft() {
        return false;
    }
    
    map(fn) {
        return Either.of(null, fn(this[VALUE]));
    }
}

class Either extends Monad {
    constructor(left, right) {
        return right === undefined || right === null
            ? new Left(left)
            : new Right(right);
    }
    
    static of(left, right) {
        return new Either(left, right);
    }
}

class Try extends Either {
    constructor(fn, msg) {
        try {
            return Either.of(null, fn());
        } catch (e) {
            return Either.of(msg || e, null);
        }
    }
    
    static of(fn, msg) {
        return new Try(fn, msg);
    }
}

const getField2 = attr => obj => Try.of(() => obj[attr], "NULL OBJECT");
const x = getField2("somefield")(null);
console.log(x.isLeft()); // true
console.log(x.toString()); // Left(NULL OBJECT)



const Tree = (value, left, right) => (destructure, __) =>
    destructure(value, left, right);

const EmptyTree = () => (__, destructure) => destructure();

const myTree = Tree(
    22,
    Tree(
        9,
        Tree(4, EmptyTree(), EmptyTree()),
        Tree(12, EmptyTree(), EmptyTree())
    ),
    Tree(
        60,
        Tree(56, EmptyTree(), EmptyTree()),
        EmptyTree()
    )
);

const myRoot = myTree((value, left, right) => value, () => null);

const treeRoot = tree => tree((value, left, right) => value, () => null);
const treeLeft = tree => tree((value, left, right) => left, () => null);
const treeRight = tree => tree((value, left, right) => right, () => null);

const treeIsEmpty = tree => tree(() => false, () => true);

const treeCount = aTree => aTree(
    (value, left, right) => 1 + treeCount(left) + treeCount(right),
    () => 0
);
console.log(treeCount(myTree));

const treeToObject = tree =>
    tree((value, left, right) => {
        const leftBranch = treeToObject(left);
        const rightBranch = treeToObject(right);
        const result = { value };
        if (leftBranch) {
            result.left = leftBranch;
        }
        if (rightBranch) {
            result.right = rightBranch;
        }
        return result;
    }, () => null);
console.log(treeToObject(myTree));

const treeSearch = (findValue, tree) =>
    tree(
        (value, left, right) =>
            findValue === value
                ? true
                : findValue < value
                  ? treeSearch(findValue, left)
                  : treeSearch(findValue, right),
        () => false
    );

const treeInsert = (newValue, tree) =>
    tree(
        (value, left, right) =>
            newValue <= value
                ? Tree(value, treeInsert(newValue, left), right)
                : Tree(value, left, treeInsert(newValue, right)),
        () => Tree(newValue, EmptyTree(), EmptyTree())
    );
    
const compare = (obj1, obj2) =>
    obj1.key === obj2.key ? 0 : obj1.key < obj2.key ? -1 : 1;

const treeInsert2 = (comparator, newValue, tree) =>
    tree(
        (value, left, right) =>
            comparator(newValue, value) === 0
                ? Tree(newValue, left, right)
                : comparator(newValue, value) < 0
                  ? Tree(
                        value,
                        treeInsert2(comparator, newValue, left),
                        right
                    )
                  : Tree(
                        value,
                        left,
                        treeInsert2(comparator, newValue, right)
                    ),
        () => Tree(newValue, EmptyTree(), EmptyTree())
    );

const treeMap = (fn, tree) =>
    tree(
        (value, left, right) =>
            Tree(fn(value), treeMap(fn, left), treeMap(fn, right)),
        () => EmptyTree()
    );


