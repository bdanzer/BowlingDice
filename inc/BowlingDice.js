/**
 * BowlingDiceGame, inits the game
 */
class BowlingDice {
    static startGame() 
    {
        document.getElementById('roll-dice').addEventListener("click", e => { 
            e.preventDefault();
            BowlingDice.setFrames();
            BowlingDice.setRound();
            BowlingDice.setDice();
            BowlingDice.shuffle();
            BowlingDice.readPins();
        });
    }

    static setFrames() 
    {
        if (!this.round) {
            this.frames = 1;
        }

        document.getElementById('dice-frame').innerHTML = this.frames;
    }

    static setRound() 
    {
        if (!this.round || this.round == 2) {
            this.round = 1;
        } else if (this.round == 1) {
            this.round = 2;
            this.frames = 1 + this.frames;
        } 

        document.getElementById('dice-round').innerHTML = this.round;
    }

    static readPins() 
    {
        var faceSpares = document.getElementsByClassName('faceSpare');
        var faceStrikes = document.getElementsByClassName('faceStrike');

        if (this.round == 1 && faceSpares.length) {
            BowlingDice.movePins(faceSpares);
        } else if (this.round == 2 && faceStrikes.length) {
            BowlingDice.movePins(faceStrikes);
        }

        var faceBlanks = document.getElementsByClassName('faceBlank');
        BowlingDice.movePins(faceBlanks);
    }

    static setDice() 
    {
        if (this.round == 1) {
            this.strike = 3;
            this.spare = 3;
            this.blank = 4;
        } else {
            this.strike = document.getElementsByClassName('classStrike');
            this.spare = document.getElementsByClassName('classSpare');
            this.blank = document.getElementsByClassName('classBlank');

            this.strike = this.strike.length;
            this.spare = this.spare.length;
            this.blank = this.blank.length;
        }
    }

    static shuffle() 
    {
        if (document.getElementsByClassName('dice').length) {
            BowlingDice.clean();
        }
        new Strike(this.strike);
        new Spare(this.spare);
        new Blank(this.blank);
    }
    
    static movePins(pins) 
    {
        var dice = document.getElementsByClassName('dice');

        if (dice.length) {
            var pen = document.getElementById('pins-pen');
            for (let i = pins.length - 1; i >= 0; --i) {
                pins[i].className = `dice ${pins[i].getAttribute('dice-face')}`;
                pen.appendChild(pins[i]);
            }
        }
    }

    static clean() 
    {
        document.getElementById('dice-game').innerHTML = null;
        if (this.round == 1) {
            document.getElementById('pins-pen').innerHTML = null; 
        }
    }
}