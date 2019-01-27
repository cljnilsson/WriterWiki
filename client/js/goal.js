class GoalPoint {
    constructor() {
        this.generatePoint();
    }

    generatePoint() {
        this.x = 300;
        this.y = 300;
    }

    render() {
        fill(180);
        ellipse(this.x, this.y, 20, 20);
    }
}

export default GoalPoint;