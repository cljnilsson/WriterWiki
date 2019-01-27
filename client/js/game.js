import GoalPoint from "./goal";
import Ai from "./ai";
import Population from "./population";

class Game {
    constructor() {
        this.goal = new GoalPoint();
        this.ais = [];

        this.pop = new Population(2, 0, 20);

        for(let dna of this.pop.population) {
            console.log(dna);
            let ai = new Ai();

            ai.xSpeed = dna.genes[0];
            ai.ySpeed = dna.genes[1];

            this.ais.push(ai);
        }

    }

    normailize(val, min, max) { return (val - min) / (max - min); }

    getDistance(x1, y1, x2, y2) {
        return Math.hypot(x2-x1, y2-y1);
    }

    calculateFitness() {
        let lowestCount = 99999;
        let lowest;

        for(let ai of this.ais) {
            let dist = this.getDistance(ai.x, ai.y, this.goal.x, this.goal.y);
            if(dist <= lowestCount) {
                lowestCount = dist;
                lowest = ai;
            }
        }
        console.log("---")
        console.log(this.normailize(lowestCount, 0, 900));

        lowest.color = 200;
    }
}

export default Game;