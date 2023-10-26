import { Model } from './model/Model.js'

export function resetPuzzle(model) { // TODO need to make a new model for each 
    console.log("RESETTING PUZZLE") // TODO REMOVEME LATER Add controller tests??
    let newModel = new Model(model.)
    
}


export function moveNinjase() {
    // TODO NEED TO MAKE NINJASE WORK
}

// TODO document
function inBlock(locations) {
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
    
    // check if they are in a block
    let isBlock = inBlock(coloredCellLocations)
    //if (!isBlock) {return} TODOTEST removing this for testing

    console.log("In a block")
    // now we know they must be in a block. Remove them (change them to blank squares)
    coloredCellLocations.forEach(colorCell => {
        console.log("yes?")
        colorCell.color = "gray" // TODO change to white later when border is added
    })

    // TODO this is wrong just for testing

}
