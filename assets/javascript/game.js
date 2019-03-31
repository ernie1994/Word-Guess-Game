
var maxBadGuess = 6;

var gameOfThronesWords = ["Valyrian", "Lannister", "Stark", "Targaryen", "Dorne", "Dragon", "Winter", "Wolf", "Sword"];

var player = {
    wins: 0,
    losses: 0,
    badGuessesCount: 0,
    guesses: [],
};

var word = {
    display:
        function () {
            var string = "";

            this.hidden.split("").forEach(letter => {
                string += " "

                if (this.discovered.includes(letter)) {
                    string += letter
                }
                else {
                    string += "_"
                }
            });
            return string
        },

    newRound:
        function () {
            var random = Math.floor(Math.random() * (gameOfThronesWords.length - 1));
            this.hidden = gameOfThronesWords[random].toLowerCase();
            this.discovered = [];
            player.badGuessesCount = 0;
            player.guesses = [];
        },

    hidden: "stark",
    discovered: [],
};

function updateDivs() {
    var winsDiv = document.getElementById("wins");
    winsDiv.textContent = "Wins: " + player.wins;

    var lossesDiv = document.getElementById("losses");
    lossesDiv.textContent = "Losses: " + player.losses;

    var guessesRemainingDiv = document.getElementById("guesses-remaining");
    guessesRemainingDiv.textContent = "Guesses Remaining: " + (maxBadGuess - player.badGuessesCount);

    var guessesDiv = document.getElementById("guesses");
    guessesDiv.textContent = "Guesses: " + player.guesses.join(" ");

    var displayDiv = document.getElementById("display");
    displayDiv.textContent = word.display();
}

$(document).ready(function () {
    updateDivs();
});


document.onkeyup = function (event) {
    var key = event.key;

    console.log(word.hidden);

    if (word.discovered.includes(key)) {
        return
    }

    if (word.hidden.split("").includes(key)) {
        word.discovered.push(key);
    }
    else if (!player.guesses.includes(key)) {
        player.guesses.push(key);
        player.badGuessesCount++;
    }

    if (word.display().replace(/\s/g, "") == word.hidden) {
        player.wins++;
        word.newRound();
    }

    if (player.badGuessesCount == maxBadGuess) {
        player.losses++;
        word.newRound();
    }

    updateDivs();
};

