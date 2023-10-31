// redraw the Puzzle so I can see it

import { Cell } from "../model/Cell";
import ninjaseImage from '../resources/ninjase.svg'
import robotNinjaseImage from'../resources/RobotNinjase.svg'

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


export function computeSquareCell(cell) {
    return new Square(BOXSIZE*cell.column + OFFSET, BOXSIZE*cell.row + OFFSET, BOXSIZE - 2*OFFSET)
}


export function computeSquareNinjase(ninjase) {
    return new Square(BOXSIZE*ninjase.column + OFFSET, BOXSIZE*ninjase.row + OFFSET, 2*BOXSIZE - 2*OFFSET)
}


/** Redraws the puzzle GUI portion of the model */
export function drawPuzzle(puzzle, canvasObj) {
    const ctx = canvasObj.getContext('2d');
    ctx.clearRect( 0,0, canvasObj.width, canvasObj.height);  
   
    // showing the outermost information
    let nr = puzzle.numRows
    let nc = puzzle.numColumns

    // draw cells
    for (let r = 0; r < nr; r++) { 
        for (let c = 0; c < nc; c++) {
            let cell = puzzle.cells[r][c]
            let sq = computeSquareCell(cell)
            // HERE is where you draw everything about this cell that you know about...
            ctx.beginPath()
            ctx.fillStyle = "black"
            ctx.fillRect(sq.x-OFFSET, sq.y-OFFSET, sq.size+OFFSET*2, sq.size+OFFSET*2) // TODO putting border with OFFSET bad practice, probably not?
            ctx.fillStyle = cell.color
            ctx.fillRect(sq.x, sq.y, sq.size, sq.size) // fill actual color on top
            ctx.stroke()
        }
    }

    // draw ninjase on top of these cells TODO this is probably fine right?
    let ninjasq = computeSquareNinjase(puzzle.ninjase)

    
    // Create an Image object to load the SVG
    const img = new Image()

    // Set the source of the Image object to your SVG file

    // Once the SVG is loaded, draw it on the canvas
    img.src = ninjaseImage // TODO robot doesn't load fast might need to do it manually // TODO adding skins could be fun. and level designer.

    img.onload = function () {
        ctx.drawImage(img, ninjasq.x, ninjasq.y, ninjasq.size, ninjasq.size)
    };

    ctx.beginPath() // TODO make this a cute little ninja later
    ctx.fillStyle = "lime" // green because obviously that's the ninja color
    ctx.fillRect(ninjasq.x, ninjasq.y, ninjasq.size, ninjasq.size)
    ctx.stroke()

}

/** Redraw entire canvas from model. */
export function redrawCanvas(model, canvasObj) {
    // TODO add the other updating stuff?
    drawPuzzle(model.puzzle, canvasObj)
}
