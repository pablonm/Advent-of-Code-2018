const { initSAT, getMaxArea, } = require('./11-1.js')
let SAT = initSAT(300, 8199)
let maxPower = 0
let maxArea = null
let maxSize = 0
for (let i = 1; i <= 300; i++) {
    let area = getMaxArea(SAT, 300, i, 8199)
    if (area.maxPower > maxPower) {
        maxPower = area.maxPower
        maxArea = area
        maxSize = i
    }
}
console.log('11-2 solution: ' + maxArea.x + ',' + maxArea.y + ',' + maxSize)
