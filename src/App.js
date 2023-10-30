import React from 'react';
import { config_4x4, config_5x5, config_6x6 } from './model/Model.js'
import { redrawCanvas} from './boundary/Boundary.js'
import { Model, Puzzle } from './model/Model.js'
import { moveNinjase, removeAllGroups, resetPuzzle } from './controller/Controller.js'
import { solve } from './controller/Solver.js';

// you might try this quick and dirty way to position buttons where you want (and other elements)
const upbutton = {
  position: "absolute",
  left: 1000,
  top: 80,
}

const leftbutton = {
  position: "absolute",
  left: 950,
  top: 100,
}

const rightbutton = {
  position: "absolute",
  left: 1050,
  top: 100,
}

const downbutton = {
  position: "absolute",
  left: 993,
  top: 100,
}

const groupremovebutton= {
  position: "absolute",
  left: 1000,
  top: 10,
}

const resetpuzzlebutton= {
  position: "absolute",
  left: 900,
  top: 10,
}

const movecount= {
  position: "absolute",
  left: 700,
  top: 10,
}

const scorecount= {
  position: "absolute",
  left: 900,
  top: 10,
}

const configurationname= {
  position: "absolute",
  left: 10,
  top: 500,
}

const victoryMessage= {
  position: "absolute",
  left: 1000,
  top: 200,
}

const solvepuzzle= {
  position: "absolute",
  left: 1200,
  top: 200,
}





function App() {
  const [model, setModel] = React.useState(new Model(new Puzzle(config_5x5))); // TODO is this allowed for the assignment?
  const [redraw, forceRedraw] = React.useState(0);       // used to conveniently request redraw after model change
  const canvasRef = React.useRef(null);   // need to be able to refer to Canvas

  /** Ensures initial rendering is performed, and that whenever model changes, it is re-rendered. */
  React.useEffect (() => {

    redrawCanvas(model, canvasRef.current)
  }, [model, redraw])   // arguments that determine when to refresh

  // TODO these feel silly. Maybe some higher order later?
  const handleResetClick = e => {
    resetPuzzle(model)
    forceRedraw(redraw+1)
  }
  
  const handleUpClick = e => {
    moveNinjase(model, 0)
    forceRedraw(redraw+1) // TODO does nothing
  }

  const handleLeftClick = e => {
    moveNinjase(model, 1)
    forceRedraw(redraw+1) // TODO does nothing
  }

  const handleDownClick = e => {
    moveNinjase(model, 2)
    forceRedraw(redraw+1) // TODO does nothing
  }

  const handleRightClick = e => {
    moveNinjase(model, 3)
    forceRedraw(redraw+1) // TODO does nothing
  }

  const handleGroupRemove = e => {
    removeAllGroups(model) // FIX THE COLORS BEING PASSED, make it remove all groups for now?
    forceRedraw(redraw+1)
  }

  const solvePuzzle = async e => { // TODO fix me later
    let modelSolutions = solve(model)

    let count = 0;    
    let result = modelSolutions.next()
    while (!result.done) {
      setModel(result.value);
      result = modelSolutions.next()
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1-second delay
      count++;
    } 
  }

  return (
    <main>
      <canvas tabIndex="1"  
        className="App-canvas"
        ref={canvasRef}
        width  = "800" // TODO make these not hardcoded later? (layout.canvas.width and layour.canvas.height)
        height = "800" />

      <button style={upbutton} onClick={handleUpClick}>up</button> 
      <button style={leftbutton} onClick={handleLeftClick}>left</button>
      <button style={rightbutton} onClick={handleRightClick}>right</button>
      <button style={downbutton} onClick={handleDownClick}>down</button>
      <button style={groupremovebutton} onClick={handleGroupRemove}>Remove groups</button>
      <button style={resetpuzzlebutton} onClick={handleResetClick}>Reset Puzzle</button>
      <button style={solvepuzzle} onClick={solvePuzzle}>Solve Puzzle</button>
      {model.victory ? (<p style={victoryMessage}>Victory!</p>): null}
      <p style={movecount}> Move Count: {model.numMoves}</p>
      <p style={scorecount}> Score: {model.score}</p>
      <p style={configurationname}>{model.puzzle.config.name}</p>
    </main>
  );
}

export default App;
