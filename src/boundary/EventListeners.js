// note for direction 0, 1, 2, and 3 are up left down and right counterclockwise
// TODO how to actually get handleKeyPressed in eventListener
function handleKeyPresses(e) {
    let direction = -1 // will be set if direction is inputted
    if (e.key=='w' || e.key=='ArrowUp') {
        e.preventDefault(); // stop website from scrolling
        direction = 0
    }
    else if (e.key=='a' || e.key=='ArrowLeft') {
        e.preventDefault(); // stop website from scrolling
        direction = 1
    }
    else if (e.key=='s' || e.key=='ArrowDown') {
        e.preventDefault(); // stop website from scrolling
        direction = 2
    }
    else if (e.key=='d' || e.key=='ArrowRight') {
      e.preventDefault(); // stop website from scrolling
        direction = 3
    }
    
    // now we have direction. If it is still, check if group remove (space was pressed)
    if (direction!=-1) {
      moveNinjase(model, direction)
    }
  
    else if (e.key==' ') { // check if last this to read for has been pressed
      e.preventDefault(); // Prevents button from being pressed from spacebar
      removeAllGroups(model) // FIX THE COLORS BEING PASSED, make it remove all groups for now?
    }
    return model // return changed underlting model
  }
