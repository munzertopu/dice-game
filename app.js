/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- If Player's one of the dice is 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his Global score. After that, it's the next player's turn. If one player reaches to the winning socre, he 
    has to press the 'Hold' button to secure his game. 
- The default score is 100 to win the game. Players can also choose the winning score from the box. 

*/



var scores, roundScores, activePlayer, dice, gamePlaying;

init();



var lastDice;

document.querySelector('.btn-roll').addEventListener ('click', function(){


    if (gamePlaying) {


        // 1. Random Number

    var dice1 = Math.floor(Math.random() * 6) +1;
    var dice2 = Math.floor(Math.random() * 6) +1;

    //2. Display the results

    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
    document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

    

    //3. Update the round score if the rolled number was not 1
    if ( dice1 !== 1 && dice2 !==1 ) {
        //Add score
        roundScores += dice1 + dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScores;
    }
    else {
        //Next Player
        
      nextPlayer();


    }



    }



} )


    document.querySelector('.btn-hold').addEventListener('click', function(){


        if (gamePlaying) {
        
                //Add current score to the global score

        scores[activePlayer] += roundScores;



        // Update the UI

        document.querySelector('#score-'+ activePlayer).textContent = scores [activePlayer];


        // Check if the player won

        var input = document.querySelector('.final-score').value;
        var Winngscore;
       
        // undefined, '0', null or "" ar coerced to False
        // Anything else is coerced to True

        if (input) {
            Winngscore= input;
        }
        else {
            Winngscore = 100;
        }

        if(scores[activePlayer] >= Winngscore )  {
            document.querySelector('#name-'+ activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;

        }
        else {
              // Next Player

        nextPlayer();
        }



        }

        


      



    })


    function nextPlayer () {
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScores = 0;

        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');


        document.getElementById('dice-1').style.display = 'none';
        document.getElementById('dice-2').style.display = 'none';
    }


    document.querySelector('.btn-new').addEventListener ('click', init )

    function init() {
        scores = [0,0];
        activePlayer = 0;
        roundScores = 0;
        gamePlaying = true;

        document.getElementById('dice-1').style.display = 'none';
        document.getElementById('dice-2').style.display = 'none';
        
        document.getElementById('score-0').textContent = '0';
        document.getElementById('score-1').textContent = '0';
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        document.getElementById('name-0').textContent = 'Player 1';
        document.getElementById('name-1').textContent = 'Player 2';


        document.querySelector('.player-0-panel').classList.remove('winner');
        document.querySelector('.player-1-panel').classList.remove('winner');
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.remove('active');

        document.querySelector('.player-0-panel').classList.add('active');


    }

