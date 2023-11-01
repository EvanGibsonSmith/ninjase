import { moveNinjase } from "../controller/MoveNinjase";
import { removeAllGroups } from "../controller/RemoveAllGroups";

// note for direction 0, 1, 2, and 3 are up left down and right counterclockwise
// TODO how to actually get handleKeyPressed in eventListener
export function handleKeyPresses(model, k) {
    let direction = -1 // will be set if direction is inputted
    if (k=='w' || k=='ArrowUp') {
        direction = 0
    }
    else if (k=='a' || k=='ArrowLeft') {
        direction = 1
    }
    else if (k=='s' || k=='ArrowDown') {
        direction = 2
    }
    else if (k=='d' || k=='ArrowRight') {
        direction = 3
    }
    
    // now we have direction. If it is still, check if group remove (space was pressed)
    if (direction!=-1) {
      moveNinjase(model, direction)
    }
  
    if (k==' ' || k=='Enter') { // check if last this to read for has been pressed
      removeAllGroups(model) // FIX THE COLORS BEING PASSED, make it remove all groups for now?
    }

    return model // return changed underlting model
  }
