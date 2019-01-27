function randomNumber(min, max) {
    return Math.random() * (max-min) + min;
}

class DNA {
    constructor() {
        this.genes = [];
        this.fitness = 0;

        this.genes.push(this.speed); // X
        this.genes.push(this.speed); // Y
    }

    updateGenes(mutateX, mutateY) {
        console.log("x: " + this.genes[0] + " y: " + this.genes[1]);

        this.genes = [];
        let x = randomNumber(mutateX - 0.25, mutateX + 0.25);
        let y = randomNumber(mutateY - 0.25, mutateY + 0.25);

        this.genes.push(x);
        this.genes.push(y);

        console.log("x: " + this.genes[0] + " y: " + this.genes[1]);
        console.log("---");
    }

    get speed() {
        return randomNumber(-3,3);
    }
}

export default DNA;