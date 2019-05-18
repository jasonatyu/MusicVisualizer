const HEX_DIGITS = "0123456789ABCDEF";

const Utils = {
    getRMS(arr) {
        let values = 0;
        for (let i = 0; i < arr.length; i++) {
            values += arr[i] * arr[i];
        }
        rms = Math.sqrt(values / arr.length);
        return rms;
    },

    // from 'drunken circles' 
    randomColor() {
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += HEX_DIGITS[Math.floor((Math.random() * 16))];
        }
        return color;
    }
}

module.exports = Utils;