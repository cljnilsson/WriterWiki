import DNA from "./dna";

class Population {
    constructor(target, mutationRate, popmax) {
        this.population = [];
        this.popmax = popmax;

        for(let i = 0; i < popmax; i++) {
            let dna = new DNA(target);
            this.population.push(dna);
        }
    }

    repopulate(mutation) {
        for(let dna of this.population) {
            dna.updateGenes(mutation);
        }
    }
}

export default Population;