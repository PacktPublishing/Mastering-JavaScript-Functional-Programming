const memoize = (fn) => { 
    let cache = {}; 
    return (x) => (x in cache) ? cache[x] : cache[x] = fn(x);
};
