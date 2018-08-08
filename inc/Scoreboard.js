/**
 * Scoreboard class for handling scoreboard generation
 */

class Scoreboard {
    static generateFrame(iterator) 
    {
        var html = `
        <div id="frame-${iterator}" class="square">
            <div class="frames">${iterator}</div>
            <div class="little-square left"></div>
            <div class="little-square right"></div>
            <div class="wide-square"></div>
        </div>
        `;
        
        var scoreboard = document.getElementById('bowling-score');
        scoreboard.insertAdjacentHTML('beforeend', html);
    }

    static readPins(frame, round) 
    {
        var faceSpares = document.querySelectorAll('#dice-game .faceSpare'),
            faceStrikes = document.querySelectorAll('#dice-game .faceStrike'),
            faceBlanks = document.querySelectorAll('#dice-game .faceBlank');

        if (round == 1) {
            Scoreboard.generateFrame(frame);
            BowlingDice.movePins(faceSpares);
            if (faceStrikes.length) {
                Scoreboard.writeScore(frame, 'X', 'left');
                BowlingDice.round++;
            } else {
                Scoreboard.writeScore(frame, faceBlanks.length  + faceSpares.length, 'left');
            }
        }

        if (round == 2) {
            BowlingDice.movePins(faceStrikes);
            if (faceSpares.length) {
                Scoreboard.writeScore(frame, '/', 'right');
            } else {
                Scoreboard.writeScore(frame, faceBlanks.length + faceStrikes.length, 'right');
            }
        }
    
        BowlingDice.movePins(faceBlanks);
    }

    static writeScore(frame, value, side) 
    {
        var buildClass = `#frame-${frame} .little-square.${side}`;
        document.querySelector(buildClass).innerHTML = value;
    }

    static calculateScore() 
    {
        
    }
}