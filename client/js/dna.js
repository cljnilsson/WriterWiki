import RNG from "./rng";

function angleFromVecToVec(vec1, vec2) {
    return vec1.sub(vec2);
}

function toSpeed(vec, multiplier = 2.5) {
    return vec.normalize().mult(multiplier);
}

class DNA {
    constructor() {
        this.genes = [];

        let speed = this.speed;

        this.multiplier = 2.5;

        this.genes.push(speed.x); // X
        this.genes.push(speed.y); // Y
    }

    updateGenes(mutation) {
        this.genes = [];
        let desired;

        let mutatedGoal = this.mutate(mutation); 

        this.multiplier += 0.1;

        desired         = angleFromVecToVec(mutatedGoal, this.pos);
        desired         = toSpeed(desired, this.multiplier);

        this.genes.push(desired.x);
        this.genes.push(desired.y);
    }

    mutate(vec) {
        let temp = createVector(vec.x, vec.y);
        temp.x  += this.offset;
        temp.y  += this.offset;
        return temp;
    }

    get offset() {
        return RNG.getRandomReal(-50, 50);
    }


    get speed() {
        let dest = createVector(this.posX, this.posY);
        let pos  = createVector(this.posX, this.posY);

        this.pos = pos;

        let desired;
        desired  = angleFromVecToVec(dest, pos);
        desired  = toSpeed(desired);

        return desired;
    }

    get posX() {
        return RNG.getRandomInt(100, 1900);
    }

    get posY() {
        return RNG.getRandomInt(100, 900);
    }
}

export default DNA;