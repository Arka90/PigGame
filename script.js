'use strict';
//Players
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
//Total Score
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
//Current Score
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

//Playing Dice
const dice = document.querySelector('.dice');

//Buttons
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentScr;
let activePlayer;
let isPlaying;
let totalScr;
//Initial conditions
const reset = function () {
  totalScr = [0, 0];
  currentScr = 0;
  activePlayer = 0;
  isPlaying = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  dice.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

reset();

const switchPlayer = function () {
  currentScr = 0;

  document.getElementById(`current--${activePlayer}`).textContent = currentScr;
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.querySelector(`.player--0`).classList.toggle('player--active');
  document.querySelector(`.player--1`).classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    const randNum = Math.trunc(Math.random() * 6) + 1;
    console.log(randNum);
    dice.classList.remove('hidden');
    dice.src = `dice-${randNum}.png`;
    if (randNum !== 1) {
      currentScr += randNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScr;
    } else {
      totalScr[activePlayer] = 0;
      document.getElementById(`score--${activePlayer}`).textContent =
        totalScr[activePlayer];
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (isPlaying) {
    totalScr[activePlayer] += currentScr;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScr[activePlayer];
    if (totalScr[activePlayer] >= 20) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.toggle('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.toggle('player--winner');
      isPlaying = false;
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', reset);
