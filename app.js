// timer care sa se opreasca cand pun pauza la joc. 
// nivel de dificultate 
var gameContainer = document.querySelector('.game-container');
var playBtn = document.querySelector('.play-btn');
var restartBtn = document.querySelector('.restart-btn');
var currentQuestion = document.querySelector('.current-question');
var answerBtns = document.querySelectorAll('.answer-btn');
var statusMessage = document.querySelector('.status-message');
var endContainer = document.querySelector('.end-container');
var score = document.querySelector('.score');
var progressImg = document.querySelector('.progress-img');
var randomQuestion; 
var roundNumber = 0;
var started = false;
var remainingRounds = [...roundsArray];
var questionIndex;
var helpFifty = document.querySelector('.help-fiftyfifty');
var helpCall = document.querySelector('.help-call');
var lastScoreDisplay = document.querySelector('.last-score');
var lastScore;

var nextLevel = function(){
    if(remainingRounds.length !== 0) {
        roundNumber++;
        score.innerText = "Round " + roundNumber + '/' + roundsArray.length;
        statusMessage.innerText = '';
        endContainer.classList.remove('game-over');
        randomQuestion = remainingRounds[Math.floor(Math.random()*remainingRounds.length)];
        currentQuestion.innerText = randomQuestion.question;
        currentQuestion.classList.add('fade-in');

        for (var i = 0; i < answerBtns.length; i++) {
            answersArr = randomQuestion.answers;
            answerBtns[i].innerText = answersArr[i].text;
            answerBtns[i].classList.remove('blocked-btn');
            answerBtns[i].classList.remove('correct-answer-btn');
            answerBtns[i].setAttribute('data-correct', answersArr[i].correct);

            answerBtns[i].addEventListener('click', checkAnswer);
            answerBtns[i].addEventListener('touchstart', checkAnswer);
        }

        questionIndex = remainingRounds.indexOf(randomQuestion);
        remainingRounds.splice(questionIndex,1);

        if(roundNumber == 1) {
            progressImg.style.backgroundImage = game.progressTree.imageSrc1;
        } else if(roundNumber == 4){
            progressImg.style.backgroundImage = game.progressTree.imageSrc2;
        } else if(roundNumber == 7) {
            progressImg.style.backgroundImage = game.progressTree.imageSrc3;
        } else if(roundNumber == 10) {
            progressImg.style.backgroundImage = game.progressTree.imageSrc4;
        } else if(roundNumber == 13) {
            progressImg.style.backgroundImage = game.progressTree.imageSrc5;
        }

    } else {
        currentQuestion.innerHTML = 'Winner!!!<br> Your time:' ;
        localStorage.setItem('lastScore', roundNumber);
    }
}

var clearLevel = function(){
    currentQuestion.innerText = '';
    for (var i = 0; i < answerBtns.length; i++) {
        answersArr = randomQuestion.answers;
        answerBtns[i].removeAttribute('data-correct');
        answerBtns[i].classList.add('blocked-btn');
        answerBtns[i].classList.remove('wrong-answer-btn');
    }
}

var checkAnswer = function(){
    answerBtns.forEach(function(answer){
        answer.classList.add('blocked-btn');
    })
    if(this.getAttribute('data-correct') == "true") {
        this.classList.add('correct-answer-btn');
        currentQuestion.classList.remove('fade-in');
        clearLevel();
        window.setTimeout(nextLevel, 500);
    } else {
        this.classList.add('wrong-answer-btn');
        gameOver();
        return
    }
}

var gameOver = function(){
    var finalScore = document.querySelector('.final-score');
    statusMessage.innerText = 'Game Over';
    finalScore.innerText = 'Your score: ' + roundNumber;
    window.setTimeout(function(){
        endContainer.classList.add('game-over'); 
        restartBtn.style.display = 'block';
    }, 500);
    localStorage.setItem('lastScore', roundNumber);
}

var getLastScore = function(){
    lastScore = localStorage.getItem('lastScore');
    if(lastScore !== null) {
        lastScoreDisplay.innerHTML = 'Last score: ' + lastScore;
    }
}

var timer = function(time){
    
}

var startGame = function(){
    gameContainer.classList.add('game-container-started');
    getLastScore();
    started = true;
    if(started = true) {
        playBtn.style.display = 'none';
        nextLevel();
    }
}

var restartGame = function(){
    restartBtn.style.display = 'none';
    remainingRounds = [...roundsArray];
    roundNumber = 0;
    clearLevel();
    nextLevel();
    getLastScore();
    helpFifty.classList.remove('blocked-btn');
}

//variante ajutor
//50/50
var fiftyFifty = function(){
    var falseAnswers = document.querySelectorAll('[data-correct=false]');
    for(var i = 0; i < falseAnswers.length - 1; i++) {
        falseAnswers[i].classList.add('blocked-btn');
    }
    helpFifty.classList.add('blocked-btn');
}

helpFifty.addEventListener('click', fiftyFifty);

//call friend
// helpCall.addEventListener('click', function(){
//     console.log('call friend');
//     helpCall.classList.add('blocked-btn');
// })

playBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', restartGame);