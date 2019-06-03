# MusicVisualizer

## Overview

Music Visualizer is an audio visualization tool that allows users to upload a song and control different settings to visualize audio while playing the song. 

![screenshot](https://orange-music-pro.s3-us-west-1.amazonaws.com/Screen+Shot+2019-05-28+at+4.29.58+PM.png)

An example visual component, `PulsingCircle,` was rendered as follows, where both the opacity and thickness of the circle increased with the size of the radius: 

```javascript
draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.currentRadius, 0, 2 * Math.PI);
        this.ctx.strokeStyle = "rgba(255, 255, 255, " + this.currentRadius/500 + ")"
        this.ctx.lineWidth = this.currentRadius *.01;
        this.ctx.stroke();
        this.currentRadius *= 1.1; 
        if (this.currentRadius < 2000) {
            requestAnimationFrame(this.draw.bind(this));
        }
    }
```

### Functionality

* Users can upload an audio file to play or select from a demo file. 
* Users can play or pause a song. 
* Users can update settings in a settings menu to change the color, speed, and style of the visualization. 

### Wireframes

The app will consist of a single page with an upload audio file modal, audio controls, visualization controls, and a box where the visualization will be rendered that covers the entire visible page. 

### Technologies employed
* Vanilla JavaScript for the upload modal and the visualizer controls.
* `Web Audio API` for audio processing and controls. 
* `HTML5 Canvas` for rendering the audio visualization. 

### Main files
* `index.js` handle creating and updating DOM elements.
* `audio.js` handle audio processing and controls.
* `visualizer.js` handle audio visualization and controls.

### MVPs
- [x] Uploading a new audio file.
- [x] Basic controls (play/pause) for an uploaded file. 
- [x] Basic visualizer settings (color, style, size, speed)

### Development timeline

##### Day 1:
- [x] Review `Web Audio API` 
- [x] Complete basic page skeleton and functionality.

##### Day 2:
- [x] Complete audio file upload functionality.
- [x] Complete audio controls functionality.
- [x] Start on visualizer rendering and functionality.

##### Day 3:
- [x] Complete visualization settings functionality.
- [x] Refine visualizer rendering and functionality.

##### Day 4:
- [x] Add more complex visualization options.
- [x] Finish styling page.

