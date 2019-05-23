/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/bars.js":
/*!*********************!*\
  !*** ./src/bars.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Rectangle = __webpack_require__(/*! ./rectangle */ "./src/rectangle.js");

var Utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

var Bars =
/*#__PURE__*/
function () {
  function Bars(analyzer) {
    _classCallCheck(this, Bars);

    this.analyzer = analyzer;
    this.bufferLength = this.analyzer.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
    this.analyzer.fftSize = 2048;
    this.peak = 50;
  }

  _createClass(Bars, [{
    key: "draw",
    value: function draw(fillStyle, canvas, ctx, options) {
      ctx.fillStyle = fillStyle;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      this.analyzer.getByteFrequencyData(this.dataArray);
      var barWidth = canvas.width / this.bufferLength * 2.5;
      var barHeight;
      var x = 0;

      for (var i = 0; i < this.bufferLength; i++) {
        barHeight = canvas.height * (this.dataArray[i] / 255); // const r = 255 * (this.dataArray[i] / 255);
        // const g = 255 * (i / this.bufferLength);
        // const b = 255 * (i / this.bufferLength);

        var grd = ctx.createLinearGradient(0, 0, canvas.width, 0);
        grd.addColorStop(0, options.primary ? options.primary : "blue");
        grd.addColorStop(.8, options.secondary ? options.secondary : "green");
        grd.addColorStop(1, options.tertiary ? options.tertiary : "white"); // let rect = new Rectangle(x, canvas.height - barHeight, "rgb(" + r + "," + g + "," + b + ")", barWidth, barHeight)

        var rect = new Rectangle(x, canvas.height - barHeight + 100, grd, barWidth, barHeight);
        rect.draw(ctx);
        x += barWidth;
      }
    }
  }]);

  return Bars;
}();

module.exports = Bars;

/***/ }),

/***/ "./src/beating_circle.js":
/*!*******************************!*\
  !*** ./src/beating_circle.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Circle = __webpack_require__(/*! ./circle */ "./src/circle.js");

var Rectangle = __webpack_require__(/*! ./rectangle */ "./src/rectangle.js");

var Utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

var BeatingCircle =
/*#__PURE__*/
function () {
  function BeatingCircle(analyzer) {
    _classCallCheck(this, BeatingCircle);

    this.analyzer = analyzer;
    this.bufferLength = this.analyzer.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
    this.analyzer.fftSize = 2048;
    this.peak = 50;
    this.currentRadius = this.radius;
    this.circles = [];

    for (var i = 0; i < NUM_CIRCLES; i++) {
      this.circles.push(Circle.randomCircle(canvas.width, canvas.height, NUM_CIRCLES));
    }
  }

  _createClass(BeatingCircle, [{
    key: "draw",
    value: function draw(fillStyle, canvas, ctx, options) {
      ctx.fillStyle = fillStyle;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      this.analyzer.getByteFrequencyData(this.dataArray);
      var rms = Utils.getRMS(this.dataArray);
      var circle = new Circle(300, 300, "white", rms);
      circle.draw(ctx);
      ctx.save();
      ctx.translate(circle.x, circle.y);
      var bars = 180;

      for (var i = 0; i < 360; i += 360 / bars) {
        var barWidth = 2 * Math.PI * rms / bars;
        var barHeight = canvas.height * (this.dataArray[i] / 255) * .1;
        ctx.rotate(2 * Math.PI / 180);
        var grd = ctx.createLinearGradient(0, 0, 250, 0);
        grd.addColorStop(0, options.primary ? options.primary : "red");
        grd.addColorStop(.7, options.secondary ? options.secondary : "orange");
        grd.addColorStop(1, options.tertiary ? options.tertiary : "white");
        var rect = new Rectangle(rms, -barWidth / 2, grd, barHeight, barWidth);
        rect.draw(ctx);
      }

      ctx.restore();
    }
  }]);

  return BeatingCircle;
}();

module.exports = BeatingCircle;

/***/ }),

/***/ "./src/circle.js":
/*!***********************!*\
  !*** ./src/circle.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Shape = __webpack_require__(/*! ./shape */ "./src/shape.js");

var Utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

var Circle =
/*#__PURE__*/
function (_Shape) {
  _inherits(Circle, _Shape);

  function Circle(x, y, color, radius) {
    var _this;

    _classCallCheck(this, Circle);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Circle).call(this, x, y, color));
    _this.radius = radius;
    return _this;
  }

  _createClass(Circle, [{
    key: "draw",
    value: function draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }, {
    key: "moveRandom",
    // static radius(maxX, maxY, numCircles) {
    //     // let targetCircleArea = (maxX * maxY) / numCircles;
    //     // let targetRadius = Math.sqrt(targetCircleArea / Math.PI);
    //     // return 2 * targetRadius;
    //     return 1;
    // }
    value: function moveRandom(maxX, maxY) {
      var dx = Math.random();
      var dy = Math.random();
      this.x = Math.abs((this.x + dx * this.radius * 0.1) % maxX);
      this.y = Math.abs((this.y + dy * this.radius * 0.1) % maxY);
    }
  }, {
    key: "updateRadius",
    value: function updateRadius(n, factor) {
      this.radius = n * factor;
    }
  }], [{
    key: "randomCircle",
    value: function randomCircle(maxX, maxY, numCircles) {
      return new Circle(maxX * Math.random(), maxY * Math.random(), Utils.randomColor(), 1);
    }
  }]);

  return Circle;
}(Shape);

module.exports = Circle;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Visualizer = __webpack_require__(/*! ./visualizer */ "./src/visualizer.js");

var MovingCircles = __webpack_require__(/*! ./moving_circles */ "./src/moving_circles.js");

var BeatingCircle = __webpack_require__(/*! ./beating_circle */ "./src/beating_circle.js");

var Bars = __webpack_require__(/*! ./bars */ "./src/bars.js");

