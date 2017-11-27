const once = f => {
    let done = false;
    return (...args) => {
        if (!done) {
            done = true;
            f(...args);
        }
    };
};

const onceAndAfter = (f, g = noop) => {
    let done = false;
    return (...args) => {
        if (!done) {
            done = true;
            f(...args);
        } else {
            g(...args);
        }
    };
};
