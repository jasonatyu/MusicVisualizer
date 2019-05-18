const Circle = require('./circle');
const Rectangle = require('./rectangle');

class BeatingCircle {
    constructor(analyzer) {
        this.analyzer = analyzer;
        this.bufferLength = this.analyzer.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);
        this.analyzer.fftSize = 1024;
        this.peak = 50;
        this.currentRadius = this.radius;
    }

    draw(fillStyle, canvas, ctx) {

        ctx.fillStyle = fillStyle;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.analyzer.getByteFrequencyData(this.dataArray);
        const rms = this.getRMS(this.dataArray);

        const circle = new Circle(300, 300, "white", rms);
        circle.draw(ctx);

        ctx.save();
        ctx.translate(300, 300);

        let bars = 180;
        for (let i = 0; i < 360; i += (360 / bars)) {
            const barWidth = (2 * Math.PI * rms) / bars;
            const barHeight = (canvas.height * (this.dataArray[i] / 255)) * .1;
            ctx.rotate(2 * Math.PI / 180);
            const grd = ctx.createLinearGradient(0, 0, canvas.height, 0)
            grd.addColorStop(0, "red");
            grd.addColorStop(.2, "orange");
            grd.addColorStop(1, "white");
            const rect = new Rectangle(rms, -barWidth / 2, grd, barHeight, barWidth)
            rect.draw(ctx);
        }
        ctx.restore();

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

module.exports = BeatingCircle;

