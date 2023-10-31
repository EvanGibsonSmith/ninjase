import { Puzzle } from "../model/Puzzle"

export function resetPuzzle(model) { 
    model.puzzle = new Puzzle(model.puzzle.config)
    model.numMoves = 0
    model.score = 0
    model.victory = false
}