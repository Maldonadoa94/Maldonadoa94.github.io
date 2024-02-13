document.addEventListener("DOMContentLoaded", function() {  
  const gameContainer = document.getElementById("game");
  let card1 = null;
  let card2 = null;
  let flippedCard = false;
  //let score = localStorage.getItem("score");
  let startBtn = document.getElementById("button");
  //let startGame = false;

  const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple"
  ];

  // here is a helper function to shuffle an array
  // it returns the same array with values shuffled
  // it is based on an algorithm called Fisher Yates if you want ot research more
  function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  }

  let shuffledColors = shuffle(COLORS);


  function createDivsForColors(colorArray) {
    for (let color of colorArray) {
      
      const newDiv = document.createElement("div");

      // give div a class attribute for the value we are looping over
      newDiv.classList.add(color);

      // call a function handleCardClick when a div is clicked on
      newDiv.addEventListener("click", handleCardClick);

      gameContainer.append(newDiv);
    } 
  }

  let cardsFlipped = 0;
  function handleCardClick(e) {

    if (flippedCard) return;

    if (e.target.classList.contains("flipped")) return;

    let currentCard = e.target;
    currentCard.style.backgroundColor = currentCard.classList[0];

    if (!card1 || !card2) {
      currentCard.classList.add("flipped");
      card1 = card1 || currentCard;
      card2 = currentCard === card1 ? null : currentCard;
    }

    if (card1 && card2) {
      flippedCard = true;
      // debugger
      let gif1 = card1.className;
      let gif2 = card2.className;

      if (gif1 === gif2) {
        cardsFlipped += 2;
        card1.removeEventListener("click", handleCardClick);
        card2.removeEventListener("click", handleCardClick);
        card1 = null;
        card2 = null;
        flippedCard = false;
      } else {
        setTimeout(function() {
          card1.style.backgroundColor = "";
          card2.style.backgroundColor = "";
          card1.classList.remove("flipped");
          card2.classList.remove("flipped");
          card1 = null;
          card2 = null;
          flippedCard = false;
        }, 1000);
      }
    }

    if (cardsFlipped === COLORS.length) alert("game over!");

  }

  //When the DOM loads
  startBtn.addEventListener("click", createDivsForColors(shuffledColors));
    
  //createDivsForColors(shuffledColors);
});