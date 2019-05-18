const Circle = require('./circle');

class PulsingCircle extends Circle {
    constructor(x, y, color, radius, ctx) {
        super(x, y, color, radius);
        this.ctx = ctx;
        this.currentRadius = this.radius;
    }
    
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.currentRadius, 0, 2 * Math.PI);
        this.ctx.strokeStyle = "rgba(255, 255, 255, " + this.currentRadius/500 + ")"
        this.ctx.lineWidth = this.currentRadius *.01;
        this.ctx.stroke();
        this.currentRadius *= 1.1; 
        if (this.currentRadius < 2000) {
            requestAnimationFrame(this.draw.bind(this));
        }
    }
}

module.exports = PulsingCircle;