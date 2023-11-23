const gameBoard = document.querySelector('.game-board');
const playBtn = document.querySelector('.play-btn');
let started = false;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let counter = 0;
let timer = 0;
let attemptsScore = document.querySelector('.attempts-score');
const timeScore = document.querySelector('.time-score');

let gameCardsSrc = [
  {
      name: 'pantera',
      src: 'img/pantera.jpeg'
  }, 
  {
      name: 'popandau',
      src: 'img/popandau.jpeg'
  },
  {
      name: 'tigru',
      src: 'img/tigru.jpeg'
  },
  {
      name: 'vultur',
      src: 'img/vultur.jpeg'
  },
  {
      name: 'carmen',
      src: 'img/carmen.jpg'
  },
  {
      name: 'vrabie',
      src: 'img/vrabie.jpg'
  }
]

// shuffle cards
const shuffle = (array) => { 
  for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  } 
  return array;
};

let doubleArr = gameCardsSrc.concat(gameCardsSrc);
function getShuffledArray(arr){
  shuffle(arr);
  return arr;
}

let buildDeck = function(){
  getShuffledArray(doubleArr);
  doubleArr.forEach(function(card){
      let cardContainer = document.createElement('div');
      cardContainer.classList.add('card-container');
      cardContainer.setAttribute('data-framework', card.name)
      cardContainer.innerHTML = `<img src="${card.src}" class="front-face""/>
      <img src="img/badge.svg" class="back-face" />`;
      gameBoard.appendChild(cardContainer);
  })
}
let myInterval;
let startGame = function(){
  counter = 0;
  attemptsScore.innerHTML ='Attempts: ' + counter;
  timer = 0;
  timeScore.innerHTML = 'Time: ' + timer;
  buildDeck();
  clearInterval(myInterval)
  myInterval = setInterval(startTimer, 1000);
  const cards = document.querySelectorAll('.card-container');
  cards.forEach(card => card.addEventListener('click', flipCard));
  
  if(!started) {
    started = true;
    playBtn.removeEventListener('click', startGame);
    playBtn.innerHTML = 'Restart';
    playBtn.addEventListener('click', restartGame);
  }
}

function startTimer(){
  timer++;
  timeScore.innerHTML = 'Time: ' + timer;
}

let restartGame = function(){
  gameBoard.innerHTML = '';
  gameBoard.classList.remove('blur');
  attemptsScore.classList.remove('endgame-font-color');
  timeScore.classList.remove('endgame-font-color');
  startGame();
  attemptsScore.innerHTML ='Attempts: ' + counter;
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  checkForMatch();
  counter++;
  attemptsScore.innerHTML = 'Attempts: ' + counter;

  let flippedCards = document.querySelectorAll('.flip');
  if(flippedCards.length == gameCardsSrc.length *2) {
    setTimeout(gameOver, 500)
  }
}

function gameOver(){
  clearInterval(myInterval)
  gameBoard.classList.add('blur');
  attemptsScore.classList.add('endgame-font-color');
  timeScore.classList.add('endgame-font-color');
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1000);
}

function resetBoard() {
  // [hasFlippedCard, lockBoard] = [false, false];
  // [firstCard, secondCard] = [null, null];
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

playBtn.addEventListener('click', startGame);