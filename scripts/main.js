"use strict";

const player0El = document.querySelector(".player_0");
const player1El = document.querySelector(".player_1");
const score0El = document.querySelector(".score_0");
const score1El = document.querySelector(".score_1");
const current0El = document.querySelector(".current-score_0");
const current1El = document.querySelector(".current-score_1");

const btnNew = document.querySelector(".btn__new");
const btnRoll = document.querySelector(".btn__roll");
const btnHold = document.querySelector(".btn__hold");
const diceEl = document.querySelector(".dice");

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player_winner");
  player1El.classList.remove("player_winner");
  player0El.classList.add("player_active");
  player1El.classList.remove("player_active");
};
init();

const switchPlayer = function () {
  document.querySelector(`.current-score_${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player_active");
  player1El.classList.toggle("player_active");
};

// Start the game!
btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    diceEl.src = `img/dice-${dice}.png`;

    //If the number of dice is not one, you can continue rolling the dice
    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`.current-score_${activePlayer}`).textContent =
        currentScore;
    }

    //If the dice number is one, the chance to continue playing for this round will be taken away from you
    else {
      switchPlayer();
    }
  }
});

//save points for active player
btnHold.addEventListener("click", function () {
  if (playing) {
    // Collect new points with active player saved points
    scores[activePlayer] += currentScore;
    document.querySelector(`.score_${activePlayer}`).textContent =
      scores[activePlayer];
    //Check the bet condition
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player_${activePlayer}`)
        .classList.add("player_winner");
      document
        .querySelector(`.player_${activePlayer}`)
        .classList.remove("player_active");
    } else {
      switchPlayer();
    }
  }
});

//Reset the game
btnNew.addEventListener("click", init);
