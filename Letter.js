var Letter = function (letter){
  this.letter = letter;
  this.guessed = false;
  this.renderLetter = function () {
      if(this.guessed)
      { console.log(this.letter); }
      else
      { console.log("_"); }
  };
  this.checkLetter = function (userLetter) {
      if(userLetter === this.letter){
          this.guessed = true;
      }
  }
}