document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  clearCanvas(); // create audio context

  var AudioContext = window.AudioContext || window.webkitAudioContext;
  var audioCtx = new AudioContext();
  var audioElement = document.querySelector('#audio');
  audioElement.src = 'https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview128/v4/47/93/39/4793396d-2fc8-4113-df87-4b361c2d40cd/mzaf_2242804860096860666.plus.aac.p.m4a';
  var track = audioCtx.createMediaElementSource(audioElement);
  var gainNode = audioCtx.createGain();
  var analyzer = audioCtx.createAnalyser();
  track.connect(gainNode);
  track.connect(analyzer);
  gainNode.connect(audioCtx.destination); // initialize visualizations 

  var visualizer = new Visualizer(analyzer);
  var movingCircles = new MovingCircles(canvas, analyzer);
  var beatingCircle = new BeatingCircle(analyzer);
  var bars = new Bars(analyzer); // detect which visualization is checked 

  var checked;
  var radio = document.getElementsByName("visualization");

  var _loop = function _loop(i) {
    if (radio[i].checked) {
      checked = radio[i].value;
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
    };
  };

  for (var i = 0; i < radio.length; i++) {
    _loop(i);
  } // default fill style 


  var fillStyle = "#272B34";
  var options = {}; // request animation frame 

  function loop() {
    requestAnimationFrame(loop);

    if (checked === 'default') {
      clearCanvas();
      visualizer.draw(fillStyle, canvas, ctx, options = options);
    } else if (checked === 'drunken') {
      clearCanvas();
      movingCircles.draw(fillStyle, ctx);
    } else if (checked === 'beating') {
      clearCanvas();
      beatingCircle.draw(fillStyle, canvas, ctx, options = options);
    } else if (checked === 'bars') {
      clearCanvas();
      bars.draw(fillStyle, canvas, ctx, options = options);
    }
  }

  loop(); // visual settings 

  var dark = document.getElementById("dark");
  var light = document.getElementById("light");
  var desert = document.getElementById("desert");
  var space = document.getElementById("space");
  var tundra = document.getElementById("tundra");
  var controls = document.getElementById("controls");
  var controlButtons = document.getElementsByClassName("fas");
  dark.addEventListener("click", function () {
    fillStyle = "#272B34";
    controls.style.color = "#eee";
    Array.from(controlButtons).forEach(function (button) {
      return button.style.color = "#eee";
    });
  });
  light.addEventListener("click", function () {
    fillStyle = "#ffe0bd";
    controls.style.color = "#272B34";
    Array.from(controlButtons).forEach(function (button) {
      return button.style.color = "#272B34";
    });
  });
  desert.addEventListener("click", function () {
    options = Object.assign({}, options, {
      primary: "#ff0000",
      secondary: "#ff8d00",
      tertiary: "#ffdc07"
    });
  });
  space.addEventListener("click", function () {
    options = Object.assign({}, options, {
      primary: "#141717",
      secondary: "#4a5457",
      tertiary: "#e1e5e6"
    });
  });
  tundra.addEventListener("click", function () {
    options = Object.assign({}, options, {
      primary: "#0c084c",
      secondary: "#096386",
      tertiary: "#FFFFFF"
    });
  }); // audio settings 

  var demo = document.querySelector('#controls-audio-demo');
  demo.addEventListener('click', function () {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    audioElement.src = 'https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview128/v4/47/93/39/4793396d-2fc8-4113-df87-4b361c2d40cd/mzaf_2242804860096860666.plus.aac.p.m4a';
    audioElement.play();
    visualizer.resetPeak();
    playButton.dataset.playing = 'true';
  });
  var playButton = document.querySelector('.controls-play'); // enable file upload

  var audioFile = document.querySelector('#audio-file');
  audioFile.addEventListener('change', function () {
    var file = this.files[0];
    var src = URL.createObjectURL(file);
    audioElement.src = src;
    audioCtx.resume();
    audioElement.play();
    visualizer.resetPeak();
    playButton.dataset.playing = 'true';
  }); // play and pause audio

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
  }); // modal for song url 

  var modal = document.getElementById("soundcloud-modal");
  var soundcloudButton = document.getElementById("controls-audio-link");
  var closeButton = document.getElementById("close");

  soundcloudButton.onclick = function () {
    modal.style.display = "block";
  };

  closeButton.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  }; // submit new audio URL 


  var soundcloudForm = document.getElementById("soundcloudForm");

  soundcloudForm.onsubmit = function (e) {
    e.preventDefault();
    var formEl = document.forms.soundcloudForm;
    var formData = new FormData(formEl);
    var soundcloudUrl = formData.get("soundcloudUrl");
    audioElement.src = soundcloudUrl;
    modal.style.display = "none";
    audioCtx.resume();
    audioElement.play();
    visualizer.resetPeak();
    playButton.dataset.playing = 'true';
  }; // clear canvas 


  function clearCanvas() {
    canvas.width = canvas.width;
    canvas.height = canvas.height;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
  }
});

/***/ }),

/***/ "./src/moving_circles.js":
/*!*******************************!*\
  !*** ./src/moving_circles.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Circle = __webpack_require__(/*! ./circle */ "./src/circle.js");

var Rectangle = __webpack_require__(/*! ./rectangle */ "./src/rectangle.js");

var Utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

NUM_CIRCLES = 2000;

var MovingCircles =
/*#__PURE__*/
function () {
  function MovingCircles(canvas, analyzer) {
    _classCallCheck(this, MovingCircles);

    this.canvas = canvas;
    this.analyzer = analyzer;
    this.bufferLength = this.analyzer.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
    this.analyzer.fftSize = 1024;
    this.circles = [];

    for (var i = 0; i < NUM_CIRCLES; i++) {
      this.circles.push(Circle.randomCircle(canvas.width, canvas.height, NUM_CIRCLES));
    }
  }

  _createClass(MovingCircles, [{
    key: "moveCircles",
    value: function moveCircles(canvas) {
      var _this = this;

      this.circles.forEach(function (circle) {
        return circle.moveRandom(_this.canvas.width, _this.canvas.height);
      });
    }
  }, {
    key: "updateRadius",
    value: function updateRadius(rms) {
      this.circles.forEach(function (circle) {
        return circle.updateRadius(rms, .03);
      });
    }
  }, {
    key: "draw",
    value: function draw(fillStyle, ctx) {
      ctx.fillStyle = fillStyle;
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.analyzer.getByteFrequencyData(this.dataArray);
      var rms = Utils.getRMS(this.dataArray);
      this.circles.forEach(function (circle) {
        return circle.draw(ctx);
      });
      this.moveCircles();
      this.updateRadius(rms);
    }
  }]);

  return MovingCircles;
}();

module.exports = MovingCircles;

/***/ }),

/***/ "./src/pulsing_circle.js":
/*!*******************************!*\
  !*** ./src/pulsing_circle.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Circle = __webpack_require__(/*! ./circle */ "./src/circle.js");

var PulsingCircle =
/*#__PURE__*/
function (_Circle) {
  _inherits(PulsingCircle, _Circle);

  function PulsingCircle(x, y, color, radius, ctx) {
    var _this;

    _classCallCheck(this, PulsingCircle);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PulsingCircle).call(this, x, y, color, radius));
    _this.ctx = ctx;
    _this.currentRadius = _this.radius;
    return _this;
  }

  _createClass(PulsingCircle, [{
    key: "draw",
    value: function draw() {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.currentRadius, 0, 2 * Math.PI);
      this.ctx.strokeStyle = "rgba(255, 255, 255, " + this.currentRadius / 500 + ")";
      this.ctx.lineWidth = this.currentRadius * .01;
      this.ctx.stroke();
      this.currentRadius *= 1.1;

      if (this.currentRadius < 2000) {
        requestAnimationFrame(this.draw.bind(this));
      }
    }
  }]);

  return PulsingCircle;
}(Circle);

module.exports = PulsingCircle;

/***/ }),

/***/ "./src/rectangle.js":
/*!**************************!*\
  !*** ./src/rectangle.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Shape = __webpack_require__(/*! ./shape */ "./src/shape.js");

var Rectangle =
/*#__PURE__*/
function (_Shape) {
  _inherits(Rectangle, _Shape);

  function Rectangle(x, y, color, width, height) {
    var _this;

    _classCallCheck(this, Rectangle);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Rectangle).call(this, x, y, color));
    _this.width = width;
    _this.height = height;
    return _this;
  }

  _createClass(Rectangle, [{
    key: "draw",
    value: function draw(ctx) {
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }]);

  return Rectangle;
}(Shape);

module.exports = Rectangle;

/***/ }),

/***/ "./src/shape.js":
/*!**********************!*\
  !*** ./src/shape.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Shape = function Shape(x, y, color) {
  _classCallCheck(this, Shape);

  this.x = x;
  this.y = y;
  this.color = color;
};

module.exports = Shape;

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

var HEX_DIGITS = "0123456789ABCDEF";
var Utils = {
  getRMS: function getRMS(arr) {
    var values = 0;

    for (var i = 0; i < arr.length; i++) {
      values += arr[i] * arr[i];
    }

    rms = Math.sqrt(values / arr.length);
    return rms;
  },
  // from 'drunken circles' 
  randomColor: function randomColor() {
    var color = "#";

    for (var i = 0; i < 6; i++) {
      color += HEX_DIGITS[Math.floor(Math.random() * 16)];
    }

    return color;
  }
};
module.exports = Utils;

/***/ }),

/***/ "./src/visualizer.js":
/*!***************************!*\
  !*** ./src/visualizer.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Rectangle = __webpack_require__(/*! ./rectangle */ "./src/rectangle.js");

var Circle = __webpack_require__(/*! ./circle */ "./src/circle.js");

var PulsingCircle = __webpack_require__(/*! ./pulsing_circle */ "./src/pulsing_circle.js");

var Utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

var Visualizer =
/*#__PURE__*/
function () {
  function Visualizer(analyzer) {
    _classCallCheck(this, Visualizer);

    this.analyzer = analyzer;
    this.bufferLength = this.analyzer.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
    this.analyzer.fftSize = 2048;
    this.peak = 50;
  }

  _createClass(Visualizer, [{
    key: "resetPeak",
    value: function resetPeak() {
      this.peak = 50;
    }
  }, {
    key: "draw",
    value: function draw(fillStyle, canvas, ctx, options) {
      ctx.fillStyle = fillStyle;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      this.analyzer.getByteFrequencyData(this.dataArray);
      var rms = Utils.getRMS(this.dataArray);
      var circle = new Circle(150, 150, "white", rms);
      circle.draw(ctx); //pulse circlular

      if (rms > this.peak * .98) {
        var circle2 = new PulsingCircle(circle.x, circle.y, "white", rms, ctx);
        circle2.draw();
        this.peak = rms;
      } // start at top left of circle; 


      ctx.save();
      ctx.translate(circle.x, circle.y);
      var bars = 360;

      for (var i = 0; i < 360; i += 360 / bars) {
        var barWidth = 2 * Math.PI * rms / bars;
        var barHeight = canvas.height * (this.dataArray[i] / 255);
        ctx.rotate(1 * Math.PI / 180);
        var grd = ctx.createLinearGradient(0, 0, canvas.height, 0);
        grd.addColorStop(0, options.primary ? options.primary : "red");
        grd.addColorStop(.5, options.secondary ? options.secondary : "orange");
        grd.addColorStop(1, options.tertiary ? options.tertiary : "white");
        var rect = new Rectangle(rms, -barWidth / 2, grd, barHeight * 2, barWidth);
        rect.draw(ctx);
      }

      ctx.restore();
    }
  }]);

  return Visualizer;
}();

