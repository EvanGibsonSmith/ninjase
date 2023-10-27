import React from 'react';
import { config_4x4, config_5x5, config_6x6 } from './model/Model.js'
import { redrawCanvas} from './boundary/Boundary.js'
import { Model, Puzzle } from './model/Model.js'
import { removeGroup, resetPuzzle } from './controller/Controller.js'

// you might try this quick and dirty way to position buttons where you want (and other elements)
const upbutton = {
  position: "absolute",
  left: 900,
  top: 80,
}

const leftbutton = {
  position: "absolute",
  left: 850,
  top: 120,
}

const groupremovedropdown = {
  position: "absolute",
  
}


function App() {
  const [model, setModel] = React.useState(new Model(new Puzzle(config_6x6))); // TODO is this allowed for the assignment?
  const [redraw, forceRedraw] = React.useState(0);       // used to conveniently request redraw after model change
  const canvasRef = React.useRef(null);   // need to be able to refer to Canvas

  /** Ensures initial rendering is performed, and that whenever model changes, it is re-rendered. */
  React.useEffect (() => {

    redrawCanvas(model, canvasRef.current)
  }, [model, redraw])   // arguments that determine when to refresh

  // TODO these feel silly. Maybe some higher order later?
  const handleUpClick = e => {
    setModel(resetPuzzle(model))
  }
  
  const handleLeftClick = e => {
    setModel(model) // TODO does nothing :/
  }

  const handleGroupRemove = e => {
    setModel(removeGroup(model, "red")) // FIX THE COLORS BEING PASSED
  }

  return (
    <main>
      <canvas tabIndex="1"  
        className="App-canvas"
        ref={canvasRef}
        width  = "800" // TODO make these not hardcoded later? (layout.canvas.width and layour.canvas.height)
        height = "800" />

      <button style={upbutton} onClick={handleUpClick}>^</button> 
      <button style={leftbutton} onClick={handleLeftClick}>&lt;</button>
      <button style={groupremovedropdown} onClick={handleGroupRemove}>&lt;</button>
    </main>
  );
}

export default App;
