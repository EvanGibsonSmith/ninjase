import { Model, Puzzle } from "../model/Model.js"


export function chooseConfiguration(model) {
    //TODO (probably nearing the end)
} 

export function resetPuzzle(model) { // TODO need to make a new model for each 
    console.log("RESETTING PUZZLE") // TODO REMOVEME LATER Add controller tests??
    return new Model(new Puzzle(model.puzzle.config))//TODO feels wrong doing it this way
    // below is probably better
    //let newPuzzle = new Puzzle(model.puzzle.config) // TODO should trigger refresh? no copy method?
    //model.puzzle = newPuzzle
    //model.copy() // TODO use copy? yuck
}


export function moveNinjase() {
    // TODO NEED TO MAKE NINJASE WORK
}


// TODO document functions better?
function inBlock(locations) { // TODO have to make sure within bounds. (Add some error catch)
    let topLeft = locations[0] // if in a block this should be top left based on search TODO (bit tricky and jank?)
    if (locations[1]!=[topLeft[0]+1, topLeft[0]]) {return} // check that second block is there (going left to right then top to bottom)
    if (locations[2]!=[topLeft[0], topLeft[0]+1]) {return}
    if (locations[3]!=[topLeft[0]+1, topLeft[0]+1]) {return}
}

export function removeGroup(model, color) {
    // check there is a group of this color
    let coloredCellLocations = []
    let puzzle = model.puzzle
    for (let c=0; c<puzzle.numRows; ++c) { // TODO use _.where to get condition?
        for (let r=0; r<puzzle.numColumns; ++r) {
            if ((puzzle.cells[r][c].color) == color) {
                coloredCellLocations.push([r, c])
            }
        }
    }

    //if (coloredCellLocations.length!=4) { // if color already removed, not good. TODO maybe unneeded defensive programming?
    //    return 
    //}
    
    // check if they are in a block
    let isBlock = inBlock(coloredCellLocations) // TODO isBLock hasn't been fully tested!!!!! also is not defensively programmed

    // now we know they must be in a block. Remove them (change them to blank squares)
    if (isBlock) {
        coloredCellLocations.forEach(colorCell => {
            puzzle.cells[colorCell[0]][colorCell[1]].color = "gray" // TODO change to white later when border is added
        })
    }

    // copy model? TODO should be method 
    return new Model(model.puzzle) // TODO feels wrong to do it this way. This way just resets the model without a new puzzle object
    // TODO this is wrong just for testing

}


export function 
