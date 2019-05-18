const Circle = require('./circle');
const Rectangle = require('./rectangle');
const Utils = require('./utils');

class BeatingCircle {
    constructor(analyzer) {
        this.analyzer = analyzer;
        this.bufferLength = this.analyzer.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);
        this.analyzer.fftSize = 2048;
        this.peak = 50;
        this.currentRadius = this.radius;

        this.circles = [];
        for (let i = 0; i < NUM_CIRCLES; i++) {
            this.circles.push(Circle.randomCircle(canvas.width, canvas.height, NUM_CIRCLES));
        }
    }

    draw(fillStyle, canvas, ctx) {

        ctx.fillStyle = fillStyle;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.analyzer.getByteFrequencyData(this.dataArray);
        const rms = Utils.getRMS(this.dataArray);

        const circle = new Circle(300, 300, "white", rms);
        circle.draw(ctx);

        ctx.save();
        ctx.translate(circle.x, circle.y);

        let bars = 180;
        for (let i = 0; i < 360; i += (360 / bars)) {
            const barWidth = (2 * Math.PI * rms) / bars;
            const barHeight = (canvas.height * (this.dataArray[i] / 255)) * .1;
            ctx.rotate(2 * Math.PI / 180);
            const grd = ctx.createLinearGradient(0, 0, 300, 0)
            grd.addColorStop(0, "red");
            grd.addColorStop(.8, "orange");
            grd.addColorStop(1, "white");
            const rect = new Rectangle(rms, -barWidth / 2, grd, barHeight, barWidth)
            rect.draw(ctx);
        }
        ctx.restore();
    }
}

module.exports = BeatingCircle;

