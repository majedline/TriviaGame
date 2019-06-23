var questions = [question0, question1, question2, question3];
var currentQuestionToPlay = 0;

//  Variable that will hold our interval ID when we execute the "run" function
var intervalId;

// the amount of time of the current game remaining
var timeRemainingForGame = 5;

// went through all the questions and responded to all
var gameOver = false;


function loadQuestionsAndAnswersOnUI() {

    if (gameOver) {
        alert("game over");

    } else {


        $("#question").html(questions[currentQuestionToPlay].question);

        for (var i = 0; i < questions[currentQuestionToPlay].answers.length; i++) {
            var answerbtn = $("<button>");
            answerbtn.attr("data-correct-response", questions[currentQuestionToPlay].correctResponse);
            answerbtn.attr("class", "answer-button btn btn-md btn-primary");
            answerbtn.text(questions[currentQuestionToPlay].answers[i]);


            var li = $("<li>");
            li.append(answerbtn);

            $("#answers").append(li);
        }

        $(".answer-button").on("click", function () {
            console.log(this);
           
            currentQuestionToPlay++;
            $("#answers").empty();
           
            // checke if the response is correct or not
            // if not, then display the correct 
            
            loadQuestionsAndAnswersOnUI();
        });



    }
}

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


loadQuestionsAndAnswersOnUI();
run();
