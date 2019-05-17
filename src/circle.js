const Shape = require('./shape');

HEX_DIGITS = "0123456789ABCDEF";


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
        Circle.randomColor(),
        Circle.radius(maxX, maxY, numCircles)
        )
    }

    static randomColor() {
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += HEX_DIGITS[Math.floor((Math.random() * 16))];
        }
        return color;
    };

    static radius(maxX, maxY, numCircles) {
        let targetCircleArea = (maxX * maxY) / numCircles;
        let targetRadius = Math.sqrt(targetCircleArea / Math.PI);
        return 2 * targetRadius;
    }

    moveRandom(maxX, maxY) {
        let dx = (Math.random() * 2) - 1;
        let dy = (Math.random() * 2) - 1;
        this.x = Math.abs((this.x + (dx * this.radius * 0.1)) % maxX);
        this.y = Math.abs((this.y + (dy * this.radius * 0.1)) % maxY);
    }

    updateRadius(rms) {
        this.radius = rms*.5;
    }

}

module.exports = Circle; 