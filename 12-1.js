const input = '#.#..#..###.###.#..###.#####...########.#...#####...##.#....#.####.#.#..#..#.#..###...#..#.#....##.'
const rulesInput = [ 
'#.### => .',
'###.# => #',
'.##.. => .',
'..### => .',
'..##. => .',
'##... => #',
'###.. => #',
'.#... => #',
'##..# => #',
'#.... => .',
'.#.#. => .',
'####. => .',
'#.#.. => .',
'#.#.# => .',
'#..## => #',
'.#### => #',
'...## => .',
'#..#. => #',
'.#.## => #',
'..#.# => #',
'##.#. => #',
'#.##. => #',
'##### => .',
'..#.. => #',
'....# => .',
'##.## => .',
'.###. => #',
'..... => .',
'...#. => #',
'.##.# => .',
'#...# => .',
'.#..# => #',]



const getResult = (rules, plants, index) => {
    for (let i = 0; i < rules.length; i++)
        if (plants.slice(index - 2, index + 3).join('') === rules[i].pattern)
            return rules[i].result
    return '.'
}

const sumPlantPots = (plants, zeroIndex) => {
    let sum = 0;
    for (let i = 0; i < plants.length; i++)
        if (plants[i] === '#') 
            sum += i - zeroIndex
    return sum
}

const calcGenerations = (input, rulesInput, generations) => {
    let plants = ['.', '.', '.', '.', '.', ...(input.split('')), '.', '.', '.', '.', '.']
    let rules = rulesInput.map(r => ({
        pattern: r.split(' => ')[0],
        result: r.split(' => ')[1]
    }))

    let zeroIndex = 5
    let prevGen = []
    let convergence = null
    for (let g = 0; g < generations; g++) {
        let newGen = []
        for (let i = 2; i < plants.length - 2; i++) {
            newGen.push(getResult(rules, plants, i))
        }
        let splitted = newGen.join('').split('#')
        zeroIndex += 3 - splitted[0].length
        plants = [
            ...(Array(5 - splitted[0].length).fill('.')),
            ...newGen,
            ...(Array(5 - splitted[splitted.length - 1].length).fill('.')),
        ]
        /* 
        From viewing the console logs, I detected the plants reach a point where the only
        change from one generation to other, is that all plants move one place to the right,
        so when that point is reached, I leave the loop and calculate the index of the position 
        zero of the array by hand.
        */
        if (prevGen.join('') === newGen.join('')) { 
            convergence = g
            break;
        }
        prevGen = newGen
    }
    if (convergence !== null) {
        zeroIndex = zeroIndex - generations + convergence + 1
    }
    return sumPlantPots(plants, zeroIndex)
}

console.log('12-1 solution: ' + calcGenerations(input, rulesInput, 20))

module.exports = {
    input,
    rulesInput,
    getResult,
    sumPlantPots,
    calcGenerations,
}