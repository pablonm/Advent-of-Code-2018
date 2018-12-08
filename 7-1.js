const input = ['Step X must be finished before step C can begin.',
'Step C must be finished before step G can begin.',
'Step F must be finished before step G can begin.',
'Step U must be finished before step Y can begin.',
'Step O must be finished before step S can begin.',
'Step D must be finished before step N can begin.',
'Step M must be finished before step H can begin.',
'Step J must be finished before step Q can begin.',
'Step G must be finished before step R can begin.',
'Step I must be finished before step N can begin.',
'Step R must be finished before step K can begin.',
'Step A must be finished before step Z can begin.',
'Step Y must be finished before step L can begin.',
'Step H must be finished before step P can begin.',
'Step K must be finished before step S can begin.',
'Step Z must be finished before step P can begin.',
'Step T must be finished before step S can begin.',
'Step N must be finished before step P can begin.',
'Step E must be finished before step S can begin.',
'Step S must be finished before step W can begin.',
'Step W must be finished before step V can begin.',
'Step L must be finished before step V can begin.',
'Step P must be finished before step B can begin.',
'Step Q must be finished before step V can begin.',
'Step B must be finished before step V can begin.',
'Step P must be finished before step Q can begin.',
'Step S must be finished before step V can begin.',
'Step C must be finished before step Q can begin.',
'Step I must be finished before step H can begin.',
'Step A must be finished before step E can begin.',
'Step H must be finished before step Q can begin.',
'Step G must be finished before step V can begin.',
'Step N must be finished before step L can begin.',
'Step R must be finished before step Q can begin.',
'Step W must be finished before step L can begin.',
'Step X must be finished before step L can begin.',
'Step X must be finished before step J can begin.',
'Step W must be finished before step P can begin.',
'Step U must be finished before step B can begin.',
'Step P must be finished before step V can begin.',
'Step O must be finished before step P can begin.',
'Step W must be finished before step Q can begin.',
'Step S must be finished before step Q can begin.',
'Step U must be finished before step Z can begin.',
'Step Z must be finished before step T can begin.',
'Step M must be finished before step T can begin.',
'Step A must be finished before step P can begin.',
'Step Z must be finished before step B can begin.',
'Step N must be finished before step S can begin.',
'Step H must be finished before step N can begin.',
'Step J must be finished before step E can begin.',
'Step M must be finished before step J can begin.',
'Step R must be finished before step A can begin.',
'Step A must be finished before step Y can begin.',
'Step F must be finished before step V can begin.',
'Step L must be finished before step P can begin.',
'Step K must be finished before step L can begin.',
'Step F must be finished before step P can begin.',
'Step G must be finished before step L can begin.',
'Step I must be finished before step Q can begin.',
'Step C must be finished before step L can begin.',
'Step I must be finished before step Y can begin.',
'Step G must be finished before step B can begin.',
'Step H must be finished before step L can begin.',
'Step X must be finished before step U can begin.',
'Step I must be finished before step K can begin.',
'Step R must be finished before step N can begin.',
'Step I must be finished before step L can begin.',
'Step M must be finished before step I can begin.',
'Step K must be finished before step V can begin.',
'Step G must be finished before step E can begin.',
'Step F must be finished before step B can begin.',
'Step O must be finished before step Y can begin.',
'Step Y must be finished before step Q can begin.',
'Step F must be finished before step K can begin.',
'Step N must be finished before step W can begin.',
'Step O must be finished before step R can begin.',
'Step N must be finished before step E can begin.',
'Step M must be finished before step V can begin.',
'Step H must be finished before step T can begin.',
'Step Y must be finished before step T can begin.',
'Step F must be finished before step J can begin.',
'Step F must be finished before step O can begin.',
'Step W must be finished before step B can begin.',
'Step T must be finished before step E can begin.',
'Step T must be finished before step P can begin.',
'Step F must be finished before step M can begin.',
'Step U must be finished before step I can begin.',
'Step H must be finished before step S can begin.',
'Step S must be finished before step P can begin.',
'Step T must be finished before step W can begin.',
'Step A must be finished before step N can begin.',
'Step O must be finished before step N can begin.',
'Step L must be finished before step B can begin.',
'Step U must be finished before step K can begin.',
'Step Z must be finished before step W can begin.',
'Step X must be finished before step D can begin.',
'Step Z must be finished before step L can begin.',
'Step I must be finished before step T can begin.',
'Step O must be finished before step W can begin.',
'Step I must be finished before step B can begin.']

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

const buildStepDepedencies = (input, alphabet) => {
    let steps = []
    for (let i = 0; i < alphabet.length; i++) {
        steps[i] = { completed: false, asigned: false, dependencies: [] }
    }
    for (let i = 0; i < input.length; i++) {
        let step = alphabet.indexOf(input[i][36])
        let dependency = alphabet.indexOf(input[i][5])
        steps[step].dependencies.push(dependency)
    }
    return steps
}

const getNextStep = (stepDependencies) => {
    let nextStep = Number.MAX_SAFE_INTEGER
    for (let i = 0; i < stepDependencies.length; i++) {
        if (!stepDependencies[i].completed) {
            let pendingDependencies = 0
            for (let j = 0; j < stepDependencies[i].dependencies.length; j++) {
                if (!stepDependencies[stepDependencies[i].dependencies[j]].completed) {
                    pendingDependencies++
                }
            }
            if (pendingDependencies === 0 && i < nextStep)
                nextStep = i
        }
    }
    return nextStep
}

const orderSteps = input => {
    let stepDependencies = buildStepDepedencies(input, alphabet)
    let orderedSteps = ''
    for (let i = 0; i < alphabet.length; i++) {
        let nextStep = getNextStep(stepDependencies)
        stepDependencies[nextStep].completed = true
        orderedSteps += alphabet[nextStep]
    }
    return orderedSteps
}

console.log('7-1 solution: ', orderSteps(input))

module.exports = {
    input,
    alphabet,
    buildStepDepedencies,
    getNextStep,
    orderSteps
}