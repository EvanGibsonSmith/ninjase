
export class NinjaSe {
    constructor(r, c) {
        this.row = r
        this.column = c
    }

    copy() {
        return new NinjaSe(this.row, this.column)
    }
}