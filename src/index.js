const Visualizer = require('./visualizer');
const MovingCircles = require('./moving_circles');
const BeatingCircle = require('./beating_circle');
const Bars = require('./bars');

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

    // initialize visualizations 
    let visualizer = new Visualizer(analyzer);
    let movingCircles = new MovingCircles(canvas, analyzer);
    let beatingCircle = new BeatingCircle(analyzer);
    let bars = new Bars(analyzer);

    // detect which visualization is checked 
    let checked;
    const radio = document.getElementsByName("visualization");
    for (let i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            checked = radio[i].value 
        }
        radio[i].onclick = function () {
            if (radio[i].value === 'default') {
                checked = 'default';
            } else if (radio[i].value === 'drunken') {
                checked = 'drunken';
            } else if (radio[i].value === 'beating') {
                checked = 'beating';
            } else if (radio[i].value === 'bars') {
                checked = 'bars';
            }
        }
    }
    
    // default fill style 
    let fillStyle = "#272B34";

    // request animation frame 
    function loop() {
        requestAnimationFrame(loop)
        if (checked === 'default') {
            clearCanvas();
            visualizer.draw(fillStyle, canvas, ctx)
        } else if (checked === 'drunken') {
            clearCanvas();
            movingCircles.draw(fillStyle, ctx)
        } else if (checked === 'beating') {
            clearCanvas();
            beatingCircle.draw(fillStyle, canvas, ctx)
        } else if (checked === 'bars') {
            clearCanvas();
            bars.draw(fillStyle, canvas, ctx)
        }
    }
    loop();

    // visual settings 
    const dark = document.getElementById("dark")
    const light = document.getElementById("light")
    const usa = document.getElementById("usa")
    const controls = document.getElementById("controls");
    const controlButtons = document.getElementsByClassName("fas");

    dark.addEventListener("click", function() {
        fillStyle = "#272B34";
        controls.style.color = "#eee";
        Array.from(controlButtons).forEach((button) => button.style.color = "#eee");
    });

    light.addEventListener("click", function () {
        fillStyle = "#ffe0bd";
        controls.style.color = "#272B34";
        Array.from(controlButtons).forEach((button) => button.style.color = "#272B34");
    });

    usa.addEventListener("click", function () {
        const grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
        grd.addColorStop(0, "red");
        grd.addColorStop(.9, "white");
        grd.addColorStop(1, "blue");
        fillStyle = grd;
        controls.style.color = "#272B34";
        Array.from(controlButtons).forEach((button) => button.style.color = "#272B34");
    });


    // audio settings 
    const demo = document.querySelector('#controls-audio-demo');

    demo.addEventListener('click', function() {
        if (audioCtx.state === 'suspended') {
            audioElement.src = 'https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview128/v4/47/93/39/4793396d-2fc8-4113-df87-4b361c2d40cd/mzaf_2242804860096860666.plus.aac.p.m4a';
            audioCtx.resume();
            audioElement.play();
            visualizer.resetPeak();
            playButton.dataset.playing = 'true';
        }
    });
    
    const playButton = document.querySelector('.controls-play');

    // enable file upload
    const audioFile = document.querySelector('#audio-file');
    audioFile.addEventListener('change', function () {
        const file = this.files[0];
        const src = URL.createObjectURL(file);
        audioElement.src = src;
        audioCtx.resume();
        audioElement.play();
        visualizer.resetPeak();
        playButton.dataset.playing = 'true';
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

    // modal for song url 
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
        visualizer.resetPeak();
        playButton.dataset.playing = 'true';
    }

    // clear canvas 
    function clearCanvas() {
        canvas.width = canvas.width;
        canvas.height = canvas.height;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
    }

});