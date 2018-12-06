const _ = require('lodash')

const input = [{x: 152, y: 292},
{x: 163, y: 90},
{x: 258, y: 65},
{x: 123, y: 147},
{x: 342, y: 42},
{x: 325, y: 185},
{x: 69, y: 45},
{x: 249, y: 336},
{x: 92, y: 134},
{x: 230, y: 241},
{x: 74, y: 262},
{x: 241, y: 78},
{x: 299, y: 58},
{x: 231, y: 146},
{x: 239, y: 87},
{x: 44, y: 157},
{x: 156, y: 340},
{x: 227, y: 226},
{x: 212, y: 318},
{x: 194, y: 135},
{x: 235, y: 146},
{x: 171, y: 197},
{x: 160, y: 59},
{x: 218, y: 205},
{x: 323, y: 102},
{x: 290, y: 356},
{x: 244, y: 214},
{x: 174, y: 250},
{x: 70, y: 331},
{x: 288, y: 80},
{x: 268, y: 128},
{x: 359, y: 98},
{x: 78, y: 249},
{x: 221, y: 48},
{x: 321, y: 228},
{x: 52, y: 225},
{x: 151, y: 302},
{x: 183, y: 150},
{x: 142, y: 327},
{x: 172, y: 56},
{x: 72, y: 321},
{x: 225, y: 298},
{x: 265, y: 300},
{x: 86, y: 288},
{x: 78, y: 120},
{x: 146, y: 345},
{x: 268, y: 181},
{x: 243, y: 235},
{x: 262, y: 268},
{x: 40, y: 60},]

const getMaxArea = (input) => {

    const getMatrix = () => {
        let xDim = 0
        let yDim = 0
        for (let i = 0; i < input.length; i++) {
            if (input[i].x > xDim)
                xDim = input[i].x
            if (input[i].y > yDim)
                yDim = input[i].y
        }
        let matrix = [];
        for(var i=0; i < xDim; i++) {
            matrix[i] = new Array(yDim).fill('-');
        }
        return matrix;
    }

    const closestCoordinateIndex = (x, y) => {
        let minDistance = Number.MAX_SAFE_INTEGER
        let minIndex = Number.MAX_SAFE_INTEGER
        let distances = []
        for (let i = 0; i < input.length; i++) {
            let distance = Math.abs(x - input[i].x) + Math.abs(y - input[i].y)
            distances[i] = distance
            if (distance < minDistance) {
                minDistance = distance
                minIndex = i
            }
        }
        return (distances.filter(d => d === minDistance).length > 1) ? '.' : minIndex
    }

    let matrix = getMatrix()
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            matrix[i][j] = closestCoordinateIndex(i, j)
        }
    }
    
    let areas = input.map((coord, index) => ({
        area: 0,
        isInfinite: false
    }))

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] !== '.') {
                areas[matrix[i][j]].area++
                areas[matrix[i][j]].isInfinite = areas[matrix[i][j]].isInfinite || (
                    i === 0 || 
                    i === matrix.length - 1 || 
                    j === 0 || 
                    j === matrix[i].length - 1
                )
            }
        }
    }
    return _.maxBy(areas.filter(a => !a.isInfinite), (a) => a.area).area
}

console.log('6-1 soltuion: ', getMaxArea(input))