const gameCards = document.querySelectorAll(".GameCard");

let isCardFlipped = false; //The default state for cards on load is not flipped
let lockBoard = false; //Sets the board to be locked if two cards are flipped.
let firstCard, secondCard; //Declares a variable for the first and second card you will click to attempt to match.
let cardFlippingSound = new Audio("./sounds/Card-flip-sound-effect.mp3"); //Sound for flipping a card.
let cardsFlippingSound = new Audio("./sounds/Cards-flipping-sound-effect.mp3"); //Sound for flipping a card.

function flipCard() /* Creates a function for when a card is flipped or not.*/ {
  if (lockBoard) {
    return; /*If the board is locked exit the function.*/
  } else {
    this.classList.toggle("flip"); //Toggles and adds .flip class to the .GameCard class.
    cardFlippingSound.play(); // Plays the sound for one card flipping

    //'this' is the div element that fired the event. In this case clicking on any 'GameCard' executes the function.
    //Logs the div class for GameCard to GameCard.flip
    console.log("this.classList =:", this.classList);
    console.log("div data card flipped 'this' =:", this);

    //If flipped card is not true return the value of true for the first card flipped over.
    if (!isCardFlipped) {
      //First card flipped over.
      isCardFlipped = true;
      firstCard = this;
      this.classList.toggle("first");
      const firstCardClicked = "first card";
      console.log("First Card Clicked:", firstCard); //console logs which card was clicked first.
    }
    //If the flipped card returns true the second card clicked is flipped over.
    else {
      isCardFlipped = false;
      secondCard = this;
      console.log("Second Card Clicked:", secondCard); //console logs which card was clicked second.

      console.log(firstCard.dataset.framework); //console logs the dataset framework class for the firstCard clicked.
      console.log(secondCard.dataset.framework); //console logs the dataset framework class for the secondCard clicked.

      //returns the dataset framework class for the secondCard clicked.
      if (firstCard.dataset.framework === secondCard.dataset.framework) {
        //Performs a check to see if 'this' div is equal to the firstCard value.
        if (this === firstCard) {
          console.log("div data same card unflipped:", this); //console logs the new value of 'this'.
          return; //exits the function.
        } else {
          firstCard.removeEventListener("click", flipCard);
          secondCard.removeEventListener("click", flipCard);
          console.log("div data unflipped:", this);
        }
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
          cardsFlippingSound.play(); //// Plays the sound for two cards flipping
        }, 500); //Adds a 500ms delay before flipping the cards back over.
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
