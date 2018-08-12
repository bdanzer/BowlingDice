//BowlingDice.startGame(); 

let count = 1;

BowlingDice.preGame();

while (Scoreboard.globalScore !== 300) {
    if (!BowlingDice.gameOver) {
        BowlingDice.setFrame();
        BowlingDice.setRound();
        BowlingDice.setDice();
        BowlingDice.shuffle();
        Scoreboard.readPins(BowlingDice.frame, BowlingDice.round);
    } else {
        console.log('waiting...');
        count++;
        console.log('count ' + count);

        
        for(let i = 1; i <= 10; i++) {
            let target = document.querySelector(`#frame-${i} .wide-square`);
            target.innerHTML = null;
        }

        Scoreboard.frames = {};
        console.log('score: ' + Scoreboard.globalScore);
        Scoreboard.globalScore = 0;
        BowlingDice.cleanDice();
        BowlingDice.gameOver = false;
        BowlingDice.frame = 1;
        BowlingDice.round = 1;
    }   
}