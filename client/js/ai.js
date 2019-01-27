import RNG from "./rng";

class Ai {
    constructor(dna) {
        this.xSpeed = dna.genes[0];
        this.ySpeed = dna.genes[1];
        this.dna = dna;
        this.size = 20;
        this.color = 240;
        this.x = dna.pos.x;
        this.y = dna.pos.y;
        //this.generatePoint();
    }

    get half() {
        return this.size / 2;
    }

    reset() {
        this.xSpeed = this.dna.genes[0];
        this.ySpeed = this.dna.genes[1];
        this.x = this.dna.pos.x;
        this.y = this.dna.pos.y;
    }

    generatePoint() {
        this.x = RNG.getRandomInt(100, 800);
        this.y = RNG.getRandomInt(100, 800);
    }

    getDistance(x1, y1, x2, y2) {
        return Math.hypot(x2-x1, y2-y1);
    }

    calculateFitness(goal) {
        this.fitness = this.getDistance(this.x, this.y, goal.x, goal.y);
    }

    correctCoord(val) {
        return val >= 900 - this.half ? 900 - this.half : 0 + this.half;
    }

    isCoordOutOfBounds(val) {
        return val < 0 + this.half || val - this.half >= 900;
    }

    update() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if(this.isCoordOutOfBounds(this.x) === true) {
            this.x = this.correctCoord(this.x);
        }
        if(this.isCoordOutOfBounds(this.y) === true) {
            this.y = this.correctCoord(this.y);
        }
    }

    render() {
        fill(this.color);
        ellipse(this.x, this.y, 20, 20);
    }
}

export default Ai;