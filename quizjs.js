var questions = [
    {
        title: "Which one of the following is used to save the style of a webpage?",
        choices: ["HTML", "CSS", "Javascript", "MySQL"],
        answer: "CSS"
    },
    {
        title: "Which of the following is not a CSS library?",
        choices: ["Tailwind", "bootstrap", "materialise", "jQuery"],
        answer: "jQuery"
    },
    {
        title: "Which type can obly store numbers & decimals in Javascript?",
        choices: ["numbers", "strings", "booleans", "none of the above"],
        answer: "numbers"
    },
    {
        title: "What file need an alteration when we have a typo shown on website? ",
        choices: ["HTML", "CSS", "Javascript", "JSON"],
        answer: "HTML"
    }, 
    {
        title: "Which one of the following is able to use as a database to store data?",
        choices: ["NoSQL", "mySQL", "MongoDB", "All of the above"],
        answer: "All of the above"
    },

];

var score = 0;
var questionIndex = 0;
var timeLeft = document.querySelector("#timeLeft");
var timer = document.querySelector("#Start");
var questionsDiv = document.querySelector("#questionsDiv");
var Main = document.querySelector("#Main");

//10 seconds per question
var secondsLeft = 60;
//interval time
var holdInterval = 0;
//penalty time
var penalty = 5;

var ulCreate = document.createElement("ul");

// Timer display triggered after clicked start button
timer.addEventListener("click", function () {
   
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            timeLeft.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                timeLeft.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

//Display questions and choices to page
function render(questionIndex) {
    // Clears existing data 
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    
    for (var i = 0; i < questions.length; i++) {
        
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
   
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

// Comparing correct answer with User's choice
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
      
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
        } else {
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }
    questionIndex++;

    if (questionIndex >= questions.length) {
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);

}

//Finishing page display
function allDone() {
    questionsDiv.innerHTML = "";
    timeLeft.innerHTML = "";

    // Heading:
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionsDiv.appendChild(createH1);

    // Paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

   // time left display
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Congrats! You finished the test with " + timeRemaining + " seconds left.";

        questionsDiv.appendChild(createP2);
    }

    // Label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

    // input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    // submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);

    // Event listener to capture initials and local storage for initials and score
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Travels to final page
            window.location.replace("./HighScores.html");
        }
    });

}


