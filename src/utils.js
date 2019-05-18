const Utils = {
    getRMS(arr) {
        let values = 0;
        for (let i = 0; i < arr.length; i++) {
            values += arr[i] * arr[i];
        }
        rms = Math.sqrt(values / arr.length);
        return rms;
    }
}

module.exports = Utils;