const _ = require('lodash')

const input = [
'################################',
'#########.######################',
'#########..#####################',
'#########..G####################',
'########....#GG#################',
'########G......#################',
'########........################',
'###.####...#....################',
'#....###.###...G.###############',
'##......####.....#.#G..#.#######',
'###G.G...###.........#...#######',
'###......##...........##########',
'#............G#####...##########',
'#..G##G......#######..##########',
'#.G.#.......#########..#########',
'####..G.....#########...#.######',
'#...........#########..........#',
'##.#.....#..#########.E.....E..#',
'##.###..G.G.#########..........#',
'##...........#######E.#.......##',
'#.............#####..........###',
'#....#.....E................####',
'##.............##.E...........##',
'#....G.G.................###..##',
'#..............#.....E...###..##',
'#..##.##.G.....##E.......###.###',
'###G..##.......###.###...##...##',
'#####.E##.E.G..######...E.#..###',
'####...###..#..#######.......###',
'####...###############.#########',
'#####..#########################',
'################################',
]

solve = (graph, s, avoids = []) => {
    // Shamelessly stolen from https://gist.github.com/jpillora/7382441 and modified
    var solutions = {};
    solutions[s] = [];
    solutions[s].dist = 0;
    
    while(true) {
      var parent = null;
      var nearest = null;
      var dist = Infinity;
      
      for(var n in solutions) {
        if(!solutions[n])
          continue
        var ndist = solutions[n].dist;
        var adj = graph[n];
        for(var a in adj) {
          if(solutions[a])
            continue;
          if(avoids.includes(a))
            continue;
          var d = adj[a] + ndist;
          if(d < dist) {
            parent = solutions[n];
            nearest = a;
            dist = d;
          }
        }
      }
      
      if(dist === Infinity) {
          break;
      }
      
      solutions[nearest] = parent.concat(nearest);
      solutions[nearest].dist = dist;
    }
    delete solutions[s]
    return solutions;
}

const initCaveAndChars = (input) => {
    const cave = {}
    let chars = []
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            if (input[i][j] !== '#') {
                let bros = {}
                if (i > 0 && input[i-1][j] !== '#') bros[(i-1).toString() + '-' + (j).toString()] = 1
                if (j > 0 && input[i][j-1] !== '#') bros[(i).toString() + '-' + (j-1).toString()] = 1
                if (j < input[i].length - 1 && input[i][j+1] !== '#') bros[(i).toString() + '-' + (j+1).toString()] = 1
                if (i < input.length - 1 && input[i+1][j] !== '#') bros[(i+1).toString() + '-' + (j).toString()] = 1
                cave[(i).toString() + '-' + (j).toString()] = bros
                if (input[i][j] === 'G' || input[i][j] === 'E') {
                    chars.push({
                        char: input[i][j],
                        hp: 200,
                        position: {x: i, y: j}
                    })
                }
            }
        }
    }
    return {
        cave,
        chars
    }
} 

const isBattleActive = (chars) => (chars.filter(c => c.hp > 0 && c.char === 'G').length > 0 && chars.filter(c => c.hp > 0 && c.char === 'E').length > 0)

const isPointFree = (chars, input, x, y) => (input[x][y] !== '#' && chars.filter(c => c.position.x === x && c.position.y === y && c.hp > 0).length === 0)

const positionToString = (pos) => pos.x + '-' + pos.y

const getEnemyInRange = (chars, char) => {
    let charType = (char.char === 'G') ? 'E' : 'G'
    enemies = [
        ...chars.filter(c => c.position.x === char.position.x + 1 && c.position.y === char.position.y && c.char === charType && c.hp > 0),
        ...chars.filter(c => c.position.x === char.position.x && c.position.y === char.position.y + 1 && c.char === charType && c.hp > 0),
        ...chars.filter(c => c.position.x === char.position.x && c.position.y === char.position.y - 1 && c.char === charType && c.hp > 0),
        ...chars.filter(c => c.position.x === char.position.x - 1 && c.position.y === char.position.y && c.char === charType && c.hp > 0),
    ]
    let minHealth = Number.MAX_SAFE_INTEGER
    let minEnemy = null
    for (let i = 0; i < enemies.length; i++) {
        if (enemies[i].hp <= minHealth) {
            minHealth = enemies[i].hp;
            minEnemy = enemies[i]
        }
    }
    return minEnemy
}

const debugPrint = () => {
    let cleanMap = input.map(m => m.replace(/E|G/g, '.'))
    for (let i = 0; i < chars.length; i++) {
        if (chars[i].hp > 0)
            cleanMap[chars[i].position.x] = cleanMap[chars[i].position.x].substr(0,chars[i].position.y) + chars[i].char + cleanMap[chars[i].position.x].substr(chars[i].position.y+1);
    }
    for (let i = 0; i < cleanMap.length; i++) {
        console.log(cleanMap[i])
    }
    console.log('///////////////////////////////////////////////////////////')
}

