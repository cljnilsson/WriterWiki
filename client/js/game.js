import GoalPoint from "./goal";
import Ai from "./ai";
import Population from "./population";
import _ from "lodash";

class Game {
    constructor() {
        this.goal = new GoalPoint();
        this.ais = [];
        this.pop = new Population(2, 0, 10);

        for(let dna of this.pop.population) {
            //console.log(dna);
            let ai = new Ai(dna);
            this.ais.push(ai);
        }

    }

    calculateFitness() {
        for(let ai of this.ais) {
            ai.calculateFitness(this.goal);

        }
    }

    naturalSelection() {
        let top = [{fitness: 9999}];
        let grab = 3;

        for(let ai of this.ais) {
            for(let ele of top) {
                if(ai.fitness <= ele.fitness) {
                    top.push(ai);
                    top = _.sortBy(top, [(ai) => {return ai.fitness}]);
                    top = top.slice(0, grab);
                    break;
                }
            }
        }

        for(let ai of top) {
            ai.color = 50;
        }

        this.selection = top;
        return top;
    }

    mutate() {
        let pos        = createVector(0, 0);
        let averagePos = createVector(0, 0);

        for(let ai of this.selection) {
            pos.x += ai.x;
            pos.y += ai.y;
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