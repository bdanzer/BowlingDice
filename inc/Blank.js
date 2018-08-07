/**
 * Blank Class extends Dice
 * 1 = Blank
 * 2 = Blank
 * 5 = Blank
 * Other Numbers = Pins
 */
class Blank extends Dice {
    constructor(diceNumber, sides, type = 'Blank') 
    {
        super(diceNumber, sides, type);
    }
};