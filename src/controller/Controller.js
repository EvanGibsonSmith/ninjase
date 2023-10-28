import { Model, Puzzle } from "../model/Model.js"


export function chooseConfiguration(model, configuration) { // TODO what is the entry condition? Can we be in the middle of another puzzle?
    //TODO (probably nearing the end). Need boundary dropdown?
    let newModel = new Model(new Puzzle(configuration)) // TODO DRY?
    newModel.numMoves = model.numMoves
    newModel.score = model.score
    newModel.victory = model.victory

    return newModel
} 

export function resetPuzzle(model) { // TODO need to make a new model for each :(
    model.puzzle = new Puzzle(model.puzzle.config) //TODO feels wrong doing it this way TODO DRY
    model.numMoves = 0
    model.score = 0
    model.victory = false
}

// TODO better way to put these helpers in?
function validDirections(model) {// TODO doesn't work
    let directions = []
    let ninja = model.puzzle.ninjase
    if (ninja.row!=0) {directions.push(0)} // TODO use ints for direction?
    if (ninja.column!=0) {directions.push(1)}
    if (ninja.row!=model.puzzle.numRows-1) {directions.push(2)}
    if (ninja.column!=model.puzzle.numColumns-1) {directions.push(3)} // integers go clockwise 0, 1, 2, 3 around

    return directions
}

// TODO document loc is row or column increment is if we increment of decrement to cycle
function pushRowCol(puzzle, r, c, isIncrement, isRow) { // nr and nc are start cell location to cycle around

    let currColor = puzzle.cells[r][c].color // starting push block, right below ninjase on left
    // make this color white because it will be under ninjase TODO good approach?
    puzzle.cells[r][c].color = 'white'
    while (currColor!='white') { // TODO note this is stupid way to check for blank or for ninjase. // TODO at some point make color not "white" but actually blank instead of relying on a visual thing
        // get informtation about next cells color before overriding it
        if (isIncrement && isRow) {r = (r + 1) % puzzle.numRows} 
        else if (isIncrement && !isRow) {c = (c + 1) % puzzle.numColumns} // increment around
        else if (!isIncrement && isRow) {r = (r + (puzzle.numRows-1)) % puzzle.numRows} // increment down by adding amount
        else if (!isIncrement && !isRow) {c = (c + (puzzle.numColumns-1)) % puzzle.numColumns} // increment down by adding amount

        let nextColor = puzzle.cells[r][c].color // get next color before overriding it with currColor 
        puzzle.cells[r][c].color=currColor
        currColor = nextColor
        // TODO need to add edge case where it loops all the way around? However, blocks "under" ninjase should be blank so we SHOULD be ok
    }
}

function updateVictory(model) {
    model.puzzle.cells.forEach(cellGroup => {
        cellGroup.forEach(singleCell => {
            if (singleCell.color!="white") {
                model.victory=false // TODO not hard code background color?
                return
            }
        })
    })
    model.victory=true
}

export function moveNinjase(model, direction) {
    if (!validDirections(model).includes(direction)) {return}

    let puzzle = model.puzzle
    let startR = puzzle.ninjase.row // short names to make code block below readable TODO good idea?
    let startC = puzzle.ninjase.column
    // figure out which blocks to push. TODO
    switch(direction) {
        case 0:
            startR-=1 // to start above ninja
            pushRowCol(puzzle, startR, startC, false, true) // nr and nc are inital position to cycle around
            ++startC // go to second column to push around'
            pushRowCol(puzzle, startR, startC, false, true)

            // move ninjase itself
            puzzle.ninjase.row -= 1
            break

        case 1:
            startC-=1 // to start left of ninja
            pushRowCol(puzzle, startR, startC, false, false) // nr and nc are inital position to cycle around
            ++startR // go to second row to push around'
            pushRowCol(puzzle, startR, startC, false, false) 

            // move ninjase itself
            puzzle.ninjase.column -= 1
            break
            
        case 2:
            startR+=2 // to start below ninja
            pushRowCol(puzzle, startR, startC, true, true) // nr and nc are inital position to cycle around
            ++startC // go to second column to push around'
            pushRowCol(puzzle, startR, startC, true, true)

            // move ninjase itself
            puzzle.ninjase.row += 1
            break

        case 3:
            startC+=2 // to start right of ninja ninja
            pushRowCol(puzzle, startR, startC, true, false) // nr and nc are inital position to cycle around
            ++startR // go to second row to push around'
            pushRowCol(puzzle, startR, startC, true, false)

            // move ninjase itself
            puzzle.ninjase.column += 1
            break
        }

        // TODO Should this logic be elsewhere? This function is a bit bloated
        ++model.numMoves
        updateVictory(model)
        if (model.victory=true) {
            //freeze(model) TODO
            document.getElementById("victoryMessage").disabled = false
        }
}


// TODO document functions better?  Add a test case here because this didn't work initally
function inBlock(locations) { // TODO have to make sure within bounds. (Add some error catch)
    if (locations.length!=4) {return false} // this occurs when a group has already been removed 
    let topLeft = locations[0] // if in a block this should be top left based on search TODO (bit tricky and jank?)
    if (locations[1][0]!==topLeft[0]+1 || locations[1][1]!==topLeft[1]) {return false} // check that second block is there (going left to right then top to bottom)
    if (locations[2][0]!==topLeft[0] || locations[2][1]!==topLeft[1]+1) {return false}
    if (locations[3][0]!==topLeft[0]+1 || locations[3][1]!==topLeft[1]+1) {return false}
    return true
}

export function removeAllGroups(model) {
    let groupRemovalResults = []
    model.puzzle.colors.forEach(color => {groupRemovalResults.push(removeGroup(model, color))})
    console.log(groupRemovalResults, groupRemovalResults.some(item=>{return item==true}))
    if (groupRemovalResults.some(item=>{return item==true})) {++model.numMoves} // if any group was removed add to move counter
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
            puzzle.cells[colorCell[0]][colorCell[1]].color = "white" // TODO change to white later when border is added
            // if you want each group to be a move when removed, even if together put ++model.numMoves here instead of in removeAllGroups
        })
        return true
    }
    return false
}


export function completePuzzle(model) { 
    let puzzle = model.puzzle
    for (let c=0; c<puzzle.numRows; ++c) { // TODO use _.where to get condition?
        for (let r=0; r<puzzle.numColumns; ++r) {
            if ((puzzle.cells[r][c].color) != "white") {
                return // TODO he advised against this early model returning, but why?
            }
        }
    }
}
