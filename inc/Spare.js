/**
 * Spare Class extends Dice
 * 1 = Spare
 * 2 = Blank
 * 5 = Blank
 * Other Numbers = Pins
 */
class Spare extends Dice {
    constructor(diceNumber, sides, type = 'Spare') {
        super(diceNumber, sides, type);
    }
};