import RNG from "./rng";

function angleFromVecToVec(vec1, vec2) {
    return vec1.sub(vec2);
}

function toSpeed(vec) {
    return vec.normalize().mult(2);
}

class DNA {
    constructor() {
        this.genes = [];

        let speed = this.speed;

        this.genes.push(speed.x); // X
        this.genes.push(speed.y); // Y
    }

    updateGenes(mutation) {
        this.genes = [];
        let desired;

        let mutatedGoal = this.mutate(mutation); 

        desired         = angleFromVecToVec(mutatedGoal, this.pos);
        desired         = toSpeed(desired);

        this.genes.push(desired.x);
        this.genes.push(desired.y);
    }

    mutate(vec) {
        let temp = createVector(vec.x, vec.y);
        temp.x += this.offset;
        temp.y += this.offset;
        return temp;
    }

    get offset() {
        return RNG.getRandomReal(-0.25, 0.25);
    }

    get speed() {
        let dest = createVector(this.goal, this.goal);
        let pos = createVector(this.start, this.start);

        this.pos = pos;

        let desired;
        desired = angleFromVecToVec(dest, pos);
        desired = toSpeed(desired);

        return desired;
    }

    get goal() {
        return RNG.getRandomInt(100, 800);
    }

    get start() {
        return RNG.getRandomInt(100, 800);
    }
}

export default DNA;