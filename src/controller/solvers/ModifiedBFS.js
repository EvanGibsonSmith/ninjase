import { removeAllGroups } from "../RemoveAllGroups"
import { moveNinjase, validDirections} from "../MoveNinjase"

// helper for solve 
function getArray(state, parents) {
    let solution = []
    while (state!=null) {
        solution.push(state)
        state = parents.get(state)
    }
    
    // reverse solution for array
    return solution.reverse();
}

// does bfs to remove block, then keeps those moves and does another bfs from that new starting point
// checkpoint in this case is if we find a group to remove
function solve_helper(model) { // modified directly from leastMovesBFS
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
            return getArray(modelState, parents) // victory not needed as exit technically because group removal achieves victory
        }

        let groupModelCopy = modelState.copy()
        if (removeAllGroups(groupModelCopy)==true) { // if removing a group was actually successful end this bfs
            queue.push(groupModelCopy)
            parents.set(groupModelCopy, modelState)
            return getArray(groupModelCopy, parents) // reached a group removal check point so will report back to outer solve
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

export function solve(model) {
    let solution = []
    let modelCopy = model.copy()
    while (modelCopy.victory!=true) { // keep taking bfs to next group removal (checkpoint) until done
        solution = [...solution, ...solve_helper(modelCopy)] // concatenate shortest path to next group
        // now repeat with the end of that solution and move forward (the removed group)
        modelCopy = solution[solution.length-1] // new checkpoint
    }
    console.log(solution)
    return solution
}