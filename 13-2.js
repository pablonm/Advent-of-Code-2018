const _ = require('lodash')
const { tracks, initCarts, moveCarts } = require('./13-1.js')

let carts = initCarts(tracks);
while (carts.length > 1) {
    carts = _.sortBy(carts, [c => c.position.x, c => c.position.y])
    let tick = moveCarts(carts, tracks);
    carts = tick.newCarts
}
console.log('13-2 solution: ' + carts[0].position.y + ',' + carts[0].position.x)