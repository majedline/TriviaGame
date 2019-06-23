var questions = [question0, question1, question2, question3];
var currentQuestionToPlay = 0;

//  Variable that will hold our interval ID when we execute the "run" function
var intervalId;

// the amount of time of the current game remaining
var timeRemainingForGame = 10;

var wrongAnswerCount = 0;
var correctAnswerCount = 0;
var timeoutCount = 0;

// went through all the questions and responded to all
var gameOver = false;


function loadQuestionsAndAnswersOnUI() {

    if (gameOver) {
        reachedEndOfGame();

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
            answerbtn.attr("class", "answer-button btn btn-md btn-info");
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
   
    if($(this).attr("data-value") === $(this).attr("data-correct-response")){
        correctAnswerClicked();
    } else {
        wrongAnswerClicked();
    }


}

function wrongAnswerClicked(){   
    console.log("wrong answer");

    $(".footer").html("Darn! Wrong answer. The correct answer is <strong>"+ questions[currentQuestionToPlay].correctResponse+"</strong> ");
    
    
    var nextButton = $("<button>");
    nextButton.attr("class", "btn btn-warning");
    nextButton.html("Go to the next question");
    nextButton.on("click", function (){
        goToNextQuestion();
    });

    $(".footer").append(nextButton);

    wrongAnswerCount++;
    $("#wrong-answers-view").html(wrongAnswerCount);
    
    stop();
}

function correctAnswerClicked(){
    console.log("correct answer");
    correctAnswerCount++;
    $("#correct-answers-view").html(correctAnswerCount);
    goToNextQuestion();

}

function questionTimedout(){
    console.log("timeout");
    $("#timer-view").html("- -");
    $(".footer").html("Darn! Timed out ");
    
    var nextButton = $("<button>");
    nextButton.attr("class", "btn btn-warning");
    nextButton.html("Go to the next question");
    nextButton.on("click", function (){
        goToNextQuestion();
    });

    $(".footer").append(nextButton);

    timeoutCount++;
    $("#timeout-view").html(timeoutCount);

}

function reachedEndOfGame(){
    stop();
    $("#question").html("Reached the end of the game :)");
    $("#timer-view").html("- -");
    $(".footer").html("Yay!");
}


// will increment to go to the next question and loads is there are any left
function goToNextQuestion(){
    $("#answers").empty();
    $(".footer").html("Pick your answer. Watch out for the time!!");

    // we are done with this response, lets go to the next question and load it if we havent reached the end
    currentQuestionToPlay++;

    if (currentQuestionToPlay < questions.length){
        //there are more questions remaining, reset the timer and load the  next set of question
        resetTimer();
        loadQuestionsAndAnswersOnUI();
    }else{
        reachedEndOfGame();
    }
}

function run() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
}

function stop() {
    clearInterval(intervalId);
}

function resetTimer(){
    timeRemainingForGame = 11;
    run();
}

//  The decrement function.
function decrement() {

    //  Decrease number by one.
    timeRemainingForGame--;

    //  Show the number in the #show-number tag.
    $("#timer-view").text(timeRemainingForGame);

    //  Once number hits zero...
    if (timeRemainingForGame === 0) {
        stop();
        questionTimedout();

    }
}

// load the screen
loadQuestionsAndAnswersOnUI();

// run the timer
run();

// hookup the reload new game button event
function newGame(){
    location.reload();
}
$("#new-game-button").on("click", newGame);

