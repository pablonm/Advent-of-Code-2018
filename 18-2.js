const{ input, afterMinutes, calculateResult } = require('./18-1.js')

let field = afterMinutes(input, 1000000000)
console.log('18-2 solution: ' + calculateResult(field))