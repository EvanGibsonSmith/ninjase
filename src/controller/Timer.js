
// TODO not used need to fix this
// TODO remove if never used in the end
export function timerFunction(model) { // from https://stackoverflow.com/questions/31559469/how-to-create-a-simple-javascript-timer
    var ms = 0;
    var timer = setInterval(function() {
        model.timer = ms
        ms++;
        if (model.victory) {
            clearInterval(timer);
        }
        // TODO need to redraw somehow from here
    }, 1000);
  }