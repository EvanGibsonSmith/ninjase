import { Cell } from "./Cell"
import { NinjaSe } from "./Ninjase"


export class Puzzle {
    constructor(config) {
        this.initialize(config)
    }

    initialize(config) {
        this.config = config
        this.name = config.name
        this.numColumns = parseInt(config.numColumns)
        this.numRows = parseInt(config.numRows)

        this.cells = []
        let init = config.initial
        let locationToColor = {} // will contain location to color for all non blank cells

        // TODO I do not like this but whatever, I suppose
        // getting into form that is easier to interate through and get color
        init.forEach(element => {
            let numericalColumn = element.column.toLowerCase().charCodeAt(0) - 96  // TODO this seems jank Gives 
            locationToColor[[element.row-1, numericalColumn-1]] = element.color // The minus one makes top left 0,0 to line up with array
        })

        this.colors = new Set() // set that will add new colors seen in cells
        for (let r = 0; r < this.numRows; r++) { // TODO put no cells where ninjase is?
            this.cells[r] = []; 
            for (let c = 0; c < this.numColumns; c++) {
                if ([r, c] in locationToColor){ 
                    this.cells[r][c] = new Cell(r, c, locationToColor[[r, c]]) 
                    this.colors.add(locationToColor[[r, c]])
                }
                else { // if it is not it dictionary it is a white square
                    this.cells[r][c] = new Cell(r, c, "white") // TODO fix this 
                }
            }
        }

        // TODO put ninjase on top of the cells? Odd. ok. Cells where ninjase is? Accpetable? Maybe.
        const ninjaseColumn = config.ninjaColumn.toLowerCase().charCodeAt(0) - 96
        this.ninjase = new NinjaSe(this.config.ninjaRow-1, ninjaseColumn-1) // -1 to get into zero indexed form (as done in locationToColor)
    }

    copy() {
        let copyPuzzle = new Puzzle(this.config)
        // config, names, rows and columns are already in config
        copyPuzzle.cells = []
        this.cells.forEach(cellRow => {// deep copy the cells
            let copyPuzzleRow = []
            cellRow.forEach(cell => {
                copyPuzzleRow.push(cell.copy())
            })
            copyPuzzle.cells.push(copyPuzzleRow)
        })
        copyPuzzle.ninjase = this.ninjase.copy()

        return copyPuzzle
    }
}
