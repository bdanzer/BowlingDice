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
        let html = `
            <div id="frame-${iterator}" class="square">
                <div class="frames">${iterator}</div>
                <div class="little-square left"></div>
                <div class="little-square right"></div>
                <div class="wide-square"></div>
            </div>
        `,
            scoreboard = document.getElementById('bowling-score');
        
        scoreboard.insertAdjacentHTML('beforeend', html);
    }

    static readPins(frame, round) 
    {
        let faceSpares = document.querySelectorAll('#dice-game .faceSpare'),
            faceStrikes = document.querySelectorAll('#dice-game .faceStrike'),
            faceBlanks = document.querySelectorAll('#dice-game .faceBlank'),
            value = '',
            side = '';

        BowlingDice.movePins(faceBlanks);

        if (round === 1) {
            side = 'left';

            if (round !== 10) {
                this.generateFrame(frame);
            }

            BowlingDice.movePins(faceSpares);
            
            if (faceStrikes.length) {
                value = 'X';
                if (frame === 10) {
                    BowlingDice.round = 0;
                    round = 0;
                } else {
                    BowlingDice.round++;
                }
            } else {
                value = faceBlanks.length  + faceSpares.length;
            }
        } else if (round === 2) {
            BowlingDice.movePins(faceStrikes);
            side = 'right';
            if (faceSpares.length) {
                value = '/';
            } else {
                value = faceBlanks.length + faceStrikes.length;
            }
        }

        this.writeScore(frame, value, side);
    }

    static writeScore(frame, value, side) 
    {
        let buildClass = `#frame-${frame} .little-square.${side}`;
        
        document.querySelector(buildClass).innerHTML = value;
        this.saveScore(frame, value);
        console.log(this.frames);
    }

    static saveScore(frame, value) 
    {
        let result = 'pins',
            frameRound = `frame${frame}`;

        if (value === 'X') {
            value = 10;
            result = 'strike';
        } else if (value === '/') {
            value = 10 - this.frames[frameRound]['pins'][0];
            result = 'spare';
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
            let frameRound = `frame${i}`,
                strike = this.frames[frameRound]['strike'],
                spare = this.frames[frameRound]['spare'],
                pins = this.frames[frameRound]['pins'],
                target = document.querySelector(`#frame-${i} .wide-square`);

            if (target.innerHTML) 
                continue;

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
}