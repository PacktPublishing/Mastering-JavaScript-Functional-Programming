var colors = [
    "violet",
    "indigo",
    "blue",
    "green",
    "yellow",
    "orange",
    "red"
];
colors.sort();
console.log(colors);
// ["blue", "green", "indigo", "orange", "red", "violet", "yellow"]

var someNumbers = [3, 20, 100];
someNumbers.sort();
console.log(someNumbers);
// [100, 20, 3]

var palabras = ["ñandú", "oasis", "mano", "natural", "mítico", "musical"];
palabras.sort();
console.log(palabras);
// ["mano", "musical", "mítico", "natural", "oasis", "ñandú"] -- wrong result!

palabras.sort((a, b) => a.localeCompare(b, "es"));
console.log(palabras);
// ["mano", "mítico", "musical", "natural", "ñandú", "oasis"]

const spanishComparison = (a, b) => a.localeCompare(b, "es");

palabras.sort(spanishComparison);
// sorts the palabras array according to Spanish rules:
// ["mano", "mítico", "musical", "natural", "ñandú", "oasis"]



function ready() {
    console.log("ready");
}
function set() {
    console.log("set");
}
function go() {
    console.log("go");
}
ready();
set();
go();

function set() {
    console.log("UNEXPECTED...");
}
// "ready"
// "UNEXPECTED"
// "go"

(function() {
    function ready() {
        console.log("ready");
    }
    function set() {
        console.log("set");
    }
    function go() {
        console.log("go");
    }
    ready();
    set();
    go();
})();

function set() {
    console.log("UNEXPECTED...");
}
// "ready"
// "set"
// "go"

const myCounter = (function() {
    let count = 0;
    return function() {
        count++;
        return count;
    };
})();

 
