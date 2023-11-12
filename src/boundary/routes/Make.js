import React from "react";
import { Model } from '../../model/Model.js'
import { Puzzle } from '../../model/Puzzle.js'
import { blank_5x5 } from '../../resources/puzzle-config.js'
import { redrawCanvas} from '../MakeBoundary.js'
import { Link } from 'react-router-dom'
import './Make.css';



export function Make() {
    const [model, setModel] = React.useState(new Model(new Puzzle(blank_5x5))); // TODO is this allowed for the assignment?
    const [redraw, forceRedraw] = React.useState(0);       // used to conveniently request redraw after model change
    const canvasRef = React.useRef(null);   // need to be able to refer to Canvas
  
    /** Ensures initial rendering is performed, and that whenever model changes, it is re-rendered. */
    React.useEffect (() => {
  
      redrawCanvas(model, canvasRef.current)
    }, [model, redraw])   // arguments that determine when to refresh // TODO this is jank but is adding the timer good? Maybe it should be seperate object then
    
    return (
      <main>
        <canvas tabIndex="1"  
          className="App-canvas"
          ref={canvasRef}
          width  = "600" // TODO make these not hardcoded later? (layout.canvas.width and layour.canvas.height)
          height = "600"/> 
        <div className="makepage">To be completed (Time is so hard to find!)</div>
        <Link to='/play' className="goback">Go Back</Link>
      </main>
    );
  }

export default Make;