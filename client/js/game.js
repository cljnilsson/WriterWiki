import GoalPoint from "./goal";
import Ai from "./ai";
import Population from "./population";
import _ from "lodash";

class Game {
    constructor(sizeX, sizeY) {
        this.goal = new GoalPoint();
        this.ais  = [];
        this.pop  = new Population(2, 0, 15);
        this.width = sizeX;
        this.height = sizeY;

        for(let dna of this.pop.population) {
            //console.log(dna);
            let ai = new Ai(this, dna);
            this.ais.push(ai);
        }

    }

    calculateFitness() {
        for(let ai of this.ais) {
            ai.calculateFitness(this.goal);

        }
    }

    naturalSelection() {
        let top = [{bestFitness: 999999}];
        let grab = 3;

        for(let ai of this.ais) {
            for(let ele of top) {
                if(ai.bestFitness <= ele.bestFitness) {
                    top.push(ai);
                    top = _.sortBy(top, [(ai) => {return ai.bestFitness}]);
                    top = top.slice(0, grab);
                    break;
                }
            }
        }

        this.selection = top;
        return top;
    }

    mutate() {
        let pos        = createVector(0, 0);
        let averagePos = createVector(0, 0);

        for(let ai of this.selection) {
            console.log(ai);
            pos.x += ai.bestFitnessPos.x;
            pos.y += ai.bestFitnessPos.y;
        }

        averagePos.x = pos.x / this.selection.length;
        averagePos.y = pos.y / this.selection.length;

        this.mutation = averagePos;
    }

    repopulate() {
        this.pop.repopulate(this.mutation);
        for(let ai of this.ais) {
            ai.reset();
        }
    }
}

export default Game;