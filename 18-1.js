const _ = require('lodash')

const input = [
'||#.#..|||......#........#.|.......#....#||...##|.',
'|#|....#|##|###.|...#.|.|..|...|....|..#|...|..||.',
'||.#..#|##....#.....|..##.#....|#....|.#...##||..#',
'....|....|.#.........|....|#|#..|..|..|#....#|.|#.',
'|.|.|..||..#.|....||.|||..||||#.|.#||..........|.|',
'...#..|..###|#....#|.|.#..|...#....|..#.#.....#|..',
'#|.#..#|......#.|....|..||..#..|..||.....##..#|.#.',
'....||#.....|.##..........##.||##..||#..|.|...##..',
'.#.|..|.#.....#...........#..#..#.|..##.|..#......',
'#...|#.|.#....#...|#...|.....#.|##...|.|.||...|.##',
'.|...||....|##..#..|....|#||...|#.|.||...||....|..',
'....#.......|.##...#|.#.##.|......#||..|#.........',
'.||#....|||.|##...||...|#...#|...|..|...#....#|..|',
'.#....||....|||...|.....|....#.###.....|#.....|..|',
'#|.#.....|#..........#....|#...#.....|...|.||..#..',
'....##......#.##|##|......##.#.....||..|.#.....|##',
'##......##......|.|.#..#|...|.#.#|.|||..|.#.|..#..',
'.|.|....||.|#...#||.#..|#...#...|###..|||..|....#.',
'..#|#..##....#.||...#.|||...|.#....#||...#...|#...',
'...#..#.........##.|.|#|.|.##..#...##..#|....|....',
'....#|..|.#.|...|..#..|#|..#..........#..|.#...#..',
'.#.##|..###|...#|||#....##..||#...##..|.....|.||||',
'...||.|#|....#.##|.#..|....#.#|#|....||..|#|.....|',
'......||.|.#....##...#...#.|...|..#.###.|..#|.....',
'..##.|.|.|..##|#.....#.#||........||##.#.......|#.',
'#|..#.||.||#.||||.....#..|..|#.|##.....##.#.|.....',
'..##|.#.......#.##..|..|....|.|##.|#||#|.||||.#.#.',
'|.||..|......##..|..#..#.|....##.||.#.....||.#....',
'#.|.||.#..|...|...|..|.|.#...|.#.|..|...###|##.|.#',
'#........|....###.......#...#.##.#|.|...#||#.#.##.',
'.|.....#.|#..##.||.|....#....|..||.#|#|#..#...#.#.',
'......##||...|#|..|#.......#.#..|#......|.#|...|.|',
'....#|.##|#.#..#.|.|....#....|....|#|||.#|#..|.#.#',
'|...#....#|||#..||.|||.#.#|..#.....#......|.##|...',
'..|..#.|.|..#.|.#|..|......#|.||#.##..#.#.|.||....',
'.|#....|.#.#...|||.|.|#|.#..|......|...###|..|.|||',
'.|##.|#|.....#|.....#||#.|.|..||.##..#.#|#..|||...',
'..|#..||..#.##...#.||#..|...|#..#..|..|.#||#......',
'.##|#|#.|..|........#|..#.|.|..##.#...##|.#...#..|',
'|#..#||.#|.....||.#.....#.|..##...|#....##..##|##.',
'#.#|...#...|...|...|.#..#|..#.#......|.##|......|#',
'|...|||....#.|...|#....##|.....|...|.....|....#..|',
'.#...#|#.|.##|##..#..#.##...##..||..|....|..###.#.',
'.#....|......|...#.|..|#.|....#.##|...##....#|.||.',
'|#.##...|.|#...|###.|..|...#..#.|.|......|.|...##.',
'..|.#|.||.##.#.........|.#...#|....|...#|.|###....',
'.#.||...|.#||.#|..#|..#......#|#.||..|||.||....|.|',
'.|.#.#.|.......|.#....###....##.|.|.|...#.#.#..##.',
'.....||||................#..#|..|#|...|.#.|.#.|.#.',
'.|.||....#..|.##....#..#|.#.|.|##|#..##....|#.....',
]

const printField = (field) => {
    for (let i = 0; i < field.length; i++)
        console.log(field[i].join(' '))
    console.log('\n')
}

const calculateResult = (field) => {
    let trees = 0
    let lumberyards = 0
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++) {
            if (field[i][j] === '|') trees++
            if (field[i][j] === '#') lumberyards++
        }
    }
    return trees * lumberyards
}

const getAdjacents = (field, i, j) => {
    let adj = []
    if (i > 0 && j > 0) adj.push(field[i-1][j-1])
    if (i > 0) adj.push(field[i-1][j])
    if (i > 0 && j < field[0].length - 1) adj.push(field[i-1][j+1])
    if (j > 0) adj.push(field[i][j-1])
    if (j < field[0].length - 1) adj.push(field[i][j+1])
    if (i < field.length - 1 && j > 0) adj.push(field[i+1][j-1])
    if (i < field.length - 1 ) adj.push(field[i+1][j])
    if (i < field.length - 1 && j < field[0].length - 1) adj.push(field[i+1][j+1])
    return adj
}

const evolve = (field, i, j) => {
    let adjacents = getAdjacents(field, i, j)
    if (field[i][j] === '.' && adjacents.filter(a => a === '|').length >= 3) return '|'
    if (field[i][j] === '|' && adjacents.filter(a => a === '#').length >= 3) return '#'
    if (field[i][j] === '#' && (adjacents.filter(a => a === '|').length < 1 || adjacents.filter(a => a === '#').length < 1)) return '.'
    return field[i][j]
}

const evolveField = (field) => {
    let newField = Array(field.length).fill().map(f => Array(field[0].length))
    for (let i = 0; i < field.length; i++)
        for (let j = 0; j < field[i].length; j++)
            newField[i][j] = evolve(field, i, j)
    return newField
} 

const afterMinutes = (input, mins) => {
    let previousFields = []
    let currentField = input.map(i => i.split(''))
    let patternSize = null
    let lastMin = null
    for (let t = 0; t < mins; t++) {
        currentField = evolveField(currentField);
        let flattenedField = _.flatten(currentField).join('')
        let index = _.lastIndexOf(previousFields, flattenedField)
        if (index > -1) { // If this field was already seen then it's a repeating pattern because I say so
            patternSize = t - index
            lastMin = t
            break
        }
        previousFields.push(flattenedField)
        //printField(currentField)
    }
    if (patternSize !== null) {
        let times = (mins - lastMin) % patternSize - 1
        for (let i = 0; i < times; i++)
            currentField = evolveField(currentField);
    }
    return currentField
}

let field = afterMinutes(input, 10)
console.log('18-1 solution: ' + calculateResult(field))

module.exports = {
    input,
    afterMinutes,
    calculateResult
}
