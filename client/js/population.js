import DNA from "./dna";

class Population {
    constructor(target, mutationRate, popmax) {
        this.population = [];

        for(let i = 0; i < popmax; i++) {
            this.population.push(new DNA(target));
        }
    }
}

export default Population;