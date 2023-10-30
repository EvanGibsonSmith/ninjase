
export const config_5x5 = {
    "name": "Configuration #1",
    "numRows" : "5",
    "numColumns" : "5",
    "ninjaRow" : "4",
    "ninjaColumn": "D",
    "initial" : [
        { "color" : "red", "row": "1", "column" : "D" },
        { "color" : "red", "row": "1", "column" : "E" },
        { "color" : "red", "row": "3", "column" : "D" },
        { "color" : "red", "row": "3", "column" : "E" },
      
        { "color" : "orange", "row": "2", "column" : "A" },
        { "color" : "orange", "row": "2", "column" : "C" },
        { "color" : "orange", "row": "3", "column" : "A" },
        { "color" : "orange", "row": "3", "column" : "C" },
  
        { "color" : "blue", "row": "4", "column" : "A" },
        { "color" : "blue", "row": "4", "column" : "C" },
        { "color" : "blue", "row": "5", "column" : "A" },
        { "color" : "blue", "row": "5", "column" : "C" }
    ]
  }
  
export const config_4x4 = {
"name": "Configuration #2",
"numRows" : "4",
"numColumns" : "4",
"ninjaRow" : "2",
"ninjaColumn": "B",
"initial" : [
    { "color" : "red", "row": "1", "column" : "C" },
    { "color" : "red", "row": "2", "column" : "D" },
    { "color" : "red", "row": "3", "column" : "A" },
    { "color" : "red", "row": "4", "column" : "C" } 
]
}

export const config_6x6 = {
"name": "Configuration #3",
"numRows" : "6",
"numColumns" : "6",
"ninjaRow" : "1",
"ninjaColumn": "C",
"initial" : [
    { "color" : "red", "row": "1", "column" : "E" },
    { "color" : "red", "row": "4", "column" : "A" },
    { "color" : "red", "row": "5", "column" : "A" },
    { "color" : "red", "row": "5", "column" : "D" },

    { "color" : "orange", "row": "1", "column" : "B" },
    { "color" : "orange", "row": "2", "column" : "B" },
    { "color" : "orange", "row": "5", "column" : "E" },
    { "color" : "orange", "row": "6", "column" : "E" },

    { "color" : "yellow", "row": "1", "column" : "F" },
    { "color" : "yellow", "row": "2", "column" : "E" },
    { "color" : "yellow", "row": "3", "column" : "D" },
    { "color" : "yellow", "row": "4", "column" : "C" },
    
    { "color" : "brown", "row": "2", "column" : "A" },
    { "color" : "brown", "row": "3", "column" : "A" },
    { "color" : "brown", "row": "3", "column" : "B" },
    { "color" : "brown", "row": "4", "column" : "B" },

    { "color" : "gray", "row": "2", "column" : "F" },
    { "color" : "gray", "row": "3", "column" : "C" },
    { "color" : "gray", "row": "3", "column" : "E" },
    { "color" : "gray", "row": "4", "column" : "E" },

    { "color" : "green", "row": "3", "column" : "F" },
    { "color" : "green", "row": "4", "column" : "F" },
    { "color" : "green", "row": "5", "column" : "F" },
    { "color" : "green", "row": "6", "column" : "F" },

    { "color" : "purple", "row": "6", "column" : "A" },
    { "color" : "purple", "row": "6", "column" : "B" },
    { "color" : "purple", "row": "6", "column" : "C" },
    { "color" : "purple", "row": "6", "column" : "D" },

    { "color" : "blue", "row": "1", "column" : "A" },
    { "color" : "blue", "row": "4", "column" : "D" },
    { "color" : "blue", "row": "5", "column" : "B" },
    { "color" : "blue", "row": "5", "column" : "C" }
]
}


// not using now..
export class Cell {
    constructor(r, c, color) {
        this.row = r
        this.column = c
        this.color = color
    }

    copy() {
        return new Cell(this.row, this.column, this.color)
    }
}

export class NinjaSe {
    constructor(r, c) {
        this.row = r
        this.column = c
    }

    copy() {
        return new NinjaSe(this.row, this.column)
    }
}

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

// Model knows the level (you need 3). Knows the Puzzle
export class Model {
    constructor(puzzle) { // TODO use a initialize function and put that within constructor?
        this.puzzle = puzzle // TODO makes more sense for puzzle to be an object passed in constructor that config passed?
        this.numMoves = 0
        this.score = 0 
        this.victory = false
    }

    copy() {
        let modelCopy = new Model(this.puzzle.copy())
        modelCopy.numMoves = this.numMoves
        modelCopy.score = this.score
        modelCopy.victory = this.victory
        return modelCopy
    }
}
