const _ = require('lodash')

const getHighestScore = (maxPlayers, lastMarble) => {
    let currentMarble = {
        marble: 0,
        next: null,
        prev: null,
    }
    let nextMarble = 0
    let scores = Array(maxPlayers).fill(0);
    do {
        nextMarble++
        nextMarbleScore = 0
        if (nextMarble % 23 === 0) {
            currentMarble = currentMarble.prev.prev.prev.prev.prev.prev.prev //heh
            scores[nextMarble % maxPlayers] += nextMarble + currentMarble.marble
            currentMarble.prev.next = currentMarble.next
            currentMarble.next.prev = currentMarble.prev
            currentMarble = currentMarble.next
        } else {
            let newMarble = { marble: nextMarble }
            if (currentMarble.next === null) {
                currentMarble.next = newMarble
                newMarble.next = currentMarble
                currentMarble.prev = newMarble
                newMarble.prev = currentMarble
            } else {
                currentMarble = currentMarble.next
                newMarble.next = currentMarble.next
                currentMarble.next = newMarble
                newMarble.prev = currentMarble
                newMarble.next.prev = newMarble
            }
            currentMarble = newMarble
        }
    } while (nextMarble !== lastMarble)
    return _.max(scores)
}

console.log('9-1 solution: ', getHighestScore(473, 70904))

module.exports = {
    getHighestScore
}