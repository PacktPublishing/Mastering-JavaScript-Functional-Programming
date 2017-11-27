const curryByBind = (fn) => 
    (fn.length===0) ? fn() : (p) => curryByBind(fn.bind(null, p));

const curryByBind2 = (fn, len=fn.length) => 
    (len===0) ? fn() : (p) => curryByBind2(fn.bind(null,p), len-1);


const curryByEval = (fn, len=fn.length) => 
    eval(`${range(0,len).map(i => `x${i}`).join("=>")}
    => ${fn.name}(${range(0,len).map(i=>`x${i}`).join(",")})`);

const curryByEval2 = (fn, len=fn.length) => 
    eval(`${range(0,len).map(i => `x${i}`).join("=>")}
    => (${fn.toString()})(${range(0,len).map(i=>`x${i}`).join(",")})`)

