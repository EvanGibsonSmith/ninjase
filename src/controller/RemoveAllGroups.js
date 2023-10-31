function inBlock(locations) { // TODO have to make sure within bounds. (Add some error catch)
    if (locations.length!=4) {return false} // this occurs when a group has already been removed 
    let topLeft = locations[0] // if in a block this should be top left based on search TODO (bit tricky and jank?)
    if (locations[1][0]!==topLeft[0]+1 || locations[1][1]!==topLeft[1]) {return false} // check that second block is there (going left to right then top to bottom)
    if (locations[2][0]!==topLeft[0] || locations[2][1]!==topLeft[1]+1) {return false}
    if (locations[3][0]!==topLeft[0]+1 || locations[3][1]!==topLeft[1]+1) {return false}
    return true
}

function updateVictory(model) {
    let victoryFlag = true;
    model.puzzle.cells.forEach(cellGroup => {
        cellGroup.forEach(singleCell => {
            if (singleCell.color!="white") {
                victoryFlag=false
            }
        })
    })
    model.victory=victoryFlag 
}

export function removeAllGroups(model) {
    if (model.puzzle.victory==true) {return false}

    let groupRemovedFlag = false
    let groupRemovalResults = []
    model.puzzle.colors.forEach(color => {groupRemovalResults.push(removeGroup(model, color))})
    if (groupRemovalResults.some(item=>{return item==true})) {
        ++model.numMoves
        groupRemovedFlag = true // so we can see if group was removed for solver
    } // if any group was removed add to move counter
    updateVictory(model) // check if we are now done TODO add potential game freeze here too?
    return groupRemovedFlag
}

function removeGroup(model, color) { 
    
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
    let isBlock = inBlock(coloredCellLocations) // TODO isBLock hasn't been fully tested!!!!! also is not defensively programmed

    // now we know they must be in a block. Remove them (change them to blank squares)
    if (isBlock) {
        coloredCellLocations.forEach(colorCell => {
            puzzle.cells[colorCell[0]][colorCell[1]].color = "white" // TODO change to white later when border is added
            // if you want each group to be a move when removed, even if together put ++model.numMoves here instead of in removeAllGroups
        })
        model.score += 4 // add to score if sucessful TODO should this be handled here? I suppose so
        return true
    }
    return false
}