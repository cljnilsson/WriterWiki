class Ai {
    constructor(game, dna) {
        this.game           = game;
        this.xSpeed         = dna.genes[0];
        this.ySpeed         = dna.genes[1];
        this.dna            = dna;
        this.size           = 20;
        this.color          = 240;
        this.x              = dna.pos.x;
        this.y              = dna.pos.y;
        this.fitness        = 9999;
        this.bestFitness    = 9999;
    }

    get half() {
        return this.size / 2;
    }

    reset() {
        this.xSpeed = this.dna.genes[0];
        this.ySpeed = this.dna.genes[1];
        this.x      = this.dna.pos.x;
        this.y      = this.dna.pos.y;
    }

    getDistance(x1, y1, x2, y2) {
        return Math.hypot(x2-x1, y2-y1);
    }

    calculateFitness(goal) {
        this.fitness = this.getDistance(this.x, this.y, goal.x, goal.y);
        if(this.fitness <= this.bestFitness) {
            this.bestFitness = this.fitness;
            this.bestFitnessPos = createVector(this.x, this.y);
        }
    }

    correctCoord(val, max) {
        return val >= max - this.half ? max - this.half : 0 + this.half;
    }

    correctCoordX(val) {
        return this.correctCoord(val, this.game.width);
    }

    correctCoordY(val) {
        return this.correctCoord(val, this.game.height);
    }

    isCoordOutOfBounds(val, max) {
        return val < 0 + this.half || val - this.half >= max;
    }

    isCoordOutOfBoundsX(val) {
        return this.isCoordOutOfBounds(val, this.game.width);
    }

    isCoordOutOfBoundsY(val) {
        return this.isCoordOutOfBounds(val, this.game.height);
    }

    update() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if(this.isCoordOutOfBounds(this.x) === true) {
            this.x = this.correctCoordX(this.x);
        }
        if(this.isCoordOutOfBounds(this.y) === true) {
            this.y = this.correctCoordY(this.y);
        }
    }

    render() {
        fill(this.color);
        ellipse(this.x, this.y, 20, 20);
    }
}

export default Ai;