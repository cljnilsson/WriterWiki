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
    game.calculateFitness();
    pause = true;
    await timeout(1000);
    game = new Game();
    pause = false;
    startTimer();
}