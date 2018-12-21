const _ = require('lodash')
const { ops } = require('./16-1.js')

const input = [
'#ip 1',
'addi 1 16 1', // instruction 0
'seti 1 4 4', // instruction 1
'seti 1 1 2', // instruction 2
'mulr 4 2 5', // instruction 3
'eqrr 5 3 5', // instruction 4
'addr 5 1 1', // instruction 5
'addi 1 1 1', // instruction 6
'addr 4 0 0', // instruction 7
'addi 2 1 2', // instruction 8
'gtrr 2 3 5', // instruction 9
'addr 1 5 1', // instruction 10
'seti 2 4 1', // instruction 11
'addi 4 1 4', // instruction 12
'gtrr 4 3 5', // instruction 13
'addr 5 1 1', // instruction 14
'seti 1 1 1', // instruction 15
'mulr 1 1 1', // instruction 16
'addi 3 2 3', // instruction 17
'mulr 3 3 3', // instruction 18
'mulr 1 3 3', // instruction 19
'muli 3 11 3', // instruction 20
'addi 5 7 5', // instruction 21
'mulr 5 1 5', // instruction 22
'addi 5 18 5', // instruction 23
'addr 3 5 3', // instruction 24
'addr 1 0 1', // instruction 25
'seti 0 7 1', // instruction 26
'setr 1 3 5', // instruction 27
'mulr 5 1 5', // instruction 28
'addr 1 5 5', // instruction 29
'mulr 1 5 5', // instruction 30
'muli 5 14 5', // instruction 31
'mulr 5 1 5', // instruction 32
'addr 3 5 3', // instruction 33
'seti 0 7 0', // instruction 34
'seti 0 6 1', // instruction 35
]

const processInput = (input) => {
    return {
        ipReg: parseInt(input[0][input[0].length - 1]),
        program: _.chain(input).tail().map(i => ({
            op: i.split(' ')[0],
            a: parseInt(i.split(' ')[1]),
            b: parseInt(i.split(' ')[2]),
            c: parseInt(i.split(' ')[3]),
        })).value()
    }
}

const execute = (input, registers) => {
    const { ipReg, program } = processInput(input)
    while (registers[ipReg] < program.length) {
        let instruction = program[registers[ipReg]]
        registers = ops[instruction.op](registers, [-1, instruction.a, instruction.b, instruction.c])
        registers[ipReg]++
    }
    return registers
}

console.log('19-1 solution: ' + execute(input, [0,0,0,0,0,0])[0])

/* 

##################
##     19-2     ##
##################

After analyzing for long hours the registers while executing the program, 
I found out that eventually it loops between instructions 2 and 15

 - Instruction 2: reg[2] = 1
 - Instruction 3: reg[5] = reg[4] * reg[2]
 - Instruction 4: if (reg[5] === reg[3]) reg[5] = 1 else reg[5] = 0
 - Instruction 5: Reg[1] = reg[5] + reg[1] // if (4) is true then skips next instruction (6)
 - Instruction 6: reg[1]++ by one (skips an instruction)
 - Instruction 7: reg[0] = reg[4] + reg[0]
 - Instruction 8: reg[2]++
 - Instruction 9: if (reg[2] > reg[3]) reg[5] = 1 else reg[5] = 0
 - Instruction 10: reg[1] = reg[1] + reg[5] // if (9) is true then skips next instruction (11)
 - Instruction 11: reg[1] = 2 // Go to (3)
 - Instruction 12: reg[4]++
 - Instruction 13: if (reg[4] > reg[3]) reg[5] = 1 else reg[5] = 0
 - Instruction 14: reg[1] = reg[1] + reg[5] // if (13) is true then skips next instruction (15)
 - Instruction 15: reg[1] = 1 // Go to (2)
 - Instruction 16: reg[1] = reg[1] * reg[1] // Which always sets the value 256 in the reg[1] (the IP) so the program halts

So basically, the program sums all the divisors of 10551408 
looping both the registers 2 and 4 10551408 times, which is crazy

So the loop can be sumarized to this:
___________________________________________________
|                                                  |
|    let registerZero = 0                          |
|    for (let i = 0; i <= 10551408; i++) {         |
|        for (let j = 0; j <= 10551408; j++) {     |
|            if (i * j === 10551408) zero += j     |
|        }                                         |
|    }                                             |
|__________________________________________________|

we can do the same this way, which performs better... 10551408 times better
*/

let registerZero = 0
for (let i = 0; i <= 10551408; i++)
    if (10551408 % i === 0) registerZero += i

console.log('19-2 solution: ' + registerZero)