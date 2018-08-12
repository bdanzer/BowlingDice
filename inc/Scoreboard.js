/**
 * Scoreboard class for handling scoreboard generation
 */

class Scoreboard {
    static init() 
    {   
        this.frames = {};
        this.globalScore = 0;
    }

    static generateFrame(iterator) 
    {
        let html,
            scoreboard = document.getElementById('bowling-score');

        html = `
            <div id="frame-${iterator}" class="square">
                <div class="frames">${iterator}</div>
                <div class="little-square left"></div>
                <div class="little-square middle"></div>
                <div class="little-square right"></div>
                <div class="wide-square"></div>
            </div>
        `;
        scoreboard.insertAdjacentHTML('beforeend', html);
    }

    static readPins(frame, round) 
    {
        let value,
            side;

        this.faceSpares = document.querySelectorAll('#dice-game .faceSpare');
        this.faceStrikes = document.querySelectorAll('#dice-game .faceStrike');
        this.faceBlanks = document.querySelectorAll('#dice-game .faceBlank');

        BowlingDice.movePins(this.faceBlanks);

        switch (round) {
            case 1:
                this.generateFrame(frame);
                side = this.handle_sides(round);
                value = this.handle_strikes();
                break;
            case 2:
                side = this.handle_sides(round);
                value = this.handle_spares();
                break;
            case 3:
                side = this.handle_sides(round);
                value = this.handle_final_round();
                BowlingDice.gameOver = true;
                break;
        }

        this.writeScore(frame, value, side);
        this.saveScore(frame, value);
    }

    static handle_sides(round) 
    {
        let side;

        if (BowlingDice.frame === 10) {
            return this.handle_sides_tenth(round);
        }

        if (round === 1) {
            side = 'left';
        } else if (round === 2) {
            side = 'right';
        }

        return side;
    }

    static handle_sides_tenth(round) 
    {
        let side;

        if (round === 1) {
            side = 'left';
        } else if (round === 2) {
            side = 'middle';
        } else if (round === 3) {
            side = 'right';
        }

        return side;
    }

    static handle_strikes() 
    {
        BowlingDice.movePins(this.faceSpares);

        let value = this.faceBlanks.length  + this.faceSpares.length;

        if (this.faceStrikes.length) {
            value = 'X';
            if (!BowlingDice.isTenthFrame()) {
                BowlingDice.round++;
            }
        }
        return value;
    }
    
    static handle_spares() 
    {
        BowlingDice.movePins(this.faceStrikes);
        
        let value = (this.faceSpares.length) ? '/' : this.faceBlanks.length + this.faceStrikes.length;        
        return value;
    }

    static handle_final_round() 
    {
        let value = document.querySelector('#frame-10 .little-square.left').innerHTML;

        switch (value) {
            case 'X':
                value = this.handle_strikes();
                break;
        
            case '/':
                value = this.handle_spares();
                break;

            default:
                value = null;
                break;
        }
        return value;
    }

    static writeScore(frame, value, side) 
    {
        let buildClass = `#frame-${frame} .little-square.${side}`;
        document.querySelector(buildClass).innerHTML = value;
    }

    static saveScore(frame, value) 
    {
        let result = 'pins',
            frameRound = `frame${frame}`;

        switch (value) {
            case 'X':
                value = 10;
                result = 'strike';
                break;
            case '/':
                value = 10 - this.frames[frameRound]['pins'][0];
                result = 'spare';
                break;
        }

        if (!checkNested(this.frames, [frameRound])) {
            this.frames[frameRound] = {};
            this.frames[frameRound] = Object.assign(this.frames[frameRound], { [result] : [] });
        }

        this.scoreScheduler(frame, value);
    }

    static scoreScheduler(frame, value) 
    {    
        for (let i = 1; i <= frame; i++) {
            let target = document.querySelector(`#frame-${i} .wide-square`);
            if (target.innerHTML) 
                continue;

            let frameRound = `frame${i}`,
                strike = this.frames[frameRound]['strike'],
                spare = this.frames[frameRound]['spare'],
                pins = this.frames[frameRound]['pins'];

            if (strike) {
                this.validateScheduler(strike, 3, value, target);
            } else if (spare) {
                this.validateScheduler(spare, 2, value, target, pins[0]);
            } else {
                this.validateScheduler(pins, 2, value, target);
            }

        }
    }

    static validateScheduler(result, numberValidator, value, target, spare = '') 
    {
        let reduce = (accumulator, currentValue) => accumulator + currentValue;

        if (BowlingDice.isFinalRound() || (result.length !== numberValidator))
            result.push(value);

        if (BowlingDice.isFinalRound() || (result.length === numberValidator)) {
            this.setScore(target, result.reduce(reduce) + (spare ? spare : 0));
        } 
    }

    static setScore(target, score) 
    {
        this.globalScore = this.globalScore + score;
        target.innerHTML = this.globalScore;
    }
}