var questions = [question0, question1, question2, question3];
var currentQuestionToPlay = 0;

//  Variable that will hold our interval ID when we execute the "run" function
var intervalId;

// the amount of time of the current game remaining
var timeRemainingForGame = 20;

// went through all the questions and responded to all
var gameOver = false;


function loadQuestionsAndAnswersOnUI() {

    if (gameOver) {
        alert("game over");

    } else {

        // load the current question
        $("#question").html(questions[currentQuestionToPlay].question);

        // load the possible answers
        for (var i = 0; i < questions[currentQuestionToPlay].answers.length; i++) {
            // response button
            var answerbtn = $("<button>");
            // the value of the of the answer and the correct answer
            answerbtn.attr("data-value", questions[currentQuestionToPlay].answers[i]);
            answerbtn.attr("data-correct-response", questions[currentQuestionToPlay].correctResponse);

            // class name to hookup the event
            answerbtn.attr("class", "answer-button btn btn-md btn-primary");
            answerbtn.text(questions[currentQuestionToPlay].answers[i]);

            // add the button to the LI
            var li = $("<li>");
            li.append(answerbtn);

            // add the button to the screen
            $("#answers").append(li);
        }

        // event when an answer is clicked
        $(".answer-button").on("click", answerClicked);

    }
}

// function caled when an answer is clicked
function answerClicked(){
    console.log(this);

    $("#answers").empty();
   
    if($(this).attr("data-value") === $(this).attr("data-correct-response")){
        correctAnswerClicked();
    } else {
        wrongAnswerClicked();
    }

    // we are done with this response, lets go to the next question and load it if we havent reached the end
    currentQuestionToPlay++;
    if (currentQuestionToPlay < questions.length){

        resetTimer();
        loadQuestionsAndAnswersOnUI();
    }else{
        reachedEndOfGame();
    }
}

function wrongAnswerClicked(){
    console.log("wrong answer");
}

function correctAnswerClicked(){
    console.log("correct answer");
}

function questionTimedout(){
    console.log(timeout);
}

function reachedEndOfGame(){
    console.log("game over, reached the end");
}


function run() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
}

function stop() {
    clearInterval(intervalId);
}

function resetTimer(){
    timeRemainingForGame = 21;
    run();
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


loadQuestionsAndAnswersOnUI();
run();
