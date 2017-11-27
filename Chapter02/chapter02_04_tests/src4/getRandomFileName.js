const getRandomLetter = (getRandomInt=Math.random) => {
    const min = "A".charCodeAt();
    const max = "Z".charCodeAt();
    return String.fromCharCode(Math.floor(getRandomInt() * (1+max-min)) + min);
}


const getRandomLetter2 = (getRandomInt=Math.random) => {
    const min = "A".charCodeAt();
    const max = "Z".charCodeAt();
    return String.fromCharCode(Math.floor(getRandomInt() * (1+max-min)) + min);
}


const getRandomFileName = (fileExtension="", randomLetterFunc=getRandomLetter) => {
    const NAME_LENGTH = 12;
    let namePart = new Array(NAME_LENGTH);
    for (let i=0; i<NAME_LENGTH; i++) {
        namePart[i] = randomLetterFunc();
    }
    return namePart.join("") + fileExtension;
}