const gameCards = document.querySelectorAll(".GameCard");

let isCardFlipped = false; //The default state for cards on load is not flipped
let lockBoard = false; //Sets the board to be locked if another turn is in play.
let firstCard, secondCard; //Declares a variable for the first and second card you will click to attempt to match.

// Sets a function for when a card is flipped or not.
function flipCard() {
  if (lockBoard) {
    //If the board is locked exit the function.
    return;
  } else {
    //Toggles and adds the flip class to the .GameCard class.
    this.classList.toggle("flip");
    console.log("I cliked it!");
    //'this' is the div element that fired the event. In this case clicking on any 'GameCard' fires the event from the function.
    //Logs the div class for GameCard to GameCard.flip
    console.log("this.classList =:", this.classList);
    console.log("div data card flipped:", this);

    //If flipped card is false return the value of true for the first card flipped over.
    if (!isCardFlipped) {
      //First click
      isCardFlipped = true;
      firstCard = this;
      this.classList.toggle("first");
      const firstCardClicked = "first card";
      console.log("First Card Clicked:", firstCard);
      if (firstCardClicked) {
        this.classList.toggle("first");
      }
    }
    //If the flipped card returns true the second card clicked is flipped over.
    else {
      isCardFlipped = false;
      secondCard = this;
      this.classList.toggle("second");

      console.log("Second Card Clicked:", secondCard);

      //returns the dataset framework class for the firstCard clicked.
      console.log(firstCard.dataset.framework);
      //returns the dataset framework class for the secondCard clicked.
      console.log(secondCard.dataset.framework);

      //If the first card is equal to the second card remove the mouse click listener.
      if (firstCard.dataset.framework === secondCard.dataset.framework) {
        //Performs a check to see if this is equal to the firstCard variable.
        if (this === firstCard) {
          console.log("div data same card unflipped:", this);
          return;
        }
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        console.log("div data unflipped:", this);
      } else {
        //If the board is locked continue.
        lockBoard = true;
        /*
    If the first card is not equal to the second card remove the flip class.
    This in will flips the cards back over.
    */
        setTimeout(() => {
          firstCard.classList.remove("flip");
          secondCard.classList.remove("flip");
          //The board wil unlock once false.
          lockBoard = false;
        }, 500);
      }
    }
  }
}

//Invoked Function wrapped in Parenethesis (function)(); meaning it will be executed directly after the definiton.
(function shuffleCards() {
  gameCards.forEach((card) => {
    let randomPosition = Math.floor(Math.random() * 12);
    card.style.order = randomPosition;
  });
})();

//Runs a loop and arrow function to listen for a click and run the flipCard function.
gameCards.forEach((card) => card.addEventListener("click", flipCard));
