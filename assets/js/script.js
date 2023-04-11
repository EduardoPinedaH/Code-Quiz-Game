// var declaration
var welcomeEl = document.querySelector("#welcome");
var startQuizBtnEl = document.querySelector("#startQuiz");
var quizEl = document.querySelector("#quiz");
var questionEl = document.querySelector("#question");
var answersEl = document.querySelector("#answers");
var inputScoreEl = document.querySelector("#inputScore");
var initialsEl = document.querySelector("#initials");
var submitInitialsBtnEl = document.querySelector("#submitInitials");
var userScoreEl = document.querySelector("#score");
var highScoresEl = document.querySelector("#highScores");
var scoresEl = document.querySelector("#scores");
var goBackBtnEl = document.querySelector("#goBack");
var clearScoresBtnEl = document.querySelector("#clearScores");
var viewHScoresBtnEl = document.querySelector("#viewHScores");
var timerEl = document.querySelector("#timer");
var rowEl = document.querySelector(".row");
var score = 0;
var currentQ = 0;
var highScores = [];
var interval;
var timeGiven = 75;
var secondsElapsed = 0;

// Questions declared with arrays

var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in JavaScript can be used to store ____",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "commas"
    },
    {
        title: "A very useful tool used during development and debuggin for printing content to the debugger is:",
        choices: ["JavaScript", "terminal/bash", "for loops", "console log"],
        answer: "console log"
    },
];

//Starts quiz from  Welcome page
startQuizBtnEl.addEventListener("click", function () {
    hide(welcomeEl); // Hides the welcome section element, presumably to clear the screen before starting the quiz
    startTimer(); // Calls the startTimer function, which starts a timer that tracks the amount of time the user spends on the quiz
    renderQuestion(); // Calls the renderQuestion function, which displays the first question on the screen
    show(quizEl); // Shows the quiz section element, which contains the question and answer choices
});

//Checks answer based on current question and updates the user score
function checkAnswer(answer) { // Declares a function that takes in an answer parameter
    if (questions[currentQ].answer == questions[currentQ].choices[answer.id]) { // Compares the answer parameter's id property with the answer property of the choices array for the current question
        score += 5; // Adds 5 points to the player's score 
        displayMessage("Correct!"); // Displays a message "Correct answer!"
    }
    else {
        secondsElapsed += 10; // Add 10 sec to the secondElapsed (which tracks the amount of time that has elapsed in the quiz)
        displayMessage("Wrong..."); // Displays a message "Wrong..."
    }
}

// function for timer
function startTimer() { // This line declares a function called startTimer()
    timerEl.textContent = timeGiven; // Sets the content of an element with the id timerEl to the value of the variable timeGiven, timerEl = 75 since timeGiven = 75
    interval = setInterval(function () { // This function will be responsible for updating the timer display every second
        secondsElapsed++; // Add +1 every time the previous function is called (keeps track of how many seconds have elapsed since the timer started)
        timerEl.textContent = timeGiven - secondsElapsed; // Subtracts the secondsElapsed variable from the timeGiven variable
        if (secondsElapsed >= timeGiven) { // Checks if the number of seconds elapsed is greater than or equal to the total time given to complete a task
            currentQ = questions.length; // If the time has run out, this code will set the currentQ variable to the length of the questions array  
            nextQuestion(); // With this function we move on to the next question
        }
    }, 1000);
}

//stops timer
function stopTimer() {
    clearInterval(interval); // Clear the data interval
}

//Clears current question and calls for display of next question and calls for input score display if last question
function nextQuestion() {
    currentQ++; // Increments the currentQ variable by 1, which keeps track of the current question in the quiz.
    if (currentQ < questions.length) { 
        renderQuestion(); // If there are more questions, the renderQuestion() function is called to display the next question. 
    } else {              //If there are no more questions, the code block after the else statement is executed.
        stopTimer(); // Stop the timer when there are no more questions
        if ((timeGiven - secondsElapsed) > 0) // If there is any time remaining on the timer and adds the remaining time to the player's score
            score += (timeGiven - secondsElapsed); // Score is the timegiven - the secondsElapsed or second substracted
        userScoreEl.textContent = score; // Adds te content of the score to te userScoleEl
        hide(quizEl); // This hide the quiz element 
        show(inputScoreEl); // Show an input score element
        timerEl.textContent = 0; // And reset the timer element to 0 when there are no more questions
    }
}

