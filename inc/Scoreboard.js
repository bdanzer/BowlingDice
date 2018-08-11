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
        `;
        let scoreboard = document.getElementById('bowling-score');
        
        scoreboard.insertAdjacentHTML('beforeend', html);
    }

    static readPins(frame, round) 
    {
        let faceSpares = document.querySelectorAll('#dice-game .faceSpare'),
            faceStrikes = document.querySelectorAll('#dice-game .faceStrike'),
            faceBlanks = document.querySelectorAll('#dice-game .faceBlank');

        if (round == 1) {
            this.generateFrame(frame);
            BowlingDice.movePins(faceSpares);
            if (faceStrikes.length) {
                this.writeScore(frame, 'X', 'left');
                BowlingDice.round++;
            } else {
                this.writeScore(frame, faceBlanks.length  + faceSpares.length, 'left');
            }
        } else if (round == 2) {
            BowlingDice.movePins(faceStrikes);
            if (faceSpares.length) {
                this.writeScore(frame, '/', 'right');
            } else {
                this.writeScore(frame, faceBlanks.length + faceStrikes.length, 'right');
            }
        }
    
        BowlingDice.movePins(faceBlanks);
    }

    static writeScore(frame, value, side) 
    {
        let buildClass = `#frame-${frame} .little-square.${side}`;
        document.querySelector(buildClass).innerHTML = value;
        this.saveScore(frame, value);
    }

    static saveScore(frame, value) 
    {
        let result = '',
            frameRound = `frame${frame}`;

        if (value === 'X') {
            value = 10;
            result = 'strike';
        } else if (value === '/') {
            value = 10 - this.frames[frameRound]['pins'][0];
            result = 'spare';
        } else {
            result = 'pins';
        }

        if (!checkNested(this.frames, [frameRound])) {
            this.frames[frameRound] = {};
            this.frames[frameRound] = Object.assign(this.frames[frameRound], { [result] : [] });
        }

        this.scoreScheduler(frame, value);
    }

    static scoreScheduler(frame, value) 
    {    
        let reduce = (accumulator, currentValue) => accumulator + currentValue;

        for (let i = 1; i <= frame; i++) {
            let frameRound = `frame${i}`,
                strike = this.frames[frameRound]['strike'],
                spare = this.frames[frameRound]['spare'],
                pins = this.frames[frameRound]['pins'],
                target = document.querySelector(`#frame-${i} .wide-square`);

            if (target.innerHTML) 
                continue;

            if (strike) {
                if (strike.length === 3) {
                    this.setScore(target, strike.reduce(reduce));
                } else {
                    strike.push(value);
                }
            } else if (spare) {
                if (spare.length === 2) {
                    this.setScore(target, spare.reduce(reduce) + pins[0]);
                } else {
                    spare.push(value);
                }
            } else {
                if (pins.length === 2) {
                    this.setScore(target, pins.reduce(reduce));
                } else {
                    console.log(value);
                    pins.push(value);
                }
            }
        }
    }

    static setScore(target, score) 
    {
        this.globalScore = this.globalScore + score;
        target.innerHTML = this.globalScore;
    }
}