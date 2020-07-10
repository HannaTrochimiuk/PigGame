
var scores, roundScore, activePlayer, gamePlaying, scoreToWin;

init();

document.querySelector('.btn-roll').addEventListener('click',function(){
    if(gamePlaying){
        var dice = Math.floor(Math.random()*6)+1;
        var diceDom = document.querySelector('.dice');
        diceDom.style.display = 'block';
        diceDom.src = 'dice-'+dice+'.png';
        if(dice !== 1){
            roundScore +=dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        else { 
            document.querySelector('.active').style.animationName = 'roll1';
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click',function(){
    if(gamePlaying){
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        if(scores[activePlayer] < readScore()){
            nextPlayer();
        }
        else {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('winner');
            document.querySelector('.dice').style.display = 'none';
            gamePlaying = false;
        }
    }
});
document.querySelector('.btn-new').addEventListener('click',init);

function nextPlayer() {
    document.querySelector('#current-' + activePlayer).textContent = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    document.querySelector('.active').style.animationName = 'null';
    document.querySelector('.dice').style.display = 'none';
}

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('current-0').textContent= '0';
    document.getElementById('current-1').textContent= '0';
    document.getElementById('score-0').textContent= '0';
    document.getElementById('score-1').textContent= '0';
    document.getElementById('name-0').textContent= 'Player 1';
    document.getElementById('name-1').textContent= 'Player 2';
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
}

function readScore() {
    var input = document.getElementById('input').value;
    if(input===""){
        return 100;
    }
    else return input;
}