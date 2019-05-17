const Visualizer = require('./visualizer');
const DrunkenCircles = require('./drunken_circles');

document.addEventListener("DOMContentLoaded", () => {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    clearCanvas();

    // create audio context
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();

    const audioElement = document.querySelector('#audio');
    const track = audioCtx.createMediaElementSource(audioElement);
    const gainNode = audioCtx.createGain();
    const analyzer = audioCtx.createAnalyser();
    track.connect(gainNode);
    track.connect(analyzer);
    gainNode.connect(audioCtx.destination);

    let visualizer = new Visualizer(analyzer);
    let drunken = new DrunkenCircles(canvas, analyzer);
    let checked;
    const radio = document.getElementsByName("visualization");
    for (let i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            checked = radio[i].value 
        }
        radio[i].onclick = function () {
            if (radio[i].value === 'default') {
                clearCanvas();
                checked = 'default';
            } else if (radio[i].value === 'drunken') {
                clearCanvas();
                checked = 'drunken';
            }
        }
    }
    
    let fillStyle = "#272B34";

    function loop() {
        requestAnimationFrame(loop)
        if (checked === 'default') {
            visualizer.draw(fillStyle, canvas, ctx)
        } else if (checked === 'drunken') {
            drunken.draw(fillStyle, ctx)
        }
    }
    loop();

    // visual settings 
    const dark = document.getElementById("dark")
    const light = document.getElementById("light")
    const controls = document.getElementById("controls");
    const controlButtons = document.getElementsByClassName("fas");

    dark.addEventListener("click", function() {
        fillStyle = "#272B34";
        controls.style.color = "#eee";
        Array.from(controlButtons).forEach((button) => button.style.color = "#eee");
        // visualizer.draw(fillStyle, canvas, ctx);
    });

    light.addEventListener("click", function () {
        fillStyle = "#ffe0bd";
        controls.style.color = "#272B34";
        Array.from(controlButtons).forEach((button) => button.style.color = "#272B34");

        // visualizer.draw(fillStyle, canvas, ctx);
    });


    // settings 
    const playButton = document.querySelector('.controls-play');

    //enable file upload
    const audioFile = document.querySelector('#audio-file');
    audioFile.addEventListener('change', function () {
        const file = this.files[0];
        const src = URL.createObjectURL(file);
        audioElement.src = src;
    });

    // play and pause audio
    playButton.addEventListener('click', function () {
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        if (this.dataset.playing === 'false') {
            audioElement.play();
            this.dataset.playing = 'true';

        } else if (this.dataset.playing === 'true') {
            audioElement.pause();
            this.dataset.playing = 'false';
        }
    })

    //modal 
    const modal = document.getElementById("soundcloud-modal");
    const soundcloudButton = document.getElementById("controls-audio-link");
    const closeButton = document.getElementById("close");

    soundcloudButton.onclick = function() {
        modal.style.display =  "block";
    }

    closeButton.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function (e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    }

    // submit new audio URL 
    const soundcloudForm = document.getElementById("soundcloudForm");
    soundcloudForm.onsubmit = function(e) {
        e.preventDefault();
        const formEl = document.forms.soundcloudForm;
        const formData = new FormData(formEl);
        const soundcloudUrl = formData.get("soundcloudUrl");
        audioElement.src = soundcloudUrl;
        modal.style.display = "none";
        audioCtx.resume();
        audioElement.play();
    }

    function clearCanvas() {
        canvas.width = canvas.width;
        canvas.height = canvas.height;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
    }

});