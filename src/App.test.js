import { render, screen } from '@testing-library/react';
import App from './App';
import { Model } from './model/Model';

test("Testing that I know how to test", () => {expect(6).toBe(6)}); // TODO testing that testing works

// testing configuration works
test("config 4x4 should have 4 columns", () => {expect(new Model(config_4x4).puzzle.numRows).toBe(4)});
test("config 4x4 should have 4 rows", () => {expect(new Model(config_4x4).puzzle.numColumns).toBe(4)});

test("config 5x5 should have 5 columns", () => {expect(new Model(config_5x5).puzzle.numRows).toBe(5)});
test("config 5x5 should have 5 rows", () => {expect(new Model(config_5x5).puzzle.numColumns).toBe(5)});


// testing the locations of stuff
test("config 4x4 has red cell at row 1, column C", () => {expect(new Model(config_4x4).puzzle.cells[1][3].color).toBe("red")});
test("config 4x4 has blank cell at row 2, column A", () => {expect(new Model(config_4x4).puzzle.cells[2][1].color).toBe("white")});

test("config 4x4 has red cell at row 3, column B", () => {expect(new Model(config_5x5).puzzle.cells[3][2].color).toBe("white")});
test("config 4x4 has blank cell at row 4, column C", () => {expect(new Model(config_5x5).puzzle.cells[4][3].color).toBe("blue")});
test("config 4x4 has blank cell at row 2, column A", () => {expect(new Model(config_5x5).puzzle.cells[2][1].color).toBe("orange")});


