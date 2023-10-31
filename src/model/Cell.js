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