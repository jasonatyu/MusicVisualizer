const Visualizer = require('./visualizer');
const DrunkenCircles = require('./drunken_circles');

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;   
    canvas.height = window.innerHeight;

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

    const visualizer = new Visualizer(canvas, ctx, analyzer);
    visualizer.draw();

    // const drunken = new DrunkenCircles(canvas, ctx, analyzer);
    // drunken.draw();

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



});