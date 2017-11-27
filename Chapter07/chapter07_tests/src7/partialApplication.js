const range = (start, stop) => (new Array(stop-start)).fill(0).map((v,i) => start+i);

const partialByEval = (fn, ...args) => {
    const rangeArgs = range(0, fn.length);
    const leftList= rangeArgs
        .map(v => args[v]===undefined ? `x${v}`:null)
        .filter(v => !!v)
        .join(",");
    const rightList= rangeArgs
        .map(v => args[v]===undefined ? `x${v}`: args[v])
        .join(",");
    return eval(`(${leftList}) => ${fn.name}(${rightList})`);
};

const partialByClosure = (fn, ...args) => {  
    const partialize = (...args1) => (...args2) => {
        for (let i = 0; i<args1.length && args2.length; i++) {
            if (args1[i] === undefined) {
                args1[i] = args2.shift();
            }
        }
        const allParams = [...args1, ...args2];
        return ((allParams.includes(undefined) || allParams.length < fn.length) ? 
            partialize : fn)(...allParams);
    };

    return partialize(...args);
};
