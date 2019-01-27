import RNG from "./rng";

class GoalPoint {
    constructor() {
        this.generatePoint();
    }

    generatePoint() {
        this.x = RNG.getRandomInt(300, 600);
        this.y = RNG.getRandomInt(300, 600);
    }

    render() {
        fill(180);
        ellipse(this.x, this.y, 20, 20);
    }
}

export default GoalPoint;