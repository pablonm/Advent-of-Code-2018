const input = 360781

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
let nextTen = []
while (recipesSize < (input + 10)) {
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
        if (recipesSize > input) {
            nextTen.push(newRecipes[i].score)
        }
    }
    elf1 = move(elf1)
    elf2 = move(elf2)
}

console.log('14-1 solution: ' + nextTen.join(''))
