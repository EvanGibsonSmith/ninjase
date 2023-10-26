
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
}

export class Puzzle {
    constructor(config) {
        this.numColumns = parseInt(config.numColumns)
        this.numRows = parseInt(config.numRows)

        // this is where you would create the nr x nc Cell objects that you need.
        // OPTION 1: Create what looks like a 2D array this.cells[R][C]
        this.cells = []
        let init = config.initial
        let locationToColor = {} // will contain location to color for all non blank cells

        // TODO I do not like this but whatever, I suppose

        // getting into form that is easier to interate through and get color
        init.forEach(element => {
            let numericalColumn = element.column.toLowerCase().charCodeAt(0) - 96  // TODO this seems jank Gives 
            locationToColor[[element.row, numericalColumn]] = element.color
        });

        for (let r = 0; r < this.numRows; r++) { 
            this.cells[r] = []; 
            for (let c = 0; c < this.numColumns; c++) {
                if ([r, c] in locationToColor){ 
                    this.cells[r][c] = new Cell(r, c, locationToColor[[r, c]])
                }
                else { // if it is not it dictionary it is a white square
                    this.cells[r][c] = new Cell(r, c, "white") // TODO fix this 
                }
            }
        }
    }
}

// Model knows the level (you need 3). Knows the Puzzle
export class Model {
    constructor(config) { // TODO use a initialize function and put that within constructor?
        this.puzzle = new Puzzle(config) // TODO puzzle isn't passed any information about the colors on the board?
        this.numMoves = 0
    }
}
