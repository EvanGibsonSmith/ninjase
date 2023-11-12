# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Naturally, this can be run with "npm start" within the terminal

# Dependencies
React is required, including Routes for the project to run. This is because the project currently has two pages. One of these pages is to play puzzles while the other page is to make puzzles. The make puzzles page is not complete but is still present.

# Brief Description
This is a simple game created for Software Engineering CS3733. The game works by controlling a main character, "ninjase" who can push blocks
around. Ninjase can push groups of blocks around the edges of the screen, but ninjase cannot loop around the edges of the screen. After a set of colored blocks are in a 2x2 block, they can be removed. The "remove groups" button removes all 2x2 blocks that can removed. Each turn, a score is added based on the number of blocks ninjase pushed (note this is not just the blocks ninjase directly interacted with, but all the blocks those pushed in turn as well). After all blocks are removed, the game is over and a new puzzle configuration can be selected.

# Additional Features
The game has some additional features, including key inputs, a BFS solver ("solve puzzle shortest"), modified BFS solver ("solve puzzle"), and timer. The WASD and arrow keys work along with the buttons on the GUI. If the key inputs are not working, click on the canvas of the puzzle, and then they should work. This is because the key listeners are bound to the canvas and not the window. The BFS solver simply uses BFS to find the fastest solution. The modified BFS solver uses "checkpoints" to get to a better state. This variation uses BFS to remove a block of squares. As soon as a block of square removal is found, that is a checkpoint, and no other possibilities are checked. So, the solution gurantees that it will find the fastest block removal for each block of 2x2 along the way to the solution, but may not find the overall optimal solution. Note neither of these work on the 6x6 because of the computational expense. The timer is simply displayed after the puzzle is complete. It runs as soon as a move is made, but does not run for the automatic solver that runs when using one of the solvers (BFS or modified BFS), and will display 0s in that case.

# Bugs/Improvements
Timer has a bug when occasionally when playing the game it will "get stuck" on a specific time and always display that time for subsequent games.
This does not always happen when starting another game.

Timer could be improved by being disabled when you use a solver rather than displaying 0s

The GUI for the puzzles is awkward, mostly because of the absolute spacing used. Because of this, on small puzzles, the buttons are very far out. Otherwise, on the large puzzles they would be within the puzzle. The border also has irregular spacing on the edges.
