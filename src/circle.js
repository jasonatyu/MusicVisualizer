const Shape = require('./shape');
const Utils = require('./utils');

class Circle extends Shape {
    constructor(x, y, color, radius) {
        super(x, y, color);
        this.radius = radius;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color; 
        ctx.fill();
    }

    static randomCircle(maxX, maxY, numCircles) {
        return new Circle(maxX * Math.random(), 
        maxY * Math.random(), 
        Utils.randomColor(), 1
        )
    }

    // static radius(maxX, maxY, numCircles) {
    //     // let targetCircleArea = (maxX * maxY) / numCircles;
    //     // let targetRadius = Math.sqrt(targetCircleArea / Math.PI);
    //     // return 2 * targetRadius;
    //     return 1;
    // }

    moveRandom(maxX, maxY) {
        let dx = Math.random();
        let dy = Math.random();
        this.x = Math.abs((this.x + (dx * this.radius * 0.1)) % maxX);
        this.y = Math.abs((this.y + (dy * this.radius * 0.1)) % maxY);
    }

    updateRadius(n, factor) {
        this.radius = n*factor;
    }

}

module.exports = Circle; 