import React from 'react';
import { config_4x4, config_5x5, config_6x6 } from './resources/puzzle-config.js';
import { redrawCanvas} from './boundary/Boundary.js'
import { Model } from './model/Model.js'
import { Puzzle } from './model/Puzzle.js';
import { moveNinjase } from './controller/MoveNinjase.js';
import { removeAllGroups } from './controller/RemoveAllGroups.js';
import { resetPuzzle } from './controller/ResetPuzzle.js';
import { chooseConfiguration } from './controller/ChooseConfiguration.js';
import { solve as solveShortest} from './controller/solvers/LeastMovesBFS.js'
import { solve } from './controller/solvers/ModifiedBFS.js'
import { handleKeyPresses } from './boundary/EventListeners.js'
import {timerFunction} from './controller/Timer.js'

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
  top: 600,
}

const victoryMessage= {
  position: "absolute",
  left: 1000,
  top: 200,
}

const solvepuzzle= {
  position: "absolute",
  left: 800,
  top: 400,
}


const timer= {
  position: "absolute",
  left: 700,
  top: 100,
}


const config4= {
  position: "absolute",
  left: 700,
  top: 500,
}

const config5= {
  position: "absolute",
  left: 800,
  top: 500,
}


const config6= {
  position: "absolute",
  left: 900,
  top: 500,
}


export function App() {
  const [model, setModel] = React.useState(new Model(new Puzzle(config_5x5))); // TODO is this allowed for the assignment?
  const [redraw, forceRedraw] = React.useState(0);       // used to conveniently request redraw after model change
  const canvasRef = React.useRef(null);   // need to be able to refer to Canvas

  /** Ensures initial rendering is performed, and that whenever model changes, it is re-rendered. */
  React.useEffect (() => {

    redrawCanvas(model, canvasRef.current)
  }, [model, redraw])   // arguments that determine when to refresh

  function chooseConfigurationUpdate(configuration) {
    setModel(chooseConfiguration(configuration))
    forceRedraw(redraw+1)
  }

  const solvePuzzleShortest = async e => { // this is just a boundary thing that needs he values from the app to set model TODO another way?
    let modelSolutions = solveShortest(model) // TODO need to have "solve mode" or something to keep track/change victory message, robot ninjase etc?

    let result = modelSolutions.next()
    while (!result.done) {
      setModel(result.value);
      result = modelSolutions.next()
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1-second delay
    } 
  }

  // TODO this can be imported
  const solvePuzzle = async e => { // this is just a boundary thing that needs he values from the app to set model TODO another way?
    let modelSolutions = solve(model) // TODO need to have "solve mode" or something to keep track/change victory message, robot ninjase etc?

    let result = modelSolutions.next()
    while (!result.done) {
      setModel(result.value);
      result = modelSolutions.next()
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1-second delay
    } 
  }

  return (
    <main>
      <canvas tabIndex="1"  
        className="App-canvas"
        ref={canvasRef}
        width  = "800" // TODO make these not hardcoded later? (layout.canvas.width and layour.canvas.height)
        height = "800" 
        onKeyDown={handleKeyPresses} />

      <button style={upbutton} onClick={e => {
        handleKeyPresses(new KeyboardEvent('w'))
        forceRedraw(redraw+1)
      }}>
        up
      </button> 
      <button style={leftbutton} onClick={e => {
        handleKeyPresses(new KeyboardEvent('a'))
        forceRedraw(redraw+1)
      }}>
        left
      </button> 
      <button style={downbutton} onClick={e => {
        handleKeyPresses(new KeyboardEvent('s'))
        forceRedraw(redraw+1)
      }}>
        down
      </button> 
      <button style={rightbutton} onClick={e => {
        handleKeyPresses(new KeyboardEvent('d'))
        forceRedraw(redraw+1)
      }}>
        right
      </button> 
      <button style={groupremovebutton} onClick={e => {
          removeAllGroups(model)
          forceRedraw(redraw+1) // TODO should this be attached to a key event?
        }}>
        Remove groups
      </button>
      <button style={resetpuzzlebutton} onClick={e => {
          resetPuzzle(model)
          forceRedraw(redraw+1) // TODO should this be attached to a key event?
      }}>
        Reset Puzzle
      </button>

      <button style={solvepuzzle} onClick={solvePuzzleShortest}>Solve Puzzle Shortest Path (Is very slow)</button>
      <button style={solvepuzzle} onClick={solvePuzzle}>Solve Puzzle</button>


      <button style={config4} onClick={() => chooseConfigurationUpdate(config_4x4)}>Config 4x4</button>
      <button style={config5} onClick={() => chooseConfigurationUpdate(config_5x5)}>Config 5x5</button>
      <button style={config6} onClick={() => chooseConfigurationUpdate(config_6x6)}>Config 6x6</button>

      {model.victory ? (<p style={victoryMessage}>Victory!</p>): null}
      <p style={movecount}> Move Count: {model.numMoves}</p>
      <p style={scorecount}> Score: {model.score}</p>
      <p style={configurationname}>{model.puzzle.config.name}</p>
      <p style={timer}>{model.timer}</p>
    </main>
  );
}

export default App;
