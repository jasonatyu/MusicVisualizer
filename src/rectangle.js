const Shape = require('./shape');

class Rectangle extends Shape {
    constructor(x, y, color, width, height) {
        super(x, y, color);
        this.width = width;
        this.height = height;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
    } 
}

module.exports = Rectangle;