module.exports = Visualizer;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JlYXRpbmdfY2lyY2xlLmpzIiwid2VicGFjazovLy8uL3NyYy9jaXJjbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9tb3ZpbmdfY2lyY2xlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcHVsc2luZ19jaXJjbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlY3RhbmdsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy92aXN1YWxpemVyLmpzIl0sIm5hbWVzIjpbIlJlY3RhbmdsZSIsInJlcXVpcmUiLCJVdGlscyIsIkJhcnMiLCJhbmFseXplciIsImJ1ZmZlckxlbmd0aCIsImZyZXF1ZW5jeUJpbkNvdW50IiwiZGF0YUFycmF5IiwiVWludDhBcnJheSIsImZmdFNpemUiLCJwZWFrIiwiZmlsbFN0eWxlIiwiY2FudmFzIiwiY3R4Iiwib3B0aW9ucyIsImZpbGxSZWN0Iiwid2lkdGgiLCJoZWlnaHQiLCJnZXRCeXRlRnJlcXVlbmN5RGF0YSIsImJhcldpZHRoIiwiYmFySGVpZ2h0IiwieCIsImkiLCJncmQiLCJjcmVhdGVMaW5lYXJHcmFkaWVudCIsImFkZENvbG9yU3RvcCIsInByaW1hcnkiLCJzZWNvbmRhcnkiLCJ0ZXJ0aWFyeSIsInJlY3QiLCJkcmF3IiwibW9kdWxlIiwiZXhwb3J0cyIsIkNpcmNsZSIsIkJlYXRpbmdDaXJjbGUiLCJjdXJyZW50UmFkaXVzIiwicmFkaXVzIiwiY2lyY2xlcyIsIk5VTV9DSVJDTEVTIiwicHVzaCIsInJhbmRvbUNpcmNsZSIsInJtcyIsImdldFJNUyIsImNpcmNsZSIsInNhdmUiLCJ0cmFuc2xhdGUiLCJ5IiwiYmFycyIsIk1hdGgiLCJQSSIsInJvdGF0ZSIsInJlc3RvcmUiLCJTaGFwZSIsImNvbG9yIiwiYmVnaW5QYXRoIiwiYXJjIiwiZmlsbCIsIm1heFgiLCJtYXhZIiwiZHgiLCJyYW5kb20iLCJkeSIsImFicyIsIm4iLCJmYWN0b3IiLCJudW1DaXJjbGVzIiwicmFuZG9tQ29sb3IiLCJWaXN1YWxpemVyIiwiTW92aW5nQ2lyY2xlcyIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImdldEVsZW1lbnRCeUlkIiwiZ2V0Q29udGV4dCIsImNsZWFyQ2FudmFzIiwiQXVkaW9Db250ZXh0Iiwid2luZG93Iiwid2Via2l0QXVkaW9Db250ZXh0IiwiYXVkaW9DdHgiLCJhdWRpb0VsZW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwic3JjIiwidHJhY2siLCJjcmVhdGVNZWRpYUVsZW1lbnRTb3VyY2UiLCJnYWluTm9kZSIsImNyZWF0ZUdhaW4iLCJjcmVhdGVBbmFseXNlciIsImNvbm5lY3QiLCJkZXN0aW5hdGlvbiIsInZpc3VhbGl6ZXIiLCJtb3ZpbmdDaXJjbGVzIiwiYmVhdGluZ0NpcmNsZSIsImNoZWNrZWQiLCJyYWRpbyIsImdldEVsZW1lbnRzQnlOYW1lIiwidmFsdWUiLCJvbmNsaWNrIiwibGVuZ3RoIiwibG9vcCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImRhcmsiLCJsaWdodCIsImRlc2VydCIsInNwYWNlIiwidHVuZHJhIiwiY29udHJvbHMiLCJjb250cm9sQnV0dG9ucyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJzdHlsZSIsIkFycmF5IiwiZnJvbSIsImZvckVhY2giLCJidXR0b24iLCJPYmplY3QiLCJhc3NpZ24iLCJkZW1vIiwic3RhdGUiLCJyZXN1bWUiLCJwbGF5IiwicmVzZXRQZWFrIiwicGxheUJ1dHRvbiIsImRhdGFzZXQiLCJwbGF5aW5nIiwiYXVkaW9GaWxlIiwiZmlsZSIsImZpbGVzIiwiVVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwicGF1c2UiLCJtb2RhbCIsInNvdW5kY2xvdWRCdXR0b24iLCJjbG9zZUJ1dHRvbiIsImRpc3BsYXkiLCJlIiwidGFyZ2V0Iiwic291bmRjbG91ZEZvcm0iLCJvbnN1Ym1pdCIsInByZXZlbnREZWZhdWx0IiwiZm9ybUVsIiwiZm9ybXMiLCJmb3JtRGF0YSIsIkZvcm1EYXRhIiwic291bmRjbG91ZFVybCIsImdldCIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsImNsZWFyUmVjdCIsIm1vdmVSYW5kb20iLCJ1cGRhdGVSYWRpdXMiLCJtb3ZlQ2lyY2xlcyIsIlB1bHNpbmdDaXJjbGUiLCJzdHJva2VTdHlsZSIsImxpbmVXaWR0aCIsInN0cm9rZSIsImJpbmQiLCJIRVhfRElHSVRTIiwiYXJyIiwidmFsdWVzIiwic3FydCIsImZsb29yIiwiY2lyY2xlMiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLElBQU1BLFNBQVMsR0FBR0MsbUJBQU8sQ0FBQyx1Q0FBRCxDQUF6Qjs7QUFDQSxJQUFNQyxLQUFLLEdBQUdE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QixDQUFqQixFQUFvQlgsT0FBTyxDQUFDYyxRQUFSLEdBQW1CZCxPQUFPLENBQUNjLFFBQTNCLEdBQXNDLE9BQTFEO0FBQ0EsWUFBTUMsSUFBSSxHQUFHLElBQUk3QixTQUFKLENBQWN5QyxHQUFkLEVBQW1CLENBQUN0QixRQUFELEdBQVksQ0FBL0IsRUFBa0NJLEdBQWxDLEVBQXVDSCxTQUFTLEdBQUcsQ0FBbkQsRUFBc0RELFFBQXRELENBQWI7QUFDQVUsWUFBSSxDQUFDQyxJQUFMLENBQVVqQixHQUFWO0FBQ0g7O0FBQ0RBLFNBQUcsQ0FBQ3NDLE9BQUo7QUFDSDs7Ozs7O0FBR0xwQixNQUFNLENBQUNDLE9BQVAsR0FBaUJtQyxVQUFqQixDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiY29uc3QgUmVjdGFuZ2xlID0gcmVxdWlyZSgnLi9yZWN0YW5nbGUnKTtcbmNvbnN0IFV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG5jbGFzcyBCYXJzIHtcbiAgICBjb25zdHJ1Y3RvcihhbmFseXplcikge1xuICAgICAgICB0aGlzLmFuYWx5emVyID0gYW5hbHl6ZXI7XG4gICAgICAgIHRoaXMuYnVmZmVyTGVuZ3RoID0gdGhpcy5hbmFseXplci5mcmVxdWVuY3lCaW5Db3VudDtcbiAgICAgICAgdGhpcy5kYXRhQXJyYXkgPSBuZXcgVWludDhBcnJheSh0aGlzLmJ1ZmZlckxlbmd0aCk7XG4gICAgICAgIHRoaXMuYW5hbHl6ZXIuZmZ0U2l6ZSA9IDIwNDg7XG4gICAgICAgIHRoaXMucGVhayA9IDUwO1xuICAgIH1cblxuICAgIGRyYXcoZmlsbFN0eWxlLCBjYW52YXMsIGN0eCwgb3B0aW9ucykgeyBcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGZpbGxTdHlsZTtcbiAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgICAgIHRoaXMuYW5hbHl6ZXIuZ2V0Qnl0ZUZyZXF1ZW5jeURhdGEodGhpcy5kYXRhQXJyYXkpO1xuICAgICAgICBcbiAgICAgICAgbGV0IGJhcldpZHRoID0gKGNhbnZhcy53aWR0aCAvIHRoaXMuYnVmZmVyTGVuZ3RoKSAqIDIuNTtcbiAgICAgICAgbGV0IGJhckhlaWdodDtcbiAgICAgICAgbGV0IHggPSAwO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5idWZmZXJMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYmFySGVpZ2h0ID0gY2FudmFzLmhlaWdodCAqICh0aGlzLmRhdGFBcnJheVtpXS8yNTUpO1xuICAgICAgICAgICAgLy8gY29uc3QgciA9IDI1NSAqICh0aGlzLmRhdGFBcnJheVtpXSAvIDI1NSk7XG4gICAgICAgICAgICAvLyBjb25zdCBnID0gMjU1ICogKGkgLyB0aGlzLmJ1ZmZlckxlbmd0aCk7XG4gICAgICAgICAgICAvLyBjb25zdCBiID0gMjU1ICogKGkgLyB0aGlzLmJ1ZmZlckxlbmd0aCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGdyZCA9IGN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCAwLCBjYW52YXMud2lkdGgsIDApXG4gICAgICAgICAgICBncmQuYWRkQ29sb3JTdG9wKDAsIG9wdGlvbnMucHJpbWFyeSA/IG9wdGlvbnMucHJpbWFyeSA6IFwiYmx1ZVwiKTtcbiAgICAgICAgICAgIGdyZC5hZGRDb2xvclN0b3AoLjgsIG9wdGlvbnMuc2Vjb25kYXJ5ID8gb3B0aW9ucy5zZWNvbmRhcnkgOiBcImdyZWVuXCIpO1xuICAgICAgICAgICAgZ3JkLmFkZENvbG9yU3RvcCgxLCBvcHRpb25zLnRlcnRpYXJ5ID8gb3B0aW9ucy50ZXJ0aWFyeSA6IFwid2hpdGVcIik7XG5cbiAgICAgICAgICAgIC8vIGxldCByZWN0ID0gbmV3IFJlY3RhbmdsZSh4LCBjYW52YXMuaGVpZ2h0IC0gYmFySGVpZ2h0LCBcInJnYihcIiArIHIgKyBcIixcIiArIGcgKyBcIixcIiArIGIgKyBcIilcIiwgYmFyV2lkdGgsIGJhckhlaWdodClcbiAgICAgICAgICAgIGxldCByZWN0ID0gbmV3IFJlY3RhbmdsZSh4LCAoY2FudmFzLmhlaWdodCAtIGJhckhlaWdodCkrMTAwLCBncmQsIGJhcldpZHRoLCBiYXJIZWlnaHQpXG4gICAgICAgICAgICByZWN0LmRyYXcoY3R4KTtcbiAgICAgICAgICAgIHggKz0gYmFyV2lkdGg7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQmFyczsiLCJjb25zdCBDaXJjbGUgPSByZXF1aXJlKCcuL2NpcmNsZScpO1xuY29uc3QgUmVjdGFuZ2xlID0gcmVxdWlyZSgnLi9yZWN0YW5nbGUnKTtcbmNvbnN0IFV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG5jbGFzcyBCZWF0aW5nQ2lyY2xlIHtcbiAgICBjb25zdHJ1Y3RvcihhbmFseXplcikge1xuICAgICAgICB0aGlzLmFuYWx5emVyID0gYW5hbHl6ZXI7XG4gICAgICAgIHRoaXMuYnVmZmVyTGVuZ3RoID0gdGhpcy5hbmFseXplci5mcmVxdWVuY3lCaW5Db3VudDtcbiAgICAgICAgdGhpcy5kYXRhQXJyYXkgPSBuZXcgVWludDhBcnJheSh0aGlzLmJ1ZmZlckxlbmd0aCk7XG4gICAgICAgIHRoaXMuYW5hbHl6ZXIuZmZ0U2l6ZSA9IDIwNDg7XG4gICAgICAgIHRoaXMucGVhayA9IDUwO1xuICAgICAgICB0aGlzLmN1cnJlbnRSYWRpdXMgPSB0aGlzLnJhZGl1cztcblxuICAgICAgICB0aGlzLmNpcmNsZXMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBOVU1fQ0lSQ0xFUzsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmNpcmNsZXMucHVzaChDaXJjbGUucmFuZG9tQ2lyY2xlKGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCwgTlVNX0NJUkNMRVMpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXcoZmlsbFN0eWxlLCBjYW52YXMsIGN0eCwgb3B0aW9ucykge1xuXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBmaWxsU3R5bGU7XG4gICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgICB0aGlzLmFuYWx5emVyLmdldEJ5dGVGcmVxdWVuY3lEYXRhKHRoaXMuZGF0YUFycmF5KTtcbiAgICAgICAgY29uc3Qgcm1zID0gVXRpbHMuZ2V0Uk1TKHRoaXMuZGF0YUFycmF5KTtcblxuICAgICAgICBjb25zdCBjaXJjbGUgPSBuZXcgQ2lyY2xlKDMwMCwgMzAwLCBcIndoaXRlXCIsIHJtcyk7XG4gICAgICAgIGNpcmNsZS5kcmF3KGN0eCk7XG5cbiAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgY3R4LnRyYW5zbGF0ZShjaXJjbGUueCwgY2lyY2xlLnkpO1xuXG4gICAgICAgIGxldCBiYXJzID0gMTgwO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM2MDsgaSArPSAoMzYwIC8gYmFycykpIHtcbiAgICAgICAgICAgIGNvbnN0IGJhcldpZHRoID0gKDIgKiBNYXRoLlBJICogcm1zKSAvIGJhcnM7XG4gICAgICAgICAgICBjb25zdCBiYXJIZWlnaHQgPSAoY2FudmFzLmhlaWdodCAqICh0aGlzLmRhdGFBcnJheVtpXSAvIDI1NSkpICogLjE7XG4gICAgICAgICAgICBjdHgucm90YXRlKDIgKiBNYXRoLlBJIC8gMTgwKTtcbiAgICAgICAgICAgIGNvbnN0IGdyZCA9IGN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCAwLCAyNTAsIDApXG4gICAgICAgICAgICBncmQuYWRkQ29sb3JTdG9wKDAsIG9wdGlvbnMucHJpbWFyeSA/IG9wdGlvbnMucHJpbWFyeSA6IFwicmVkXCIpO1xuICAgICAgICAgICAgZ3JkLmFkZENvbG9yU3RvcCguNywgb3B0aW9ucy5zZWNvbmRhcnkgPyBvcHRpb25zLnNlY29uZGFyeSA6IFwib3JhbmdlXCIpO1xuICAgICAgICAgICAgZ3JkLmFkZENvbG9yU3RvcCgxLCBvcHRpb25zLnRlcnRpYXJ5ID8gb3B0aW9ucy50ZXJ0aWFyeSA6IFwid2hpdGVcIik7XG4gICAgICAgICAgICBjb25zdCByZWN0ID0gbmV3IFJlY3RhbmdsZShybXMsIC1iYXJXaWR0aCAvIDIsIGdyZCwgYmFySGVpZ2h0LCBiYXJXaWR0aClcbiAgICAgICAgICAgIHJlY3QuZHJhdyhjdHgpO1xuICAgICAgICB9XG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJlYXRpbmdDaXJjbGU7XG5cbiIsImNvbnN0IFNoYXBlID0gcmVxdWlyZSgnLi9zaGFwZScpO1xuY29uc3QgVXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbmNsYXNzIENpcmNsZSBleHRlbmRzIFNoYXBlIHtcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCBjb2xvciwgcmFkaXVzKSB7XG4gICAgICAgIHN1cGVyKHgsIHksIGNvbG9yKTtcbiAgICAgICAgdGhpcy5yYWRpdXMgPSByYWRpdXM7XG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguYXJjKHRoaXMueCwgdGhpcy55LCB0aGlzLnJhZGl1cywgMCwgMiAqIE1hdGguUEkpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjsgXG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIHJhbmRvbUNpcmNsZShtYXhYLCBtYXhZLCBudW1DaXJjbGVzKSB7XG4gICAgICAgIHJldHVybiBuZXcgQ2lyY2xlKG1heFggKiBNYXRoLnJhbmRvbSgpLCBcbiAgICAgICAgbWF4WSAqIE1hdGgucmFuZG9tKCksIFxuICAgICAgICBVdGlscy5yYW5kb21Db2xvcigpLCAxXG4gICAgICAgIClcbiAgICB9XG5cbiAgICAvLyBzdGF0aWMgcmFkaXVzKG1heFgsIG1heFksIG51bUNpcmNsZXMpIHtcbiAgICAvLyAgICAgLy8gbGV0IHRhcmdldENpcmNsZUFyZWEgPSAobWF4WCAqIG1heFkpIC8gbnVtQ2lyY2xlcztcbiAgICAvLyAgICAgLy8gbGV0IHRhcmdldFJhZGl1cyA9IE1hdGguc3FydCh0YXJnZXRDaXJjbGVBcmVhIC8gTWF0aC5QSSk7XG4gICAgLy8gICAgIC8vIHJldHVybiAyICogdGFyZ2V0UmFkaXVzO1xuICAgIC8vICAgICByZXR1cm4gMTtcbiAgICAvLyB9XG5cbiAgICBtb3ZlUmFuZG9tKG1heFgsIG1heFkpIHtcbiAgICAgICAgbGV0IGR4ID0gTWF0aC5yYW5kb20oKTtcbiAgICAgICAgbGV0IGR5ID0gTWF0aC5yYW5kb20oKTtcbiAgICAgICAgdGhpcy54ID0gTWF0aC5hYnMoKHRoaXMueCArIChkeCAqIHRoaXMucmFkaXVzICogMC4xKSkgJSBtYXhYKTtcbiAgICAgICAgdGhpcy55ID0gTWF0aC5hYnMoKHRoaXMueSArIChkeSAqIHRoaXMucmFkaXVzICogMC4xKSkgJSBtYXhZKTtcbiAgICB9XG5cbiAgICB1cGRhdGVSYWRpdXMobiwgZmFjdG9yKSB7XG4gICAgICAgIHRoaXMucmFkaXVzID0gbipmYWN0b3I7XG4gICAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ2lyY2xlOyAiLCJjb25zdCBWaXN1YWxpemVyID0gcmVxdWlyZSgnLi92aXN1YWxpemVyJyk7XG5jb25zdCBNb3ZpbmdDaXJjbGVzID0gcmVxdWlyZSgnLi9tb3ZpbmdfY2lyY2xlcycpO1xuY29uc3QgQmVhdGluZ0NpcmNsZSA9IHJlcXVpcmUoJy4vYmVhdGluZ19jaXJjbGUnKTtcbmNvbnN0IEJhcnMgPSByZXF1aXJlKCcuL2JhcnMnKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc1wiKTtcbiAgICBsZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICBjbGVhckNhbnZhcygpO1xuXG4gICAgLy8gY3JlYXRlIGF1ZGlvIGNvbnRleHRcbiAgICBjb25zdCBBdWRpb0NvbnRleHQgPSB3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQ7XG4gICAgY29uc3QgYXVkaW9DdHggPSBuZXcgQXVkaW9Db250ZXh0KCk7XG5cbiAgICBjb25zdCBhdWRpb0VsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYXVkaW8nKTtcbiAgICBhdWRpb0VsZW1lbnQuc3JjID0gJ2h0dHBzOi8vYXVkaW8tc3NsLml0dW5lcy5hcHBsZS5jb20vYXBwbGUtYXNzZXRzLXVzLXN0ZC0wMDAwMDEvQXVkaW9QcmV2aWV3MTI4L3Y0LzQ3LzkzLzM5LzQ3OTMzOTZkLTJmYzgtNDExMy1kZjg3LTRiMzYxYzJkNDBjZC9temFmXzIyNDI4MDQ4NjAwOTY4NjA2NjYucGx1cy5hYWMucC5tNGEnO1xuICAgIGNvbnN0IHRyYWNrID0gYXVkaW9DdHguY3JlYXRlTWVkaWFFbGVtZW50U291cmNlKGF1ZGlvRWxlbWVudCk7XG4gICAgY29uc3QgZ2Fpbk5vZGUgPSBhdWRpb0N0eC5jcmVhdGVHYWluKCk7XG4gICAgY29uc3QgYW5hbHl6ZXIgPSBhdWRpb0N0eC5jcmVhdGVBbmFseXNlcigpO1xuICAgIHRyYWNrLmNvbm5lY3QoZ2Fpbk5vZGUpO1xuICAgIHRyYWNrLmNvbm5lY3QoYW5hbHl6ZXIpO1xuICAgIGdhaW5Ob2RlLmNvbm5lY3QoYXVkaW9DdHguZGVzdGluYXRpb24pO1xuXG4gICAgLy8gaW5pdGlhbGl6ZSB2aXN1YWxpemF0aW9ucyBcbiAgICBsZXQgdmlzdWFsaXplciA9IG5ldyBWaXN1YWxpemVyKGFuYWx5emVyKTtcbiAgICBsZXQgbW92aW5nQ2lyY2xlcyA9IG5ldyBNb3ZpbmdDaXJjbGVzKGNhbnZhcywgYW5hbHl6ZXIpO1xuICAgIGxldCBiZWF0aW5nQ2lyY2xlID0gbmV3IEJlYXRpbmdDaXJjbGUoYW5hbHl6ZXIpO1xuICAgIGxldCBiYXJzID0gbmV3IEJhcnMoYW5hbHl6ZXIpO1xuXG4gICAgLy8gZGV0ZWN0IHdoaWNoIHZpc3VhbGl6YXRpb24gaXMgY2hlY2tlZCBcbiAgICBsZXQgY2hlY2tlZDtcbiAgICBjb25zdCByYWRpbyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKFwidmlzdWFsaXphdGlvblwiKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJhZGlvLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChyYWRpb1tpXS5jaGVja2VkKSB7XG4gICAgICAgICAgICBjaGVja2VkID0gcmFkaW9baV0udmFsdWUgXG4gICAgICAgIH1cbiAgICAgICAgcmFkaW9baV0ub25jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChyYWRpb1tpXS52YWx1ZSA9PT0gJ2RlZmF1bHQnKSB7XG4gICAgICAgICAgICAgICAgY2hlY2tlZCA9ICdkZWZhdWx0JztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmFkaW9baV0udmFsdWUgPT09ICdkcnVua2VuJykge1xuICAgICAgICAgICAgICAgIGNoZWNrZWQgPSAnZHJ1bmtlbic7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJhZGlvW2ldLnZhbHVlID09PSAnYmVhdGluZycpIHtcbiAgICAgICAgICAgICAgICBjaGVja2VkID0gJ2JlYXRpbmcnO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyYWRpb1tpXS52YWx1ZSA9PT0gJ2JhcnMnKSB7XG4gICAgICAgICAgICAgICAgY2hlY2tlZCA9ICdiYXJzJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvLyBkZWZhdWx0IGZpbGwgc3R5bGUgXG4gICAgbGV0IGZpbGxTdHlsZSA9IFwiIzI3MkIzNFwiO1xuICAgIGxldCBvcHRpb25zID0ge307XG5cbiAgICAvLyByZXF1ZXN0IGFuaW1hdGlvbiBmcmFtZSBcbiAgICBmdW5jdGlvbiBsb29wKCkge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcClcbiAgICAgICAgaWYgKGNoZWNrZWQgPT09ICdkZWZhdWx0Jykge1xuICAgICAgICAgICAgY2xlYXJDYW52YXMoKTtcbiAgICAgICAgICAgIHZpc3VhbGl6ZXIuZHJhdyhmaWxsU3R5bGUsIGNhbnZhcywgY3R4LCBvcHRpb25zID0gb3B0aW9ucylcbiAgICAgICAgfSBlbHNlIGlmIChjaGVja2VkID09PSAnZHJ1bmtlbicpIHtcbiAgICAgICAgICAgIGNsZWFyQ2FudmFzKCk7XG4gICAgICAgICAgICBtb3ZpbmdDaXJjbGVzLmRyYXcoZmlsbFN0eWxlLCBjdHgpXG4gICAgICAgIH0gZWxzZSBpZiAoY2hlY2tlZCA9PT0gJ2JlYXRpbmcnKSB7XG4gICAgICAgICAgICBjbGVhckNhbnZhcygpO1xuICAgICAgICAgICAgYmVhdGluZ0NpcmNsZS5kcmF3KGZpbGxTdHlsZSwgY2FudmFzLCBjdHgsIG9wdGlvbnMgPSBvcHRpb25zKVxuICAgICAgICB9IGVsc2UgaWYgKGNoZWNrZWQgPT09ICdiYXJzJykge1xuICAgICAgICAgICAgY2xlYXJDYW52YXMoKTtcbiAgICAgICAgICAgIGJhcnMuZHJhdyhmaWxsU3R5bGUsIGNhbnZhcywgY3R4LCBvcHRpb25zID0gb3B0aW9ucylcbiAgICAgICAgfVxuICAgIH1cbiAgICBsb29wKCk7XG5cbiAgICAvLyB2aXN1YWwgc2V0dGluZ3MgXG4gICAgY29uc3QgZGFyayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGFya1wiKVxuICAgIGNvbnN0IGxpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsaWdodFwiKVxuICAgIGNvbnN0IGRlc2VydCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVzZXJ0XCIpXG4gICAgY29uc3Qgc3BhY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNwYWNlXCIpXG4gICAgY29uc3QgdHVuZHJhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0dW5kcmFcIilcbiAgICBjb25zdCBjb250cm9scyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udHJvbHNcIik7XG4gICAgY29uc3QgY29udHJvbEJ1dHRvbnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZmFzXCIpO1xuXG4gICAgZGFyay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGZpbGxTdHlsZSA9IFwiIzI3MkIzNFwiO1xuICAgICAgICBjb250cm9scy5zdHlsZS5jb2xvciA9IFwiI2VlZVwiO1xuICAgICAgICBBcnJheS5mcm9tKGNvbnRyb2xCdXR0b25zKS5mb3JFYWNoKChidXR0b24pID0+IGJ1dHRvbi5zdHlsZS5jb2xvciA9IFwiI2VlZVwiKTtcbiAgICB9KTtcblxuICAgIGxpZ2h0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZpbGxTdHlsZSA9IFwiI2ZmZTBiZFwiO1xuICAgICAgICBjb250cm9scy5zdHlsZS5jb2xvciA9IFwiIzI3MkIzNFwiO1xuICAgICAgICBBcnJheS5mcm9tKGNvbnRyb2xCdXR0b25zKS5mb3JFYWNoKChidXR0b24pID0+IGJ1dHRvbi5zdHlsZS5jb2xvciA9IFwiIzI3MkIzNFwiKTtcbiAgICB9KTtcblxuICAgIGRlc2VydC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucywgeyBwcmltYXJ5OiBcIiNmZjAwMDBcIiwgc2Vjb25kYXJ5OiBcIiNmZjhkMDBcIiwgdGVydGlhcnk6IFwiI2ZmZGMwN1wiIH0pO1xuICAgIH0pO1xuXG4gICAgc3BhY2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMsIHsgcHJpbWFyeTogXCIjMTQxNzE3XCIsIHNlY29uZGFyeTogXCIjNGE1NDU3XCIsIHRlcnRpYXJ5OiBcIiNlMWU1ZTZcIiB9KTtcbiAgICB9KTtcblxuICAgIHR1bmRyYS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucywgeyBwcmltYXJ5OiBcIiMwYzA4NGNcIiwgc2Vjb25kYXJ5OiBcIiMwOTYzODZcIiwgdGVydGlhcnk6IFwiI0ZGRkZGRlwiIH0pO1xuICAgIH0pOyAgICBcblxuXG4gICAgLy8gYXVkaW8gc2V0dGluZ3MgXG4gICAgY29uc3QgZGVtbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb250cm9scy1hdWRpby1kZW1vJyk7XG5cbiAgICBkZW1vLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChhdWRpb0N0eC5zdGF0ZSA9PT0gJ3N1c3BlbmRlZCcpIHtcbiAgICAgICAgICAgIGF1ZGlvQ3R4LnJlc3VtZSgpO1xuICAgICAgICB9XG4gICAgICAgIGF1ZGlvRWxlbWVudC5zcmMgPSAnaHR0cHM6Ly9hdWRpby1zc2wuaXR1bmVzLmFwcGxlLmNvbS9hcHBsZS1hc3NldHMtdXMtc3RkLTAwMDAwMS9BdWRpb1ByZXZpZXcxMjgvdjQvNDcvOTMvMzkvNDc5MzM5NmQtMmZjOC00MTEzLWRmODctNGIzNjFjMmQ0MGNkL216YWZfMjI0MjgwNDg2MDA5Njg2MDY2Ni5wbHVzLmFhYy5wLm00YSc7XG4gICAgICAgIGF1ZGlvRWxlbWVudC5wbGF5KCk7XG4gICAgICAgIHZpc3VhbGl6ZXIucmVzZXRQZWFrKCk7XG4gICAgICAgIHBsYXlCdXR0b24uZGF0YXNldC5wbGF5aW5nID0gJ3RydWUnO1xuICAgIH0pO1xuICAgIFxuICAgIGNvbnN0IHBsYXlCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udHJvbHMtcGxheScpO1xuXG4gICAgLy8gZW5hYmxlIGZpbGUgdXBsb2FkXG4gICAgY29uc3QgYXVkaW9GaWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2F1ZGlvLWZpbGUnKTtcbiAgICBhdWRpb0ZpbGUuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBmaWxlID0gdGhpcy5maWxlc1swXTtcbiAgICAgICAgY29uc3Qgc3JjID0gVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlKTtcbiAgICAgICAgYXVkaW9FbGVtZW50LnNyYyA9IHNyYztcbiAgICAgICAgYXVkaW9DdHgucmVzdW1lKCk7XG4gICAgICAgIGF1ZGlvRWxlbWVudC5wbGF5KCk7XG4gICAgICAgIHZpc3VhbGl6ZXIucmVzZXRQZWFrKCk7XG4gICAgICAgIHBsYXlCdXR0b24uZGF0YXNldC5wbGF5aW5nID0gJ3RydWUnO1xuICAgIH0pO1xuXG4gICAgLy8gcGxheSBhbmQgcGF1c2UgYXVkaW9cbiAgICBwbGF5QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoYXVkaW9DdHguc3RhdGUgPT09ICdzdXNwZW5kZWQnKSB7XG4gICAgICAgICAgICBhdWRpb0N0eC5yZXN1bWUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5kYXRhc2V0LnBsYXlpbmcgPT09ICdmYWxzZScpIHtcbiAgICAgICAgICAgIGF1ZGlvRWxlbWVudC5wbGF5KCk7XG4gICAgICAgICAgICB0aGlzLmRhdGFzZXQucGxheWluZyA9ICd0cnVlJztcblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YXNldC5wbGF5aW5nID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAgIGF1ZGlvRWxlbWVudC5wYXVzZSgpO1xuICAgICAgICAgICAgdGhpcy5kYXRhc2V0LnBsYXlpbmcgPSAnZmFsc2UnO1xuICAgICAgICB9XG4gICAgfSlcblxuICAgIC8vIG1vZGFsIGZvciBzb25nIHVybCBcbiAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic291bmRjbG91ZC1tb2RhbFwiKTtcbiAgICBjb25zdCBzb3VuZGNsb3VkQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250cm9scy1hdWRpby1saW5rXCIpO1xuICAgIGNvbnN0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbG9zZVwiKTtcblxuICAgIHNvdW5kY2xvdWRCdXR0b24ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gIFwiYmxvY2tcIjtcbiAgICB9XG5cbiAgICBjbG9zZUJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9XG5cbiAgICB3aW5kb3cub25jbGljayA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmIChlLnRhcmdldCA9PT0gbW9kYWwpIHtcbiAgICAgICAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHN1Ym1pdCBuZXcgYXVkaW8gVVJMIFxuICAgIGNvbnN0IHNvdW5kY2xvdWRGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzb3VuZGNsb3VkRm9ybVwiKTtcbiAgICBzb3VuZGNsb3VkRm9ybS5vbnN1Ym1pdCA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBmb3JtRWwgPSBkb2N1bWVudC5mb3Jtcy5zb3VuZGNsb3VkRm9ybTtcbiAgICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoZm9ybUVsKTtcbiAgICAgICAgY29uc3Qgc291bmRjbG91ZFVybCA9IGZvcm1EYXRhLmdldChcInNvdW5kY2xvdWRVcmxcIik7XG4gICAgICAgIGF1ZGlvRWxlbWVudC5zcmMgPSBzb3VuZGNsb3VkVXJsO1xuICAgICAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGF1ZGlvQ3R4LnJlc3VtZSgpO1xuICAgICAgICBhdWRpb0VsZW1lbnQucGxheSgpO1xuICAgICAgICB2aXN1YWxpemVyLnJlc2V0UGVhaygpO1xuICAgICAgICBwbGF5QnV0dG9uLmRhdGFzZXQucGxheWluZyA9ICd0cnVlJztcbiAgICB9XG5cbiAgICAvLyBjbGVhciBjYW52YXMgXG4gICAgZnVuY3Rpb24gY2xlYXJDYW52YXMoKSB7XG4gICAgICAgIGNhbnZhcy53aWR0aCA9IGNhbnZhcy53aWR0aDtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICB9XG5cbn0pOyIsImNvbnN0IENpcmNsZSA9IHJlcXVpcmUoJy4vY2lyY2xlJyk7XG5jb25zdCBSZWN0YW5nbGUgPSByZXF1aXJlKCcuL3JlY3RhbmdsZScpO1xuY29uc3QgVXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbk5VTV9DSVJDTEVTID0gMjAwMDsgXG5cbmNsYXNzIE1vdmluZ0NpcmNsZXMge1xuICAgIGNvbnN0cnVjdG9yKGNhbnZhcywgYW5hbHl6ZXIpIHtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XG4gICAgICAgIHRoaXMuYW5hbHl6ZXIgPSBhbmFseXplcjtcbiAgICAgICAgdGhpcy5idWZmZXJMZW5ndGggPSB0aGlzLmFuYWx5emVyLmZyZXF1ZW5jeUJpbkNvdW50O1xuICAgICAgICB0aGlzLmRhdGFBcnJheSA9IG5ldyBVaW50OEFycmF5KHRoaXMuYnVmZmVyTGVuZ3RoKTtcbiAgICAgICAgdGhpcy5hbmFseXplci5mZnRTaXplID0gMTAyNDtcbiAgICAgICAgdGhpcy5jaXJjbGVzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTlVNX0NJUkNMRVM7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5jaXJjbGVzLnB1c2goQ2lyY2xlLnJhbmRvbUNpcmNsZShjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQsIE5VTV9DSVJDTEVTKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlQ2lyY2xlcyhjYW52YXMpIHtcbiAgICAgICAgdGhpcy5jaXJjbGVzLmZvckVhY2goKGNpcmNsZSkgPT4gY2lyY2xlLm1vdmVSYW5kb20odGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCkpXG4gICAgfVxuXG4gICAgdXBkYXRlUmFkaXVzKHJtcykge1xuICAgICAgICB0aGlzLmNpcmNsZXMuZm9yRWFjaCgoY2lyY2xlKSA9PiBjaXJjbGUudXBkYXRlUmFkaXVzKHJtcywgLjAzKSlcbiAgICB9XG5cbiAgICBkcmF3KGZpbGxTdHlsZSwgY3R4KSB7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBmaWxsU3R5bGU7XG4gICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5hbmFseXplci5nZXRCeXRlRnJlcXVlbmN5RGF0YSh0aGlzLmRhdGFBcnJheSk7XG4gICAgICAgIGNvbnN0IHJtcyA9IFV0aWxzLmdldFJNUyh0aGlzLmRhdGFBcnJheSk7XG4gICAgICAgIHRoaXMuY2lyY2xlcy5mb3JFYWNoKChjaXJjbGUpID0+IGNpcmNsZS5kcmF3KGN0eCkpO1xuICAgICAgICB0aGlzLm1vdmVDaXJjbGVzKCk7XG4gICAgICAgIHRoaXMudXBkYXRlUmFkaXVzKHJtcyk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE1vdmluZ0NpcmNsZXM7IiwiY29uc3QgQ2lyY2xlID0gcmVxdWlyZSgnLi9jaXJjbGUnKTtcblxuY2xhc3MgUHVsc2luZ0NpcmNsZSBleHRlbmRzIENpcmNsZSB7XG4gICAgY29uc3RydWN0b3IoeCwgeSwgY29sb3IsIHJhZGl1cywgY3R4KSB7XG4gICAgICAgIHN1cGVyKHgsIHksIGNvbG9yLCByYWRpdXMpO1xuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgdGhpcy5jdXJyZW50UmFkaXVzID0gdGhpcy5yYWRpdXM7XG4gICAgfVxuICAgIFxuICAgIGRyYXcoKSB7XG4gICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICB0aGlzLmN0eC5hcmModGhpcy54LCB0aGlzLnksIHRoaXMuY3VycmVudFJhZGl1cywgMCwgMiAqIE1hdGguUEkpO1xuICAgICAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IFwicmdiYSgyNTUsIDI1NSwgMjU1LCBcIiArIHRoaXMuY3VycmVudFJhZGl1cy81MDAgKyBcIilcIlxuICAgICAgICB0aGlzLmN0eC5saW5lV2lkdGggPSB0aGlzLmN1cnJlbnRSYWRpdXMgKi4wMTtcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gICAgICAgIHRoaXMuY3VycmVudFJhZGl1cyAqPSAxLjE7IFxuICAgICAgICBpZiAodGhpcy5jdXJyZW50UmFkaXVzIDwgMjAwMCkge1xuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuZHJhdy5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQdWxzaW5nQ2lyY2xlOyIsImNvbnN0IFNoYXBlID0gcmVxdWlyZSgnLi9zaGFwZScpO1xuXG5jbGFzcyBSZWN0YW5nbGUgZXh0ZW5kcyBTaGFwZSB7XG4gICAgY29uc3RydWN0b3IoeCwgeSwgY29sb3IsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIoeCwgeSwgY29sb3IpO1xuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIH1cblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgfSBcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZWN0YW5nbGU7IiwiY2xhc3MgU2hhcGUge1xuICAgIGNvbnN0cnVjdG9yKHgsIHksIGNvbG9yKSB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU2hhcGU7IiwiY29uc3QgSEVYX0RJR0lUUyA9IFwiMDEyMzQ1Njc4OUFCQ0RFRlwiO1xuXG5jb25zdCBVdGlscyA9IHtcbiAgICBnZXRSTVMoYXJyKSB7XG4gICAgICAgIGxldCB2YWx1ZXMgPSAwO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFsdWVzICs9IGFycltpXSAqIGFycltpXTtcbiAgICAgICAgfVxuICAgICAgICBybXMgPSBNYXRoLnNxcnQodmFsdWVzIC8gYXJyLmxlbmd0aCk7XG4gICAgICAgIHJldHVybiBybXM7XG4gICAgfSxcblxuICAgIC8vIGZyb20gJ2RydW5rZW4gY2lyY2xlcycgXG4gICAgcmFuZG9tQ29sb3IoKSB7XG4gICAgICAgIGxldCBjb2xvciA9IFwiI1wiO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xuICAgICAgICAgICAgY29sb3IgKz0gSEVYX0RJR0lUU1tNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogMTYpKV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbG9yO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBVdGlsczsiLCJjb25zdCBSZWN0YW5nbGUgPSByZXF1aXJlKCcuL3JlY3RhbmdsZScpO1xuY29uc3QgQ2lyY2xlID0gcmVxdWlyZSgnLi9jaXJjbGUnKTtcbmNvbnN0IFB1bHNpbmdDaXJjbGUgPSByZXF1aXJlKCcuL3B1bHNpbmdfY2lyY2xlJyk7XG5jb25zdCBVdGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxuY2xhc3MgVmlzdWFsaXplciB7XG4gICAgY29uc3RydWN0b3IoYW5hbHl6ZXIpIHtcbiAgICAgICAgdGhpcy5hbmFseXplciA9IGFuYWx5emVyO1xuICAgICAgICB0aGlzLmJ1ZmZlckxlbmd0aCA9IHRoaXMuYW5hbHl6ZXIuZnJlcXVlbmN5QmluQ291bnQ7XG4gICAgICAgIHRoaXMuZGF0YUFycmF5ID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5idWZmZXJMZW5ndGgpO1xuICAgICAgICB0aGlzLmFuYWx5emVyLmZmdFNpemUgPSAyMDQ4O1xuICAgICAgICB0aGlzLnBlYWsgPSA1MDtcbiAgICB9XG5cbiAgICByZXNldFBlYWsoKSB7XG4gICAgICAgIHRoaXMucGVhayA9IDUwO1xuICAgIH1cblxuICAgIGRyYXcoZmlsbFN0eWxlLCBjYW52YXMsIGN0eCwgb3B0aW9ucykgeyBcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGZpbGxTdHlsZTtcbiAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgICAgIHRoaXMuYW5hbHl6ZXIuZ2V0Qnl0ZUZyZXF1ZW5jeURhdGEodGhpcy5kYXRhQXJyYXkpO1xuICAgICAgICBjb25zdCBybXMgPSBVdGlscy5nZXRSTVModGhpcy5kYXRhQXJyYXkpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgY2lyY2xlID0gbmV3IENpcmNsZSgxNTAsIDE1MCwgXCJ3aGl0ZVwiLCBybXMpO1xuICAgICAgICBjaXJjbGUuZHJhdyhjdHgpO1xuXG4gICAgICAgIC8vcHVsc2UgY2lyY2x1bGFyXG4gICAgICAgIGlmIChybXMgPiAodGhpcy5wZWFrICogLjk4KSkge1xuICAgICAgICAgICAgbGV0IGNpcmNsZTIgPSBuZXcgUHVsc2luZ0NpcmNsZShjaXJjbGUueCwgY2lyY2xlLnksIFwid2hpdGVcIiwgcm1zLCBjdHgpO1xuICAgICAgICAgICAgY2lyY2xlMi5kcmF3KCk7XG4gICAgICAgICAgICB0aGlzLnBlYWsgPSBybXM7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzdGFydCBhdCB0b3AgbGVmdCBvZiBjaXJjbGU7IFxuICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICBjdHgudHJhbnNsYXRlKGNpcmNsZS54LCBjaXJjbGUueSk7XG5cbiAgICAgICAgbGV0IGJhcnMgPSAzNjA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzYwOyBpICs9ICgzNjAvYmFycykpIHtcbiAgICAgICAgICAgIGNvbnN0IGJhcldpZHRoID0gKDIgKiBNYXRoLlBJICogcm1zKSAvIGJhcnM7XG4gICAgICAgICAgICBjb25zdCBiYXJIZWlnaHQgPSAoY2FudmFzLmhlaWdodCAqICh0aGlzLmRhdGFBcnJheVtpXSAvIDI1NSkpO1xuICAgICAgICAgICAgY3R4LnJvdGF0ZSgxICogTWF0aC5QSSAvIDE4MCk7XG4gICAgICAgICAgICBjb25zdCBncmQgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgMCwgY2FudmFzLmhlaWdodCwgMCk7XG4gICAgICAgICAgICBncmQuYWRkQ29sb3JTdG9wKDAsIG9wdGlvbnMucHJpbWFyeSA/IG9wdGlvbnMucHJpbWFyeSA6IFwicmVkXCIpO1xuICAgICAgICAgICAgZ3JkLmFkZENvbG9yU3RvcCguNSwgb3B0aW9ucy5zZWNvbmRhcnkgPyBvcHRpb25zLnNlY29uZGFyeSA6IFwib3JhbmdlXCIpO1xuICAgICAgICAgICAgZ3JkLmFkZENvbG9yU3RvcCgxLCBvcHRpb25zLnRlcnRpYXJ5ID8gb3B0aW9ucy50ZXJ0aWFyeSA6IFwid2hpdGVcIik7XG4gICAgICAgICAgICBjb25zdCByZWN0ID0gbmV3IFJlY3RhbmdsZShybXMsIC1iYXJXaWR0aCAvIDIsIGdyZCwgYmFySGVpZ2h0ICogMiwgYmFyV2lkdGgpO1xuICAgICAgICAgICAgcmVjdC5kcmF3KGN0eCk7XG4gICAgICAgIH1cbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVmlzdWFsaXplcjsiXSwic291cmNlUm9vdCI6IiJ9