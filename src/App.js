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
import './App.css';
import {timerFunction} from './controller/Timer.js' 

// you might try this quick and dirty way to position buttons where you want (and other elements)

const upbutton = {
  position: "absolute",
  left: 700,
  top: 50,
}

const leftbutton = {
  position: "absolute",
  left: 650,
  top: 100,
}

const rightbutton = {
  position: "absolute",
  left: 750,
  top: 100,
}

const downbutton = {
  position: "absolute",
  left: 700,
  top: 150,
}

const groupremovebutton= {
  position: "absolute",
  left: 750,
  top: 5,
}

const resetpuzzlebutton= {
  position: "absolute",
  left: 600,
  top: 5,
}

const movecount= {
  position: "absolute",
  left: 600,
  top: 200,
}

const scorecount= {
  position: "absolute",
  left: 750,
  top: 200,
}

const configurationname= {
  position: "absolute",
  left: 620,
  top: 400,
}

const victoryMessage= {
  position: "absolute",
  left: 225,
  top: 125,
}

const solvepuzzle= {
  position: "absolute",
  left: 620,
  top: 300,
}

const solveshortestpuzzle= {
  position: "absolute",
  left: 720,
  top: 300,
}

const config4= {
  position: "absolute",
  left: 100,
  top: 620,
}

const config5= {
  position: "absolute",
  left: 200,
  top: 620,
}


const config6= {
  position: "absolute",
  left: 300,
  top: 620,
}


export function App() {
  const [model, setModel] = React.useState(new Model(new Puzzle(config_5x5))); // TODO is this allowed for the assignment?
  const [redraw, forceRedraw] = React.useState(0);       // used to conveniently request redraw after model change
  const canvasRef = React.useRef(null);   // need to be able to refer to Canvas

  /** Ensures initial rendering is performed, and that whenever model changes, it is re-rendered. */
  React.useEffect (() => {

    redrawCanvas(model, canvasRef.current)
  }, [model, redraw])   // arguments that determine when to refresh // TODO this is jank but is adding the timer good? Maybe it should be seperate object then

  function chooseConfigurationUpdate(configuration) {
    setModel(chooseConfiguration(configuration))
    forceRedraw(redraw+1)
  }

  // TODO tese two below are stupid they should take in the type of solve as a parameter or something then lambda can be made in button
  const solvePuzzleShortest = async e => { // this is just a boundary thing that needs he values from the app to set model TODO another way?
    let modelSolutions = solveShortest(model) // TODO need to have "solve mode" or something to keep track/change victory message, robot ninjase etc?

    let result = modelSolutions.next()
    while (!result.done) {
      setModel(result.value);
      result = modelSolutions.next()
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1-second delay
    } 
  }


  // TODO this can be imported and should probably work with iterator too.
  const solvePuzzleArray = async e => { // this is just a boundary thing that needs he values from the app to set model TODO another way?
    let modelSolutions = solve(model) // TODO need to have "solve mode" or something to keep track/change victory message, robot ninjase etc?

    let result = modelSolutions.shift() // just like solvePuzzleShortest which uses an iterator. This uses an array TODO why? Can't I make the other return an iterator too and import
    while (result!=undefined) {
      setModel(result); // note no value because not an iterator
      result = modelSolutions.shift() 
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1-second delay
    } 
  }

  return (
    <main>
      <canvas tabIndex="1"  
        className="App-canvas"
        ref={canvasRef}
        width  = "1000" // TODO make these not hardcoded later? (layout.canvas.width and layour.canvas.height)
        height = "1000" 
        onKeyDown={e => {handleKeyPresses(model, e.key); e.preventDefault(); forceRedraw(redraw+1)}} />

      <button className='upbutton' style={upbutton} onClick={e => {
        handleKeyPresses(model, 'w')
        forceRedraw(redraw+1)
      }}>
        up
      </button> 
      <button className='leftbutton' style={leftbutton} onClick={e => {
        handleKeyPresses(model, 'a')
        forceRedraw(redraw+1)
      }}>
        left
      </button> 
      <button className='downbutton' style={downbutton} onClick={e => {
        handleKeyPresses(model, 's')
        forceRedraw(redraw+1)
      }}>
        down
      </button> 
      <button className='rightbutton' style={rightbutton} onClick={e => {
        handleKeyPresses(model, 'd')
        forceRedraw(redraw+1)
      }}>
        right
      </button> 
      <button className='groupremove' style={groupremovebutton} onClick={e => {
          removeAllGroups(model)
          forceRedraw(redraw+1)
        }}>
        Remove Groups
      </button>
      <button className='resetpuzzle' style={resetpuzzlebutton} onClick={e => {
          resetPuzzle(model)
          forceRedraw(redraw+1)
      }}>
        Reset Puzzle
      </button>


      <button style={solveshortestpuzzle} onClick={solvePuzzleShortest}>Solve Puzzle Shorestest</button>
      <button style={solvepuzzle} onClick={solvePuzzleArray}>Solve Puzzle</button>

      <button style={config4} onClick={() => chooseConfigurationUpdate(config_4x4)}>Config 4x4</button>
      <button style={config5} onClick={() => chooseConfigurationUpdate(config_5x5)}>Config 5x5</button>
      <button style={config6} onClick={() => chooseConfigurationUpdate(config_6x6)}>Config 6x6</button>

      {model.victory ? (<p className='victoryMessage' style={victoryMessage}>Victory! Your time was {model.timer/100}s</p>): null}
      <p className='movecount' style={movecount}> Move Count: {model.numMoves}</p>
      <p className='scorecount' style={scorecount}> Score: {model.score}</p>
      <p style={configurationname}>{model.puzzle.config.name}</p>
    </main>
  );
}

export default App;
