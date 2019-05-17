const Circle = require('./circle');

NUM_CIRCLES = 1000; 

class DrunkenCircles {
    constructor(canvas, ctx, analyzer) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.analyzer = analyzer;
        this.bufferLength = this.analyzer.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);
        this.analyzer.fftSize = 1024;

        this.circles = [];
        for (let i = 0; i < NUM_CIRCLES; i++) {
            this.circles.push(Circle.randomCircle(this.canvas.width, this.canvas.height, NUM_CIRCLES));
        }
    }

    moveCircles() {
        this.circles.forEach((circle) => circle.moveRandom(this.canvas.width, this.canvas.height))
    }

    updateRadius(rms) {
        this.circles.forEach((circle) => circle.updateRadius(rms))
    }

    draw() {
        requestAnimationFrame(this.draw.bind(this));
        this.analyzer.getByteFrequencyData(this.dataArray);
        const rms = this.getRMS(this.dataArray);
        this.ctx.fillStyle = "#272B34";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.circles.forEach((circle) => circle.draw(this.ctx));
        this.moveCircles();
        this.updateRadius(rms);
    }

    getRMS(arr) {
        let values = 0;
        for (let i = 0; i < arr.length; i++) {
            values += arr[i] * arr[i];
        }
        rms = Math.sqrt(values / arr.length);
        return rms;
    }

}

module.exports = DrunkenCircles;