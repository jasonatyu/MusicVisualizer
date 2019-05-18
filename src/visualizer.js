const Rectangle = require('./rectangle');
const Circle = require('./circle');
const PulsingCircle = require('./pulsing_circle');

class Visualizer {
    constructor(analyzer) {
        this.analyzer = analyzer;
        this.bufferLength = this.analyzer.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);
        this.analyzer.fftSize = 2048;
        this.peak = 50;
    }

    draw(fillStyle, canvas, ctx) { 
        ctx.fillStyle = fillStyle;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.analyzer.getByteFrequencyData(this.dataArray);
        const rms = this.getRMS(this.dataArray);
        
        let barWidth = (canvas.width / this.bufferLength) * 10;
        let barHeight;
        let x = 0;

        for (let i = 0; i < this.bufferLength; i++) {
            barHeight = canvas.height * (this.dataArray[i]/255);
            // const r = 255 * (this.dataArray[i] / 255);
            // const g = 255 * (i / this.bufferLength);
            // const b = 255 * (i / this.bufferLength);

            const grd = ctx.createLinearGradient(0, 0, canvas.width, 0)
            grd.addColorStop(0, "blue");
            grd.addColorStop(.8, "green");
            grd.addColorStop(1, "white");

            // let rect = new Rectangle(x, canvas.height - barHeight, "rgb(" + r + "," + g + "," + b + ")", barWidth, barHeight)
            let rect = new Rectangle(x, (canvas.height - barHeight)+200, grd, barWidth, barHeight)
            rect.draw(ctx);
            x += barWidth + 1;
        }

        const circle = new Circle(100, 100, "white", rms);
        circle.draw(ctx);

        // start at top left of circle; 
        ctx.save();
        ctx.translate(100, 100);

        let bars = 180;
        for (let i = 0; i < 360; i += (360/bars)) {
            const barWidth = (2 * Math.PI * rms) / bars;
            const barHeight = (canvas.height * (this.dataArray[i] / 255)) * .8;
            ctx.rotate(2 * Math.PI / 180);
            const grd = ctx.createLinearGradient(0, 0, canvas.height*.8, 0)
            grd.addColorStop(0, "red");
            grd.addColorStop(.5, "orange");
            grd.addColorStop(1, "white");
            const rect = new Rectangle(rms, -barWidth / 2, grd, barHeight, barWidth)
            rect.draw(ctx);
        }
        ctx.restore();

        //pulse circlular rings 
        if (rms > (this.peak * .98)) {
            let circle2 = new PulsingCircle(100, 100, "white", rms, ctx);
            circle2.draw();
            this.peak = rms;
        }
    }

    getRMS(arr) {
        let values = 0;
        for (let i = 0; i < arr.length; i++) {
            values += arr[i] * arr[i];
        }
        rms = Math.sqrt(values/arr.length);
        return rms;
    }
}

module.exports = Visualizer;