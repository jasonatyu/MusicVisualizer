const Rectangle = require('./rectangle');
const Utils = require('./utils');

class Bars {
    constructor(analyzer) {
        this.analyzer = analyzer;
        this.bufferLength = this.analyzer.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);
        this.analyzer.fftSize = 2048;
        this.peak = 50;
    }

    draw(fillStyle, canvas, ctx, options) { 
        ctx.fillStyle = fillStyle;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.analyzer.getByteFrequencyData(this.dataArray);
        
        let barWidth = (canvas.width / this.bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < this.bufferLength; i++) {
            barHeight = canvas.height * (this.dataArray[i]/255);
            // const r = 255 * (this.dataArray[i] / 255);
            // const g = 255 * (i / this.bufferLength);
            // const b = 255 * (i / this.bufferLength);

            const grd = ctx.createLinearGradient(0, 0, canvas.width, 0)
            grd.addColorStop(0, options.primary ? options.primary : "blue");
            grd.addColorStop(.8, options.secondary ? options.secondary : "green");
            grd.addColorStop(1, options.tertiary ? options.tertiary : "white");

            // let rect = new Rectangle(x, canvas.height - barHeight, "rgb(" + r + "," + g + "," + b + ")", barWidth, barHeight)
            let rect = new Rectangle(x, (canvas.height - barHeight)+100, grd, barWidth, barHeight)
            rect.draw(ctx);
            x += barWidth;
        }
    }
}

module.exports = Bars;