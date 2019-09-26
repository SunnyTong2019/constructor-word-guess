var Letter = require("./Letter");

var Word = function (word) {

    this.word = [];
    
    // loop through each letter in the word, create new Letter object and push to this.word array
    for (var i = 0; i < word.length; i++) {
        var newLetter = new Letter(word[i]);
        this.word.push(newLetter);
    }
    
    // call renderLetter function for each Letter object to render the letter, then concatenate the all letters to a string and display
    this.renderWord = function () {
        var wordString = "";

        this.word.forEach(item => wordString += item.renderLetter() + " ");

        console.log("\n" + wordString + "\n");
    };
    
    // call checkLetter function for each Letter object to see if the letter has been guessed which will udpate its guessed property accordingly
    this.checkWord = function (userGuessed) {
        this.word.forEach(item => item.checkLetter(userGuessed));
    };

}

module.exports = Word;
