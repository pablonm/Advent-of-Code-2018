const { input, alphabet, buildStepDepedencies } = require("./7-1.js");

const getNextUnasignedStep = (stepDependencies) => {
    let nextStep = Number.MAX_SAFE_INTEGER
    for (let i = 0; i < stepDependencies.length; i++) {
        if (!stepDependencies[i].asigned) {
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
    return (nextStep < Number.MAX_SAFE_INTEGER) ? nextStep : null
}

const getIdleWorker = (workers) => {
    let worker = workers.indexOf(workers.find(w => w.workingOn === null))
    return (worker !== -1) ? worker : null
}

const workTick = () => {
    return workers.map(w => {
        if (w.secondsLeft > 0) {
            return {
                ...w,
                secondsLeft: w.secondsLeft - 1
            }
        }
        return w
    })
}

const pendingWork = () => {
    return stepDependencies.filter(s => s.completed === false).length > 0
}

const updateSteps = () => {
    for (let i = 0; i < workers.length; i++) {
        if (workers[i].secondsLeft === 0 && workers[i].workingOn !== null) {
            stepDependencies[workers[i].workingOn].completed = true
            workers[i].workingOn = null
        }
    }
}

let seconds = 0
let workers = [
    {workingOn: null, secondsLeft: 0},
    {workingOn: null, secondsLeft: 0},
    {workingOn: null, secondsLeft: 0},
    {workingOn: null, secondsLeft: 0},
    {workingOn: null, secondsLeft: 0},
]
let stepDependencies = buildStepDepedencies(input, alphabet)

while (pendingWork()) {
    updateSteps()
    let idleWorker = getIdleWorker(workers)
    let nextStep = getNextUnasignedStep(stepDependencies)
    while (idleWorker !== null && nextStep !== null) {
        workers[idleWorker] = {
            workingOn: nextStep,
            secondsLeft: nextStep + 60 + 1
        }
        stepDependencies[nextStep].asigned = true
        idleWorker = getIdleWorker(workers)
        nextStep = getNextUnasignedStep(stepDependencies)
    } 
    workers = workTick()
    if (pendingWork())
        seconds++
}

console.log('7-2 solution: ', seconds)
