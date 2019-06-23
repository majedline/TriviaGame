var questions = [question0, question1, question2, question3];
console.log(questions);

//  Variable that will hold our interval ID when we execute the "run" function
var intervalId;

// the amount of time of the current game remaining
var timeRemainingForGame = 60;

var gameStarted = false;

function run() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
}

function stop() {
    clearInterval(intervalId);
  }

//  The decrement function.
function decrement() {

    //  Decrease number by one.
    timeRemainingForGame--;
    console.log(timeRemainingForGame);

    //  Show the number in the #show-number tag.
     $("#timer-view").text(timeRemainingForGame);


    //  Once number hits zero...
    if (timeRemainingForGame === 0) {

        //  ...run the stop function.
        stop();

        //  Alert the user that time is up.
        alert("Time Up!");
    }
}

// Convert a time t to min:seconds
function timeConverter(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    if (minutes === 0) {
        minutes = "00";
    }
    else if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
}

run();