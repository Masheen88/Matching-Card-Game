const cards = document.querySelectorAll(".GameCard");

let hasFlippedCard = false;
//Sets the board to be locked if another turn is in play.
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  //If the board is locked exit.
  if (lockBoard) return;
  //toggles and adds the flip class to the GameCard class.
  this.classList.toggle("flip");
  console.log("I cliked it!");
  //'this' is the element that fired the event. In this case clicking on any 'GameCard' fires the event from the function.
  //Logs the div class for GameCard to GameCard.flip
  console.log(this);

  //If flipped card is false return the value of true for the first card flipped over.
  if (!hasFlippedCard) {
    //First click
    hasFlippedCard = true;
    firstCard = this;

    console.log(hasFlippedCard, firstCard);
  }
  //If the flipped card returns true the second card clicked is flipped over.
  else {
    hasFlippedCard = false;
    secondCard = this;

    console.log(hasFlippedCard, secondCard);

    //returns the dataset framework class for the firstCard clicked.
    console.log(firstCard.dataset.framework);
    //returns the dataset framework class for the secondCard clicked.
    console.log(secondCard.dataset.framework);

    //If the first card is equal to the second card remove the mouse click listener.
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
      firstCard.removeEventListener("click", flipCard);
      secondCard.removeEventListener("click", flipCard);
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
      }, 1500);
    }
  }
}

//Invoked Function wrapped in Parenethesis (function)(); meaning it will be executed directly after the definiton.
(function shuffleCards() {
  cards.forEach((card) => {
    let randomPosition = Math.floor(Math.random() * 12);
    card.style.order = randomPosition;
  });
})();

//Runs a loop and arrow function to listen for a click and run the flipCard function.
cards.forEach((card) => card.addEventListener("click", flipCard));
