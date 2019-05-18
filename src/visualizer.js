const Rectangle = require('./rectangle');
const Circle = require('./circle');
const PulsingCircle = require('./pulsing_circle');
const Utils = require('./utils');

class Visualizer {
    constructor(analyzer) {
        this.analyzer = analyzer;
        this.bufferLength = this.analyzer.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);
        this.analyzer.fftSize = 2048;
        this.peak = 50;
    }

    resetPeak() {
        console.log('peak reset');
        this.peak = 50;
    }

    draw(fillStyle, canvas, ctx) { 
        ctx.fillStyle = fillStyle;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.analyzer.getByteFrequencyData(this.dataArray);
        const rms = Utils.getRMS(this.dataArray);
        
        const circle = new Circle(150, 150, "white", rms);
        circle.draw(ctx);

        //pulse circlular
        if (rms > (this.peak * .98)) {
            let circle2 = new PulsingCircle(circle.x, circle.y, "white", rms, ctx);
            circle2.draw();
            this.peak = rms;
        }

        // start at top left of circle; 
        ctx.save();
        ctx.translate(150, 150);

        let bars = 360;
        for (let i = 0; i < 360; i += (360/bars)) {
            const barWidth = (2 * Math.PI * rms) / bars;
            const barHeight = (canvas.height * (this.dataArray[i] / 255));
            ctx.rotate(1 * Math.PI / 180);
            const grd = ctx.createLinearGradient(0, 0, canvas.height, 0)
            grd.addColorStop(0, "red");
            grd.addColorStop(.5, "orange");
            grd.addColorStop(1, "white");
            const rect = new Rectangle(rms, -barWidth / 2, grd, barHeight * 2, barWidth)
            rect.draw(ctx);
        }
        ctx.restore();
    }
}

module.exports = Visualizer;