const addLogging = (fn) => (...args) => {
    console.log(`entering ${fn.name}: ${args}`);
    try {
        const valueToReturn = fn(...args);
        console.log(`exiting ${fn.name}: ${valueToReturn}`);
        return valueToReturn;
    } catch (thrownError) {
        console.log(`exiting ${fn.name}: threw ${thrownError}`);
        throw thrownError;
    }
};

const addLogging2 = (fn, logger=console.log) => (...args) => {
    logger(`entering ${fn.name}: ${args}`);
    try {
        const valueToReturn = fn(...args);
        logger(`exiting ${fn.name}: ${valueToReturn}`);
        return valueToReturn;
    } catch (thrownError) {
        logger(`exiting ${fn.name}: threw ${thrownError}`);
        throw thrownError;
    }
};