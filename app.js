//BowlingDice.startGame(); 

let count = 1,
    highscore = 0;

BowlingDice.preGame();

while (Scoreboard.globalScore !== 300) {
    if (!BowlingDice.gameOver) {
        BowlingDice.setFrame();
        BowlingDice.setRound();
        BowlingDice.setDice();
        BowlingDice.shuffle();
        Scoreboard.readPins(BowlingDice.frame, BowlingDice.round);
    } else {
        if (Scoreboard.globalScore === 300) {
            console.log(count);
        } else {
            count++;
        }

        const parent = document.getElementById("bowling-score");
        while (parent.firstChild) {
            parent.firstChild.remove();
        }

        if (Scoreboard.globalScore > highscore) {
            highscore = Scoreboard.globalScore;
            console.log('New Highscore: ' + highscore + ' on ' + count + ' times');
        }

        function hello_world(args, test) {
            args = [];
            return test;
            console.log('lol');
        }

        Scoreboard.frames = {};
        //console.log('Score: ' + Scoreboard.globalScore);
        Scoreboard.globalScore = 0;
        BowlingDice.cleanDice();
        BowlingDice.gameOver = false;
        BowlingDice.frame = 1;
        BowlingDice.round = 0;
    }   
}