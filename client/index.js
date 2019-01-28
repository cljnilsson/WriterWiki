import "./css/main.css";
import "p5/lib/p5.min";

import Game from "./js/game";

let game;
let pause = false;

window.setup = () => {
    game = new Game(1920, 1080);
    createCanvas(1920, 1080);
    startTimer();
}

window.draw = () => {
    background(220);

    for(let a of game.ais) {
        if(pause === false) {
            a.update();
            a.calculateFitness(game.goal);
            if(a.fitness <= 15) {
                pause = true;
                a.color = 0;
            }
        }
        a.render();

    }

    game.goal.render();

    if(game.mutation) {
        fill(0);
        ellipse(game.mutation.x, game.mutation.y, 5, 5);
    }
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function startTimer() {
    await timeout(2000);
    game.calculateFitness();
    game.naturalSelection();

    if(game.selection[0].fitness <= 15) {
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