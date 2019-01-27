import "./css/main.css";
import "p5/lib/p5.min";

import Game from "./js/game";

let game = new Game();
let pause = false;

window.setup = () => {
    createCanvas(900, 900);
    startTimer();
}

window.draw = () => {
    background(220);

    for(let a of game.ais) {
        if(pause === false) {
            a.update();
        }
        a.render();
    }

    game.goal.render();
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function startTimer() {
    await timeout(2000);
    console.log(game);
    game.calculateFitness();
    game.naturalSelection();

    console.log(game.selection[0].fitness);
    if(game.selection[0].fitness <= 25) {
        console.log("finished!");
        console.log(game.selection[0]);
        game.selection[0].color = 0;
        pause = true;
    } else {
        game.mutate();
        game.repopulate();
        pause = true;
        await timeout(1000);
        pause = false;
        startTimer();
    }
}