const { input, simulateBattle } = require('./15-1.js')

let i = 2
let simulation
do {
    i++
    simulation = simulateBattle(input, i)
} while (simulation.deadElves > 0)

console.log('15-2 solution: ' + simulation.completeRounds * simulation.totalHP)