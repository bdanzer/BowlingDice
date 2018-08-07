/**
 * Parent Dice Class
 * Need class sixed sided dice to change
 */
class Dice {
    constructor(diceNumber, sides = 6, type = 'Dice') 
    {
        this.diceNumber = diceNumber;
        this.sides = sides;
        this.type = type;

        this.diceType();
        this.diceRoll();
    }
    
    diceRoll() 
    {
        for (let i = 0; i < this.diceNumber; i++) {
            var randomNumber = Math.floor(Math.random() * this.sides) + 1;
            this.diceValue(randomNumber);
        }  
    }

    diceType() 
    {
        if (this.type !== this.constructor.name) {
            return true;
        }
        return false;
    }

    diceValue(diceValue) 
    {
        switch (diceValue) {
            case 1:
                this.render(this.constructor.name);
                break;
            case 2: 
            case 5:
                this.render('Blank');
                break;
            default:
                this.render('Pin');
                break;
        }
    }

    render(diceFace) 
    {
        var html = `<img class="dice class${this.constructor.name} face${diceFace}" dice-face="face${diceFace}" src="./pics/${diceFace}.png">`,
            diceGame = document.getElementById('dice-game');

        diceGame.insertAdjacentHTML('beforeend', html);
    }
};