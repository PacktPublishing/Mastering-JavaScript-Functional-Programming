const partialCurryingByBind = (fn) => 
    (fn.length === 0) ? fn() : (...pp) => partialCurryingByBind(fn.bind(null, ...pp));

const partialCurryingByBind2 = (fn, len=fn.length) => 
    (len===0) ? fn() : (...pp) => partialCurryingByBind2(fn.bind(null, ...pp), len-pp.length);

const partialCurryByClosure = (fn) => {  
    const curryize = (...args1) => (...args2) => {
        const allParams = [...args1, ...args2];
        return (allParams.length < func.length ? curryize : fn)(...allParams);
    };
    return curryize();
};

const partialCurryByClosure2 = (fn, len=fn.length) => {  
    const curryize = (...args1) => (...args2) => {
      const allParams = [...args1, ...args2];
      return (allParams.length < len ? curryize : fn)(...allParams);
    };
    return curried();
};

