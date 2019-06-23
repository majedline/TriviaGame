var questions = [question0, question1, question2, question3, question4];
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

// this is used to control when the game accepts the user click. 
//i.e. if answered wrong, then game does not accept answers until we go to the next question
//i.e. if the user timeout, then the game does not accept the answer until going to next
var acceptingResponsesFromUser = true;

// load the questions and answers on the UI
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

// function called when an answer is clicked
function answerClicked(){
    console.log(this);
    if (!acceptingResponsesFromUser){
        return;
    }

    acceptingResponsesFromUser = false;
   
    if($(this).attr("data-value") === $(this).attr("data-correct-response")){
        correctAnswerClicked();
    } else {
        wrongAnswerClicked();
    }
}

// wrong answer is clicked, show the answer, wait 5 seconds then go next.
function wrongAnswerClicked(){   
    console.log("wrong answer");

    $(".footer").html("Darn! Wrong answer! <br> The correct answer is <strong>"+ questions[currentQuestionToPlay].correctResponse+"</strong>. <br>Waiting 5 seconds to go next!");

    wrongAnswerCount++;
    $("#wrong-answers-view").html(wrongAnswerCount);
    
    stop();
    waitBeforeGoingNextAutomatically();
}

// correct answer clicked, go next
function correctAnswerClicked(){
    console.log("correct answer");
    correctAnswerCount++;
    $("#correct-answers-view").html(correctAnswerCount);
    goToNextQuestion();

}

// timeout reached, show the answer and go next
function questionTimedout(){
    acceptingResponsesFromUser = false;

    console.log("timeout");
    $("#timer-view").html("- -");
    $(".footer").html("Darn! Time out! <br> The correct answer is <strong>"+ questions[currentQuestionToPlay].correctResponse+"</strong>. <br>Waiting 5 seconds to go next!");

    timeoutCount++;
    $("#timeout-view").html(timeoutCount);
    waitBeforeGoingNextAutomatically();
}

// this will allow the page to wait 5 seconds before going to the next question by calling goToNextQuestion
function waitBeforeGoingNextAutomatically(){
    setTimeout(goToNextQuestion, 1000*5);
}

// this is called when we reach the end of the game. 
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
    acceptingResponsesFromUser  = true;
}

// run the counter
function run() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
}

// stop the counter
function stop() {
    clearInterval(intervalId);
}

//reset the count
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

