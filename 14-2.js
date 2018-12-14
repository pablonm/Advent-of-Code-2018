const input = '360781'

const move = (elf) => {
    let times = elf.score + 1
    for (let i = 0; i < times; i++)
        elf = elf.next
    return elf
}

let recipesStart = { score: 3, next: null }
let recipesEnd = { score: 7, next: recipesStart }
recipesStart.next = recipesEnd
let elf1 = recipesStart
let elf2 = recipesEnd
let recipesSize = 2
let match = 0

while (true) {
    let newRecipes = []
    let newScore = elf1.score + elf2.score
    if (newScore > 9) {
        newRecipes = [
            { score: parseInt(newScore.toString().split('')[0]), next: recipesStart },
            { score: parseInt(newScore.toString().split('')[1]), next: recipesStart },
        ]
    } else {
        newRecipes = [{ score: newScore, next: recipesStart }]
    }
    for (let i = 0; i < newRecipes.length; i++) {
        recipesEnd.next = newRecipes[i]
        recipesEnd = newRecipes[i]
        recipesSize += 1
        if (input[match] === newRecipes[i].score.toString()) {
            match++
            if (match === 6) break
        } else {
            match = 0
        }
    }
    if (match === 6) break
    elf1 = move(elf1)
    elf2 = move(elf2)
}

console.log('14-2 solution: ' + (recipesSize - 6))
