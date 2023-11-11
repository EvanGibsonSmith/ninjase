import { timerFunction } from "./Timer"

// helpers for moveninjase
export function validDirections(model) {// TODO doesn't work
    let directions = []
    let ninja = model.puzzle.ninjase
    if (ninja.row!=0) {directions.push(0)} // TODO use ints for direction?
    if (ninja.column!=0) {directions.push(1)}
    if (ninja.row!=model.puzzle.numRows-2) {directions.push(2)} // minus 2 because we are dealing with top left of ninjase
    if (ninja.column!=model.puzzle.numColumns-2) {directions.push(3)} // integers go clockwise 0, 1, 2, 3 around

    return directions
}


// TODO document loc is row or column increment is if we increment of decrement to cycle
function pushRowCol(model, r, c, isIncrement, isRow) { // nr and nc are start cell location to cycle around

    let puzzle = model.puzzle
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
        model.score += 1 // add this color pushed to score
        // TODO need to add edge case where it loops all the way around? However, blocks "under" ninjase should be blank so we SHOULD be ok
    }
}

export function moveNinjase(model, direction) {
    if (model.begun==false) {timerFunction(model); model.begun=true} // start timer if play hasn't begun and begin play
    if (model.victory==true) {return false}
    if (!validDirections(model).includes(direction)) {return false}

    let puzzle = model.puzzle
    let startR = puzzle.ninjase.row // short names to make code block below readable TODO good idea?
    let startC = puzzle.ninjase.column
    // figure out which blocks to push. TODO
    switch(direction) {
        case 0:
            startR-=1 // to start above ninja
            pushRowCol(model, startR, startC, false, true) // nr and nc are inital position to cycle around
            ++startC // go to second column to push around'
            pushRowCol(model, startR, startC, false, true)

            // move ninjase itself
            puzzle.ninjase.row -= 1
            break

        case 1:
            startC-=1 // to start left of ninja
            pushRowCol(model, startR, startC, false, false) // nr and nc are inital position to cycle around
            ++startR // go to second row to push around'
            pushRowCol(model, startR, startC, false, false) 

            // move ninjase itself
            puzzle.ninjase.column -= 1
            break
            
        case 2:
            startR+=2 // to start below ninja
            pushRowCol(model, startR, startC, true, true) // nr and nc are inital position to cycle around
            ++startC // go to second column to push around'
            pushRowCol(model, startR, startC, true, true)

            // move ninjase itself
            puzzle.ninjase.row += 1
            break

        case 3:
            startC+=2 // to start right of ninja ninja
            pushRowCol(model, startR, startC, true, false) // nr and nc are inital position to cycle around
            ++startR // go to second row to push around'
            pushRowCol(model, startR, startC, true, false)

            // move ninjase itself
            puzzle.ninjase.column += 1
            break
        }

        // TODO Should this logic be elsewhere? This function is a bit bloated
        ++model.numMoves
        return true
}