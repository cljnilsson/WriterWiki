function randomNumber(min, max) {
    return Math.random() * (max-min) + min;
}

class DNA {
    constructor(target) {
        this.genes = [];
        this.fitness = 0;

        for(let i = 0; i < target; i++) {
            this.genes.push(this.speed); // X
        }
    }

    get speed() {
        return randomNumber(-3,3);
    }
}

export default DNA;