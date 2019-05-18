const Circle = require('./circle');
const Rectangle = require('./rectangle');
const Utils = require('./utils');

NUM_CIRCLES = 2000; 

class MovingCircles {
    constructor(canvas, analyzer) {
        this.canvas = canvas;
        this.analyzer = analyzer;
        this.bufferLength = this.analyzer.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);
        this.analyzer.fftSize = 1024;
        this.circles = [];
        for (let i = 0; i < NUM_CIRCLES; i++) {
            this.circles.push(Circle.randomCircle(canvas.width, canvas.height, NUM_CIRCLES));
        }
    }

    moveCircles(canvas) {
        this.circles.forEach((circle) => circle.moveRandom(this.canvas.width, this.canvas.height))
    }

    updateRadius(rms) {
        this.circles.forEach((circle) => circle.updateRadius(rms, .03))
    }

    draw(fillStyle, ctx) {
        ctx.fillStyle = fillStyle;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.analyzer.getByteFrequencyData(this.dataArray);
        const rms = Utils.getRMS(this.dataArray);
        this.circles.forEach((circle) => circle.draw(ctx));
        this.moveCircles();
        this.updateRadius(rms);
    }
}

module.exports = MovingCircles;