const getMinDestination = (routes) => {
    let minDestination = null
    for (let i = 0; i < routes.length; i++) {
        minDestination = minPoint(minDestination, routes[i][routes[i].length - 1])
    }
    return routes.filter(r => r[r.length-1] === minDestination)
}

const getMinRoute = (routes) => {
    let minStep = null
    for (let i = 0; i < routes.length; i++) {
        minStep = minPoint(minStep, routes[i][0])
    }
    return minStep
}

const minPoint = (a, b) => {
    if (a === null) return b
    if (b === null) return a
    let ax = a.split('-')[0]
    let ay = a.split('-')[1]
    let bx = b.split('-')[0]
    let by = b.split('-')[1]
    if ((ax < bx) || (ax === bx && ay < by))
        return a
    return b
}

const getMinRouteLength = (routes) => {
    let minLength = Number.MAX_SAFE_INTEGER
    for (let i = 0; i < routes.length; i++) {
        if (routes[i].length < minLength)
            minLength = routes[i].length
    }
    return minLength
}

const getNearestRangePoint = (chars, input, cave, char) => {
    let charType = (char.char === 'G') ? 'E' : 'G'
    let enemies = chars.filter(c => c.char === charType && c.hp > 0)
    let rangePoints = []
    for (let i = 0; i < enemies.length; i++) {
        if (enemies[i].position.x > 0 && isPointFree(chars, input, enemies[i].position.x - 1, enemies[i].position.y)) rangePoints.push({x: enemies[i].position.x - 1, y: enemies[i].position.y})
        if (enemies[i].position.y > 0 && isPointFree(chars, input, enemies[i].position.x, enemies[i].position.y - 1)) rangePoints.push({x: enemies[i].position.x, y: enemies[i].position.y - 1})
        if (enemies[i].position.y < input[0].length - 1 && isPointFree(chars, input, enemies[i].position.x, enemies[i].position.y + 1)) rangePoints.push({x: enemies[i].position.x, y: enemies[i].position.y + 1})
        if (enemies[i].position.x < input.length - 1 && isPointFree(chars, input, enemies[i].position.x + 1, enemies[i].position.y)) rangePoints.push({x: enemies[i].position.x + 1, y: enemies[i].position.y})
    }
    
    let routes = []
    let minRangePoint = null
    let avoids = chars.filter(c => c.hp > 0).map(c => positionToString(c.position)).filter(p => p !== positionToString(char.position))
    let allPaths = solve(cave, positionToString(char.position), avoids)
    for (let i = 0; i < rangePoints.length; i++) {
        if (allPaths[positionToString(rangePoints[i])])
            routes.push(allPaths[positionToString(rangePoints[i])])
    }
    if (routes.length > 0) {
        let minRouteLength = getMinRouteLength(routes)
        routes = routes.filter(r => r.length === minRouteLength)
        minRangePoint = getMinRoute(getMinDestination(routes))
        return {
            x: parseInt(minRangePoint.split('-')[0]),
            y: parseInt(minRangePoint.split('-')[1]),
        }
    }
    return null
}

const simulateBattle = (input, elfAttack) => {
    let { cave, chars } = initCaveAndChars(input)
    let rounds = 0
    while (isBattleActive(chars)) {
        //debugPrint()
        chars = _.orderBy(chars, ['position.x', 'position.y'])
        for (let i = 0; i < chars.length; i++) {
            if (chars[i].hp > 0) {
                let enemyToAttack = getEnemyInRange(chars, chars[i])
                if (!enemyToAttack) {
                    let nearestRangePoint = getNearestRangePoint(chars, input, cave, chars[i])
                    if (nearestRangePoint) {
                        chars[i].position = nearestRangePoint
                        enemyToAttack = getEnemyInRange(chars, chars[i])
                    }
                }
                if (enemyToAttack) {
                    let atk = (enemyToAttack.char === 'G') ? elfAttack : 3
                    chars = chars.map(c => {
                        if (c.position.x === enemyToAttack.position.x && c.position.y === enemyToAttack.position.y)
                            return { ...c, hp: c.hp - atk }
                        return c
                    })
                }
            }
            if (i < chars.length - 1 && !isBattleActive(chars)) {
                rounds--
                break
            }
        }
        rounds++
    }
    return {
        completeRounds: rounds,
        totalHP: chars.filter(c => c.hp > 0).reduce((a,b) => a + b.hp, 0),
        deadGoblins: chars.filter(c => c.hp <= 0 && c.char === 'G').length,
        deadElves: chars.filter(c => c.hp <= 0 && c.char === 'E').length,
        winTeam: chars.filter(c => c.hp > 0)[0].char
    }
}

const simulation = simulateBattle(input, 3)

console.log(simulation)
console.log('15-1 solution: ' + simulation.completeRounds * simulation.totalHP)

module.exports = {
    input,
    simulateBattle,
}