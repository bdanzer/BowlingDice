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
                side = 'left';
                value = this.handle_strikes();
                break;
            case 2:
                BowlingDice.movePins(this.faceStrikes);
                side = 'right';
                value = this.handle_spares();
                break;
            case 3:
                break;
        }

        this.writeScore(frame, value, side);
        this.saveScore(frame, value);
    }

    static handle_strikes() 
    {
        let value;

        BowlingDice.movePins(this.faceSpares);

        if (this.faceStrikes.length) {
            value = 'X';
            BowlingDice.round++;
        } else {
            value = this.faceBlanks.length  + this.faceSpares.length;
        }
        return value;
    }
    
    static handle_spares() 
    {
        let value;

        value = (this.faceSpares.length) ? '/' : this.faceBlanks.length + this.faceStrikes.length;
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

        if (BowlingDice.isTenthFrame() || (result.length !== numberValidator))
            result.push(value);

        if (BowlingDice.isTenthFrame() || (result.length === numberValidator)) {
            this.setScore(target, result.reduce(reduce) + (spare ? spare : 0));
        } 
    }

    static setScore(target, score) 
    {
        this.globalScore = this.globalScore + score;
        target.innerHTML = this.globalScore;
    }

    static handleLastFrame() 
    {
        let value = document.querySelector('#frame-10 .little-square.left').innerHTML,
            target = document.querySelector(`#frame-10 .wide-square`);
        
        BowlingDice.round = 1;

        switch (BowlingDice.round) {
            case 1:
            case 2:
                if (value === 'X') {
                    movePins();
                } else if( value === '/') {
                    BowlingDice.round++;
                }
                break;
            case 3:
                break;
        }

        this.writeScore(10, value, side);

        BowlingDice.setDice();
        BowlingDice.shuffle();
    }
}