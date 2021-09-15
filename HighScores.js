var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");

// button to clear record
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

// Record from local storage
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {

    for (var i = 0; i < allScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(createLi);

    }
}

//Go Back button return to quiz page
goBack.addEventListener("click", function () {
    window.location.replace("./index.html");
});