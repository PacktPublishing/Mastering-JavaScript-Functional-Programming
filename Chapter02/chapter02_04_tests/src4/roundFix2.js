const roundFix2 = (a, n) => {
    let r = (a > 0) ? Math.ceil(n) : Math.floor(n);
    a += (n - r);
    return {a, r};
}
