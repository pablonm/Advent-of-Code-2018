const { input, reactPolymer } = require("./5-1.js");

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'V', 'X', 'Y', 'Z']

let min = Number.MAX_SAFE_INTEGER
let reactedPolymerLength
for (let i = 0; i < alphabet.length; i++) {
    let re = new RegExp(alphabet[i], "gi")
    reactedPolymerLength = reactPolymer(input.replace(re, "")).length
    if (reactedPolymerLength < min)
        min = reactedPolymerLength
}

console.log('5-2 solution: ', min)