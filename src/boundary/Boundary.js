// redraw the Puzzle so I can see it

// Scaling Constants for Canvas
var BOXSIZE = 100;
const OFFSET = 8;

/** Represents a rectangle. */
export class Square {
    constructor(x, y, size) {
      this.x = x
      this.y = y
      this.size = size
    }
}

export function computeSquare(cell) {
    return new Square(BOXSIZE*cell.column + OFFSET, BOXSIZE*cell.row + OFFSET, BOXSIZE - 2*OFFSET, BOXSIZE-2*OFFSET)
}



/** Redraws the puzzle GUI portion of the model */
export function drawPuzzle(puzzle, canvasObj) {
    const ctx = canvasObj.getContext('2d');
    ctx.clearRect( 0,0, canvasObj.width, canvasObj.height);  
   
    // showing the outermost information
    let nr = puzzle.numRows
    let nc = puzzle.numColumns

    for (let r = 0; r < nr; r++) {
        for (let c = 0; c < nc; c++) {
            let cell = puzzle.cells[r][c]
            let sq = computeSquare(cell)

            // HERE is where you draw everything about this cell that you know about...
            ctx.beginPath()
            ctx.fillStyle = cell.color
            ctx.fillRect(sq.x, sq.y, sq.size, sq.size)
            ctx.stroke()
        }
    }
}

/** Redraw entire canvas from model. */
export function redrawCanvas(model, canvasObj) {
    // TODO add the other updating stuff?

    drawPuzzle(model.puzzle, canvasObj)
}
