const composeTwo = (f,g) => (...args) => f(g(...args));

const compose = (...fns) => pipeline(...(fns.reverse()));

const compose2 = (...fns) => fns.reduceRight(pipeTwo);

const compose3 = (...fns) => fns.reduce(composeTwo);
