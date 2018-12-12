const getArea = (SAT, i, j, size) => {
    return SAT[i + size - 1][j + size - 1] 
        + (i > 0 && j > 0 ? SAT[i - 1][j - 1] : 0)
        - (i > 0 ? SAT[i - 1][j + size - 1] : 0)
        - (j > 0 ? SAT[i + size - 1][j - 1] : 0)
}

const powerLevel = (x, y, serial) => {
    let rackID = (x+1) + 10
    let power = ((rackID * (y+1)) + serial) * rackID
    let digit = (power < 100) ? 0 : parseInt(power.toString()[power.toString().length - 3])
    return digit - 5
}

// Calculate Summed Area Table
const initSAT = (matrixDim, serial) => {
    const CalcSAT = (i, j, serial) => {
        SAT[i][j] = powerLevel(i, j, serial)
        + (i > 0 ? SAT[i-1][j] : 0)
        + (j > 0 ? SAT[i][j-1] : 0)
        - (i > 0 && j > 0 ? SAT[i-1][j-1] : 0)
    }
    let SAT = Array(matrixDim).fill().map(a => Array(matrixDim).fill(0))
    for (let i = 0; i < matrixDim; i++) 
        for (let j = 0; j < matrixDim; j++)
            CalcSAT(i,j, serial)
    return SAT
}

const getMaxArea = (SAT, matrixDim, squareDim, serial) => {
    let maxPower = 0
    let maxPowerCell = null
    for (let x = 0; x <= matrixDim - squareDim; x++) {
        for (let y = 0; y <= matrixDim - squareDim; y++) {
            let areaPower = getArea(SAT, x, y, squareDim)
            if (areaPower > maxPower) {
                maxPower = areaPower
                maxPowerCell = {x: x+1, y: y+1}
            }
        }
    }
    return {...maxPowerCell, maxPower}
}

let SAT = initSAT(300, 8199)
let maxArea = getMaxArea(SAT, 300, 3, 8199)
console.log('11-1 solution: ' + maxArea.x + ',' + maxArea.y)

module.exports = {
    getArea,
    powerLevel,
    initSAT,
    getMaxArea,
}