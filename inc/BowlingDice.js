/**
 * BowlingDiceGame, inits the game
 */
class BowlingDice {
    static startGame() 
    {
        Scoreboard.init();
        this.frame = 1;
        document.getElementById('roll-dice').addEventListener("click", e => { 
            e.preventDefault();
            if (this.frame < 10 || this.round == 1) {
                BowlingDice.setFrame();
                BowlingDice.setRound();
                BowlingDice.setDice();
                BowlingDice.shuffle();
                Scoreboard.readPins(this.frame, this.round);
            }
        });
    }

    static setFrame() 
    {
        if (this.round == 2) {
            this.frame = 1 + this.frame;
        }
        //document.getElementById('dice-frame').innerHTML = this.frame;
    }

    static setRound() 
    {
        if (!this.round || this.round == 2) {
            this.round = 1;
        } else if (this.round == 1) {
            this.round = 2;
        } 
        //document.getElementById('dice-round').innerHTML = this.round;
    }

    static setDice() 
    {
        if (this.round == 1) {
            this.strike = 3;
            this.spare = 3;
            this.blank = 4;
        } else {
            this.strike = document.getElementsByClassName('classStrike').length;
            this.spare = document.getElementsByClassName('classSpare').length;
            this.blank = document.getElementsByClassName('classBlank').length;
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
        let dice = document.getElementsByClassName('dice');

        if (dice.length) {
            let pen = document.getElementById('pins-pen');
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