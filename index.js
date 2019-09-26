var Word = require("./Word");
var inquirer = require("inquirer");

var animalWords = ["bear", "cat", "dolphin", "elephant", "goose", "jaguar", "mongoose", "ox", "roadrunner"];

var wordPicked;
var currentWord;
var remainingGuess;


function initGame() {
    // randomly pick a word from animalWords array
    wordPicked = animalWords[Math.floor(Math.random() * animalWords.length)];

    // create new Word object and call renderWord function to display it in the terminal
    currentWord = new Word(wordPicked);
    currentWord.renderWord();

    remainingGuess = 12;

}

// display an instruction message for users
console.log("\nWord Guess! What's the animal? You will have 12 guesses starting.");

initGame();


function playGame() {

    if (remainingGuess > 0) { // if there are still remaining guesses, prompt user to guess a letter

        inquirer.prompt([
            {
                type: "input",
                message: "Guess a letter!",
                name: "letter"
            }
        ]).then(function (answer) {

            // after user has guessed a letter, call checkWord function which calls checkLetter function for each Letter object 
            // to see if user guessed letter matches with any letter in the word and update that Letter object's guessed property
            currentWord.checkWord(answer.letter);
            // then renderLetter for each Letter object and concatenate the word string again
            currentWord.renderWord();

            remainingGuess--;

            // check if user has guessed correctly and display corresponding messages
            if (wordPicked.includes(answer.letter)) {
                console.log("\nCORRECT!!!\n")
            } else {
                console.log("\nINCORRECT!!!\n");
                console.log(remainingGuess + " guess(es) remaining!!!\n");
            }

            // check if the whole word has been guessed by checking if all Letter objects' guessed property is true
            if (currentWord.word.every(item => item.guessed === true)) {

                console.log("\nYou got it right!\n");
                
                // ask user if they want to play next word
                inquirer.prompt([
                    {
                        type: "confirm",
                        message: "Do you want to guess next word?",
                        name: "continue"
                    }
                ]).then(function (response) {

                    if (response.continue) { // if yes, initialize the game, then prompt user to start guessing a letter
                        initGame();
                        playGame();
                    } else { // if no, display a "Thank you" message then exit out function
                        console.log("\nThank you for playing!\n");
                        return false;
                    }
                });

            } else {  // if the whole word is NOT yet guessed, continue prompting user to guess a letter while there are still remaining guesses
                playGame();
            }
        });
    } else { // if no more guesses left

        console.log("\nGame over, no more guesses!\n");

        // ask user if they want to play next word
        inquirer.prompt([
            {
                type: "confirm",
                message: "Do you want to guess next word?",
                name: "continue"
            }
        ]).then(function (response) {
            if (response.continue) { // if yes, initialize the game, then prompt user to start guessing a letter
                initGame();
                playGame();
            }
            else { // if no, display a "Thank you" message then exit out function
                console.log("\nThank you for playing!\n");
                return false;
            }
        });
    }

}

playGame();