//Displays a message for 1 second
function displayMessage(m) { // m is the message to be display
    var messageHr = document.createElement("hr"); // Creates a HTML <hr> element
    var messageEl = document.createElement("div"); // Creates a HTML <div> element
    messageEl.textContent = m; // Sets the textContent property of the div element to the message passed as a parameter to the function
    document.querySelector(".jumbotron").appendChild(messageHr); // Appends the <hr> element with the .jumbotron element in the HTML doc
    document.querySelector(".jumbotron").appendChild(messageEl); // Appends the <div> element with the .jumbotron element in the HTML doc
    setTimeout(function () { 
            messageHr.remove();
            messageEl.remove(); 
    }, 1000); // Sets a timer using the setTimeout() function to remove the hr and div elements after 1 second
}

//Hide element
function hide(element) {
    element.style.display = "none"; // This will hide the element from view in the web page
}

//Display element
function show(element) {
    element.style.display = "block"; // This will display the element from view in the web page
}

//Reset variables
function reset() {
    score = 0;
    currentQ = 0;
    secondsElapsed = 0;
    timerEl.textContent = 0;
}

//Shows current question
function renderQuestion() {
    questionEl.textContent = questions[currentQ].title; // Sets the textcontent property of the questionEl to the current questions's "title"
    for (i = 0; i < answersEl.children.length; i++) { // A loop that iterates over each answer choice on the quiz page
        answersEl.children[i].children[0].textContent = `${(i + 1)}: ${questions[currentQ].choices[i]}`;// Sets the textContent property of each answer choice element to the corresponding choice for the current question
    } 
}

//Shows high scores stored in local storage
function renderHighScores() {
    scoresEl.innerHTML = ""; // Clears content
    show(highScoresEl); // Shows the highScoresEl element, which is an HTML element representing the high scores section on the page
    highScores = JSON.parse(localStorage.getItem("scores")); // Retrieves the high scores data from local storage and assigns it to the highScores variable
    console.log(highScores)
    for (var i = 0; i < highScores.length; i++) { // Loop that iterates over each high score in the highScores array
        // Creates a new HTML div element to represent each high score 
        var scoreItem = document.createElement("div"); 
        scoreItem.className += "row-score"; // Adds className 
        console.log(scoreItem)
        scoreItem.setAttribute("style", "padding-top: 10px; padding-bottom: 20px; background-color: #8854C0; opacity: 75%; color: #fff; height: 35px",); // Adds style attributes 
        scoreItem.textContent = `${(i + 1)}. ${highScores[i].username} - ${highScores[i].userScore}`; // textcontent = index[i] + username + score
        
        scoresEl.appendChild(scoreItem); // Appends the scoreItem element
    }
}

//Displays high scores
viewHScoresBtnEl.addEventListener("click", function () {
    hide(welcomeEl); // This hides the "Welcome" element on the page
    hide(quizEl); // This hides the quiz element on the page
    hide(inputScoreEl); // This hides the element for inputting the user's initials and submitting their score
    hide(rowEl);
    renderHighScores(); // This function is called to display the high scores on the page
    stopTimer(); // This stops the timer that was running during the quiz
    reset(); // This function is called to reset the quiz variables to their initial values
});

//Calls to check answer selected and calls to next question if button is clicked
answersEl.addEventListener("click", function (event) {
    if (event.target.matches("button")) { // Checks if the clicked element is a button element using the matches() method
        checkAnswer(event.target); // Calls the checkAnswer() function, passing the clicked button as an argument, which checks if the selected answer is correct or not and updates the score accordingly
        nextQuestion(); // Increments the current question index and renders the next question
    }
});

//Creates a user score object to push to the local storage scores array calls to display high scores and calls to render high scores
submitInitialsBtnEl.addEventListener("click", function () {
    var initValue = initialsEl.value.trim(); // Retrieves the value of the input field with the id "initialsEl" and removes any leading or trailing whitespace characters
    if (initValue) {
        var userScore = { username: initValue, userScore: score }; // Creates an object literal with two properties: "username", which is set to the value of initValue, and "userScore", 
                                                                    // which is set to the value of the score variable
        initialsEl.value = ''; // Resets the value of the input field to an empty string
        highScores = JSON.parse(localStorage.getItem("scores")) || []; // Retrieves the high scores data from local storage and assigns it to the highScores variable
        highScores.push(userScore) // Add the new high score data to the highScores array
        localStorage.setItem("scores", JSON.stringify(highScores)); // Update the data in local storage
        hide(inputScoreEl); // Hides the "input score" section of the page
        hide(rowEl);
        renderHighScores(); // Calls the renderHighScores function to display the updated high scores
        reset(); // Reset function to reset the quiz and timer
    }
});

//Back to Welcome page from High scores 
goBackBtnEl.addEventListener("click", function () {
    window.location.reload()
});

//Clears saved scores from local storage
clearScoresBtnEl.addEventListener("click", function () {
    highScores = []; // clears the high scores data in memory
    localStorage.setItem("scores", JSON.stringify(highScores)); // Stores the empty highScores array in local storage under the key "scores"
    renderHighScores(); // Re-renders the high scores table on the page
});




