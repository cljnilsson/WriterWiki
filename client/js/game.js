import GoalPoint from "./goal";
import Ai from "./ai";
import Population from "./population";
import _ from "lodash";

class Game {
    constructor() {
        this.goal = new GoalPoint();
        this.ais = [];
        this.pop = new Population(2, 0, 12);

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
        let totalX = 0;
        let totalY = 0;
        let averageX;
        let averageY;

        for(let ai of this.selection) {
            totalX += ai.xSpeed;
            totalY += ai.ySpeed;
        }

        averageX = totalX / this.selection.length;
        averageY = totalY / this.selection.length;

        this.mutateX = averageX;
        this.mutateY = averageY;
    }

    repopulate() {
        this.pop.repopulate(this.mutateX, this.mutateY);
        this.ais = [];
        for(let dna of this.pop.population) {
            let ai = new Ai(dna);
            this.ais.push(ai);
        }
    }
}

export default Game;