// Model knows the level (you need 3). Knows the Puzzle
export class Model {
    constructor(puzzle) { // TODO use a initialize function and put that within constructor?
        this.puzzle = puzzle // TODO makes more sense for puzzle to be an object passed in constructor that config passed?
        this.numMoves = 0
        this.score = 0 
        this.victory = false
        this.timer = 0
        this.begun = false
    }

    copy() {
        let modelCopy = new Model(this.puzzle.copy())
        modelCopy.numMoves = this.numMoves
        modelCopy.score = this.score
        modelCopy.victory = this.victory
        modelCopy.timer = this.timer // not used in solved but included for completeness
        modelCopy.begun = this.begun 
        return modelCopy
    }
}
