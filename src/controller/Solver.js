import { removeAllGroups, moveNinjase, validDirections } from "./Controller"

function* retracePath(state, parents) {
    console.log("BFS FOUND")
    let solution = []
    while (state!=null) {
        solution.push(state)
        state = parents.get(state)
    }
    
    // reverse solution for iterable
    solution.reverse();
    for (const modelState of solution) {yield modelState}

}

export function solve(model) { // TODO note this implementation doesn't always remove a block if possible. Add the actual solution path with "from pointer"
    let queue = []
    let parents = new Map()
    let initCopy = model.copy()
    queue.push(initCopy)
    parents.set(initCopy, null)
    let modelState = null
    while (queue.length!=0) {
        modelState = queue.shift()
        if (Object.keys(parents).includes(modelState)) { // if already visited
            continue
        }
        if (modelState.victory==true) {
            return retracePath(modelState, parents)
        }

        let groupModelCopy = modelState.copy()
        if (removeAllGroups(groupModelCopy)==true) { // if removing a group was actually successful, it counts as a move
            queue.push(groupModelCopy)
            parents.set(groupModelCopy, modelState)
        }

        for (let direction=0; direction<4; ++direction) {
            let modelCopy = modelState.copy()
            if (validDirections(modelCopy).includes(direction)) {
                moveNinjase(modelCopy, direction)
                queue.push(modelCopy)
                parents.set(modelCopy, modelState)
            }
        }
    }
    return "No Path"
}
