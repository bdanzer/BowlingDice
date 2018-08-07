/**
 * Strike Class extends Dice
 * 1 = Strike
 * 2 = Blank
 * 5 = Blank
 * Other Numbers = Pins
 */
class Strike extends Dice {
    constructor(diceNumber, sides, type = 'Strike') {
        super(diceNumber, sides, type);
    }
};