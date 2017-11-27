const getHandler = {
    get(target, property, receiver) {
        if (typeof target[property] === "function") { 
            // requesting a method? return a wrapped version
            return (...args) => {
                const result = target[property](...args);
                return (result === undefined) ? receiver : result;
            }
        } else { 
            // an attribute was requested - just return it
            return target[property];
        }
    }
};

const chainify = (obj) => new Proxy(obj, getHandler);

