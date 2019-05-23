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
      audioElement.src = 'https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview128/v4/47/93/39/4793396d-2fc8-4113-df87-4b361c2d40cd/mzaf_2242804860096860666.plus.aac.p.m4a';
    }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JlYXRpbmdfY2lyY2xlLmpzIiwid2VicGFjazovLy8uL3NyYy9jaXJjbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9tb3ZpbmdfY2lyY2xlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcHVsc2luZ19jaXJjbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlY3RhbmdsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy92aXN1YWxpemVyLmpzIl0sIm5hbWVzIjpbIlJlY3RhbmdsZSIsInJlcXVpcmUiLCJVdGlscyIsIkJhcnMiLCJhbmFseXplciIsImJ1ZmZlckxlbmd0aCIsImZyZXF1ZW5jeUJpbkNvdW50IiwiZGF0YUFycmF5IiwiVWludDhBcnJheSIsImZmdFNpemUiLCJwZWFrIiwiZmlsbFN0eWxlIiwiY2FudmFzIiwiY3R4Iiwib3B0aW9ucyIsImZpbGxSZWN0Iiwid2lkdGgiLCJoZWlnaHQiLCJnZXRCeXRlRnJlcXVlbmN5RGF0YSIsImJhcldpZHRoIiwiYmFySGVpZ2h0IiwieCIsImkiLCJncmQiLCJjcmVhdGVMaW5lYXJHcmFkaWVudCIsImFkZENvbG9yU3RvcCIsInByaW1hcnkiLCJzZWNvbmRhcnkiLCJ0ZXJ0aWFyeSIsInJlY3QiLCJkcmF3IiwibW9kdWxlIiwiZXhwb3J0cyIsIkNpcmNsZSIsIkJlYXRpbmdDaXJjbGUiLCJjdXJyZW50UmFkaXVzIiwicmFkaXVzIiwiY2lyY2xlcyIsIk5VTV9DSVJDTEVTIiwicHVzaCIsInJhbmRvbUNpcmNsZSIsInJtcyIsImdldFJNUyIsImNpcmNsZSIsInNhdmUiLCJ0cmFuc2xhdGUiLCJ5IiwiYmFycyIsIk1hdGgiLCJQSSIsInJvdGF0ZSIsInJlc3RvcmUiLCJTaGFwZSIsImNvbG9yIiwiYmVnaW5QYXRoIiwiYXJjIiwiZmlsbCIsIm1heFgiLCJtYXhZIiwiZHgiLCJyYW5kb20iLCJkeSIsImFicyIsIm4iLCJmYWN0b3IiLCJudW1DaXJjbGVzIiwicmFuZG9tQ29sb3IiLCJWaXN1YWxpemVyIiwiTW92aW5nQ2lyY2xlcyIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImdldEVsZW1lbnRCeUlkIiwiZ2V0Q29udGV4dCIsImNsZWFyQ2FudmFzIiwiQXVkaW9Db250ZXh0Iiwid2luZG93Iiwid2Via2l0QXVkaW9Db250ZXh0IiwiYXVkaW9DdHgiLCJhdWRpb0VsZW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidHJhY2siLCJjcmVhdGVNZWRpYUVsZW1lbnRTb3VyY2UiLCJnYWluTm9kZSIsImNyZWF0ZUdhaW4iLCJjcmVhdGVBbmFseXNlciIsImNvbm5lY3QiLCJkZXN0aW5hdGlvbiIsInZpc3VhbGl6ZXIiLCJtb3ZpbmdDaXJjbGVzIiwiYmVhdGluZ0NpcmNsZSIsImNoZWNrZWQiLCJyYWRpbyIsImdldEVsZW1lbnRzQnlOYW1lIiwidmFsdWUiLCJvbmNsaWNrIiwibGVuZ3RoIiwibG9vcCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImRhcmsiLCJsaWdodCIsImRlc2VydCIsInNwYWNlIiwidHVuZHJhIiwiY29udHJvbHMiLCJjb250cm9sQnV0dG9ucyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJzdHlsZSIsIkFycmF5IiwiZnJvbSIsImZvckVhY2giLCJidXR0b24iLCJPYmplY3QiLCJhc3NpZ24iLCJkZW1vIiwic3RhdGUiLCJyZXN1bWUiLCJzcmMiLCJwbGF5IiwicmVzZXRQZWFrIiwicGxheUJ1dHRvbiIsImRhdGFzZXQiLCJwbGF5aW5nIiwiYXVkaW9GaWxlIiwiZmlsZSIsImZpbGVzIiwiVVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwicGF1c2UiLCJtb2RhbCIsInNvdW5kY2xvdWRCdXR0b24iLCJjbG9zZUJ1dHRvbiIsImRpc3BsYXkiLCJlIiwidGFyZ2V0Iiwic291bmRjbG91ZEZvcm0iLCJvbnN1Ym1pdCIsInByZXZlbnREZWZhdWx0IiwiZm9ybUVsIiwiZm9ybXMiLCJmb3JtRGF0YSIsIkZvcm1EYXRhIiwic291bmRjbG91ZFVybCIsImdldCIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsImNsZWFyUmVjdCIsIm1vdmVSYW5kb20iLCJ1cGRhdGVSYWRpdXMiLCJtb3ZlQ2lyY2xlcyIsIlB1bHNpbmdDaXJjbGUiLCJzdHJva2VTdHlsZSIsImxpbmVXaWR0aCIsInN0cm9rZSIsImJpbmQiLCJIRVhfRElHSVRTIiwiYXJyIiwidmFsdWVzIiwic3FydCIsImZsb29yIiwiY2lyY2xlMiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLElBQU1BLFNBQVMsR0FBR0MsbUJBQU8sQ0FBQyx1Q0FBRCxDQUF6Qjs7QUFDQSxJQUFNQyxLQUFLLEdBQUdELG1CQUFPLENBQUMsK0JBQUQsQ0FBckI7O0lBRU1FLEk7OztBQUNGLGdCQUFZQyxRQUFaLEVBQXNCO0FBQUE7O0FBQ2xCLFNBQUtBLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsU0FBS0MsWUFBTCxHQUFvQixLQUFLRCxRQUFMLENBQWNFLGlCQUFsQztBQUNBLFNBQUtDLFNBQUwsR0FBaUIsSUFBSUMsVUFBSixDQUFlLEtBQUtILFlBQXBCLENBQWpCO0FBQ0EsU0FBS0QsUUFBTCxDQUFjSyxPQUFkLEdBQXdCLElBQXhCO0FBQ0EsU0FBS0MsSUFBTCxHQUFZLEVBQVo7QUFDSDs7Ozt5QkFFSUMsUyxFQUFXQyxNLEVBQVFDLEcsRUFBS0MsTyxFQUFTO0FBQ2xDRCxTQUFHLENBQUNGLFNBQUosR0FBZ0JBLFNBQWhCO0FBQ0FFLFNBQUcsQ0FBQ0UsUUFBSixDQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUJILE1BQU0sQ0FBQ0ksS0FBMUIsRUFBaUNKLE1BQU0sQ0FBQ0ssTUFBeEM7QUFDQSxXQUFLYixRQUFMLENBQWNjLG9CQUFkLENBQW1DLEtBQUtYLFNBQXhDO0FBRUEsVUFBSVksUUFBUSxHQUFJUCxNQUFNLENBQUNJLEtBQVAsR0FBZSxLQUFLWCxZQUFyQixHQUFxQyxHQUFwRDtBQUNBLFVBQUllLFNBQUo7QUFDQSxVQUFJQyxDQUFDLEdBQUcsQ0FBUjs7QUFFQSxXQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS2pCLFlBQXpCLEVBQXVDaUIsQ0FBQyxFQUF4QyxFQUE0QztBQUN4Q0YsaUJBQVMsR0FBR1IsTUFBTSxDQUFDSyxNQUFQLElBQWlCLEtBQUtWLFNBQUwsQ0FBZWUsQ0FBZixJQUFrQixHQUFuQyxDQUFaLENBRHdDLENBRXhDO0FBQ0E7QUFDQTs7QUFFQSxZQUFNQyxHQUFHLEdBQUdWLEdBQUcsQ0FBQ1csb0JBQUosQ0FBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0JaLE1BQU0sQ0FBQ0ksS0FBdEMsRUFBNkMsQ0FBN0MsQ0FBWjtBQUNBTyxXQUFHLENBQUNFLFlBQUosQ0FBaUIsQ0FBakIsRUFBb0JYLE9BQU8sQ0FBQ1ksT0FBUixHQUFrQlosT0FBTyxDQUFDWSxPQUExQixHQUFvQyxNQUF4RDtBQUNBSCxXQUFHLENBQUNFLFlBQUosQ0FBaUIsRUFBakIsRUFBcUJYLE9BQU8sQ0FBQ2EsU0FBUixHQUFvQmIsT0FBTyxDQUFDYSxTQUE1QixHQUF3QyxPQUE3RDtBQUNBSixXQUFHLENBQUNFLFlBQUosQ0FBaUIsQ0FBakIsRUFBb0JYLE9BQU8sQ0FBQ2MsUUFBUixHQUFtQmQsT0FBTyxDQUFDYyxRQUEzQixHQUFzQyxPQUExRCxFQVR3QyxDQVd4Qzs7QUFDQSxZQUFJQyxJQUFJLEdBQUcsSUFBSTdCLFNBQUosQ0FBY3FCLENBQWQsRUFBa0JULE1BQU0sQ0FBQ0ssTUFBUCxHQUFnQkcsU0FBakIsR0FBNEIsR0FBN0MsRUFBa0RHLEdBQWxELEVBQXVESixRQUF2RCxFQUFpRUMsU0FBakUsQ0FBWDtBQUNBUyxZQUFJLENBQUNDLElBQUwsQ0FBVWpCLEdBQVY7QUFDQVEsU0FBQyxJQUFJRixRQUFMO0FBQ0g7QUFDSjs7Ozs7O0FBR0xZLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjdCLElBQWpCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeENBLElBQU04QixNQUFNLEdBQUdoQyxtQkFBTyxDQUFDLGlDQUFELENBQXRCOztBQUNBLElBQU1ELFNBQVMsR0FBR0MsbUJBQU8sQ0FBQyx1Q0FBRCxDQUF6Qjs7QUFDQSxJQUFNQyxLQUFLLEdBQUdELG1CQUFPLENBQUMsK0JBQUQsQ0FBckI7O0lBRU1pQyxhOzs7QUFDRix5QkFBWTlCLFFBQVosRUFBc0I7QUFBQTs7QUFDbEIsU0FBS0EsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxTQUFLQyxZQUFMLEdBQW9CLEtBQUtELFFBQUwsQ0FBY0UsaUJBQWxDO0FBQ0EsU0FBS0MsU0FBTCxHQUFpQixJQUFJQyxVQUFKLENBQWUsS0FBS0gsWUFBcEIsQ0FBakI7QUFDQSxTQUFLRCxRQUFMLENBQWNLLE9BQWQsR0FBd0IsSUFBeEI7QUFDQSxTQUFLQyxJQUFMLEdBQVksRUFBWjtBQUNBLFNBQUt5QixhQUFMLEdBQXFCLEtBQUtDLE1BQTFCO0FBRUEsU0FBS0MsT0FBTCxHQUFlLEVBQWY7O0FBQ0EsU0FBSyxJQUFJZixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHZ0IsV0FBcEIsRUFBaUNoQixDQUFDLEVBQWxDLEVBQXNDO0FBQ2xDLFdBQUtlLE9BQUwsQ0FBYUUsSUFBYixDQUFrQk4sTUFBTSxDQUFDTyxZQUFQLENBQW9CNUIsTUFBTSxDQUFDSSxLQUEzQixFQUFrQ0osTUFBTSxDQUFDSyxNQUF6QyxFQUFpRHFCLFdBQWpELENBQWxCO0FBQ0g7QUFDSjs7Ozt5QkFFSTNCLFMsRUFBV0MsTSxFQUFRQyxHLEVBQUtDLE8sRUFBUztBQUVsQ0QsU0FBRyxDQUFDRixTQUFKLEdBQWdCQSxTQUFoQjtBQUNBRSxTQUFHLENBQUNFLFFBQUosQ0FBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CSCxNQUFNLENBQUNJLEtBQTFCLEVBQWlDSixNQUFNLENBQUNLLE1BQXhDO0FBQ0EsV0FBS2IsUUFBTCxDQUFjYyxvQkFBZCxDQUFtQyxLQUFLWCxTQUF4QztBQUNBLFVBQU1rQyxHQUFHLEdBQUd2QyxLQUFLLENBQUN3QyxNQUFOLENBQWEsS0FBS25DLFNBQWxCLENBQVo7QUFFQSxVQUFNb0MsTUFBTSxHQUFHLElBQUlWLE1BQUosQ0FBVyxHQUFYLEVBQWdCLEdBQWhCLEVBQXFCLE9BQXJCLEVBQThCUSxHQUE5QixDQUFmO0FBQ0FFLFlBQU0sQ0FBQ2IsSUFBUCxDQUFZakIsR0FBWjtBQUVBQSxTQUFHLENBQUMrQixJQUFKO0FBQ0EvQixTQUFHLENBQUNnQyxTQUFKLENBQWNGLE1BQU0sQ0FBQ3RCLENBQXJCLEVBQXdCc0IsTUFBTSxDQUFDRyxDQUEvQjtBQUVBLFVBQUlDLElBQUksR0FBRyxHQUFYOztBQUNBLFdBQUssSUFBSXpCLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsR0FBcEIsRUFBeUJBLENBQUMsSUFBSyxNQUFNeUIsSUFBckMsRUFBNEM7QUFDeEMsWUFBTTVCLFFBQVEsR0FBSSxJQUFJNkIsSUFBSSxDQUFDQyxFQUFULEdBQWNSLEdBQWYsR0FBc0JNLElBQXZDO0FBQ0EsWUFBTTNCLFNBQVMsR0FBSVIsTUFBTSxDQUFDSyxNQUFQLElBQWlCLEtBQUtWLFNBQUwsQ0FBZWUsQ0FBZixJQUFvQixHQUFyQyxDQUFELEdBQThDLEVBQWhFO0FBQ0FULFdBQUcsQ0FBQ3FDLE1BQUosQ0FBVyxJQUFJRixJQUFJLENBQUNDLEVBQVQsR0FBYyxHQUF6QjtBQUNBLFlBQU0xQixHQUFHLEdBQUdWLEdBQUcsQ0FBQ1csb0JBQUosQ0FBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsR0FBL0IsRUFBb0MsQ0FBcEMsQ0FBWjtBQUNBRCxXQUFHLENBQUNFLFlBQUosQ0FBaUIsQ0FBakIsRUFBb0JYLE9BQU8sQ0FBQ1ksT0FBUixHQUFrQlosT0FBTyxDQUFDWSxPQUExQixHQUFvQyxLQUF4RDtBQUNBSCxXQUFHLENBQUNFLFlBQUosQ0FBaUIsRUFBakIsRUFBcUJYLE9BQU8sQ0FBQ2EsU0FBUixHQUFvQmIsT0FBTyxDQUFDYSxTQUE1QixHQUF3QyxRQUE3RDtBQUNBSixXQUFHLENBQUNFLFlBQUosQ0FBaUIsQ0FBakIsRUFBb0JYLE9BQU8sQ0FBQ2MsUUFBUixHQUFtQmQsT0FBTyxDQUFDYyxRQUEzQixHQUFzQyxPQUExRDtBQUNBLFlBQU1DLElBQUksR0FBRyxJQUFJN0IsU0FBSixDQUFjeUMsR0FBZCxFQUFtQixDQUFDdEIsUUFBRCxHQUFZLENBQS9CLEVBQWtDSSxHQUFsQyxFQUF1Q0gsU0FBdkMsRUFBa0RELFFBQWxELENBQWI7QUFDQVUsWUFBSSxDQUFDQyxJQUFMLENBQVVqQixHQUFWO0FBQ0g7O0FBQ0RBLFNBQUcsQ0FBQ3NDLE9BQUo7QUFDSDs7Ozs7O0FBR0xwQixNQUFNLENBQUNDLE9BQVAsR0FBaUJFLGFBQWpCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaERBLElBQU1rQixLQUFLLEdBQUduRCxtQkFBTyxDQUFDLCtCQUFELENBQXJCOztBQUNBLElBQU1DLEtBQUssR0FBR0QsbUJBQU8sQ0FBQywrQkFBRCxDQUFyQjs7SUFFTWdDLE07Ozs7O0FBQ0Ysa0JBQVlaLENBQVosRUFBZXlCLENBQWYsRUFBa0JPLEtBQWxCLEVBQXlCakIsTUFBekIsRUFBaUM7QUFBQTs7QUFBQTs7QUFDN0IsZ0ZBQU1mLENBQU4sRUFBU3lCLENBQVQsRUFBWU8sS0FBWjtBQUNBLFVBQUtqQixNQUFMLEdBQWNBLE1BQWQ7QUFGNkI7QUFHaEM7Ozs7eUJBRUl2QixHLEVBQUs7QUFDTkEsU0FBRyxDQUFDeUMsU0FBSjtBQUNBekMsU0FBRyxDQUFDMEMsR0FBSixDQUFRLEtBQUtsQyxDQUFiLEVBQWdCLEtBQUt5QixDQUFyQixFQUF3QixLQUFLVixNQUE3QixFQUFxQyxDQUFyQyxFQUF3QyxJQUFJWSxJQUFJLENBQUNDLEVBQWpEO0FBQ0FwQyxTQUFHLENBQUNGLFNBQUosR0FBZ0IsS0FBSzBDLEtBQXJCO0FBQ0F4QyxTQUFHLENBQUMyQyxJQUFKO0FBQ0g7OztBQVNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsrQkFFV0MsSSxFQUFNQyxJLEVBQU07QUFDbkIsVUFBSUMsRUFBRSxHQUFHWCxJQUFJLENBQUNZLE1BQUwsRUFBVDtBQUNBLFVBQUlDLEVBQUUsR0FBR2IsSUFBSSxDQUFDWSxNQUFMLEVBQVQ7QUFDQSxXQUFLdkMsQ0FBTCxHQUFTMkIsSUFBSSxDQUFDYyxHQUFMLENBQVMsQ0FBQyxLQUFLekMsQ0FBTCxHQUFVc0MsRUFBRSxHQUFHLEtBQUt2QixNQUFWLEdBQW1CLEdBQTlCLElBQXNDcUIsSUFBL0MsQ0FBVDtBQUNBLFdBQUtYLENBQUwsR0FBU0UsSUFBSSxDQUFDYyxHQUFMLENBQVMsQ0FBQyxLQUFLaEIsQ0FBTCxHQUFVZSxFQUFFLEdBQUcsS0FBS3pCLE1BQVYsR0FBbUIsR0FBOUIsSUFBc0NzQixJQUEvQyxDQUFUO0FBQ0g7OztpQ0FFWUssQyxFQUFHQyxNLEVBQVE7QUFDcEIsV0FBSzVCLE1BQUwsR0FBYzJCLENBQUMsR0FBQ0MsTUFBaEI7QUFDSDs7O2lDQXZCbUJQLEksRUFBTUMsSSxFQUFNTyxVLEVBQVk7QUFDeEMsYUFBTyxJQUFJaEMsTUFBSixDQUFXd0IsSUFBSSxHQUFHVCxJQUFJLENBQUNZLE1BQUwsRUFBbEIsRUFDUEYsSUFBSSxHQUFHVixJQUFJLENBQUNZLE1BQUwsRUFEQSxFQUVQMUQsS0FBSyxDQUFDZ0UsV0FBTixFQUZPLEVBRWMsQ0FGZCxDQUFQO0FBSUg7Ozs7RUFsQmdCZCxLOztBQXdDckJyQixNQUFNLENBQUNDLE9BQVAsR0FBaUJDLE1BQWpCLEM7Ozs7Ozs7Ozs7O0FDM0NBLElBQU1rQyxVQUFVLEdBQUdsRSxtQkFBTyxDQUFDLHlDQUFELENBQTFCOztBQUNBLElBQU1tRSxhQUFhLEdBQUduRSxtQkFBTyxDQUFDLGlEQUFELENBQTdCOztBQUNBLElBQU1pQyxhQUFhLEdBQUdqQyxtQkFBTyxDQUFDLGlEQUFELENBQTdCOztBQUNBLElBQU1FLElBQUksR0FBR0YsbUJBQU8sQ0FBQyw2QkFBRCxDQUFwQjs7QUFFQW9FLFFBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQU07QUFDaEQsTUFBSTFELE1BQU0sR0FBR3lELFFBQVEsQ0FBQ0UsY0FBVCxDQUF3QixRQUF4QixDQUFiO0FBQ0EsTUFBSTFELEdBQUcsR0FBR0QsTUFBTSxDQUFDNEQsVUFBUCxDQUFrQixJQUFsQixDQUFWO0FBQ0FDLGFBQVcsR0FIcUMsQ0FLaEQ7O0FBQ0EsTUFBTUMsWUFBWSxHQUFHQyxNQUFNLENBQUNELFlBQVAsSUFBdUJDLE1BQU0sQ0FBQ0Msa0JBQW5EO0FBQ0EsTUFBTUMsUUFBUSxHQUFHLElBQUlILFlBQUosRUFBakI7QUFFQSxNQUFNSSxZQUFZLEdBQUdULFFBQVEsQ0FBQ1UsYUFBVCxDQUF1QixRQUF2QixDQUFyQjtBQUNBLE1BQU1DLEtBQUssR0FBR0gsUUFBUSxDQUFDSSx3QkFBVCxDQUFrQ0gsWUFBbEMsQ0FBZDtBQUNBLE1BQU1JLFFBQVEsR0FBR0wsUUFBUSxDQUFDTSxVQUFULEVBQWpCO0FBQ0EsTUFBTS9FLFFBQVEsR0FBR3lFLFFBQVEsQ0FBQ08sY0FBVCxFQUFqQjtBQUNBSixPQUFLLENBQUNLLE9BQU4sQ0FBY0gsUUFBZDtBQUNBRixPQUFLLENBQUNLLE9BQU4sQ0FBY2pGLFFBQWQ7QUFDQThFLFVBQVEsQ0FBQ0csT0FBVCxDQUFpQlIsUUFBUSxDQUFDUyxXQUExQixFQWZnRCxDQWlCaEQ7O0FBQ0EsTUFBSUMsVUFBVSxHQUFHLElBQUlwQixVQUFKLENBQWUvRCxRQUFmLENBQWpCO0FBQ0EsTUFBSW9GLGFBQWEsR0FBRyxJQUFJcEIsYUFBSixDQUFrQnhELE1BQWxCLEVBQTBCUixRQUExQixDQUFwQjtBQUNBLE1BQUlxRixhQUFhLEdBQUcsSUFBSXZELGFBQUosQ0FBa0I5QixRQUFsQixDQUFwQjtBQUNBLE1BQUkyQyxJQUFJLEdBQUcsSUFBSTVDLElBQUosQ0FBU0MsUUFBVCxDQUFYLENBckJnRCxDQXVCaEQ7O0FBQ0EsTUFBSXNGLE9BQUo7QUFDQSxNQUFNQyxLQUFLLEdBQUd0QixRQUFRLENBQUN1QixpQkFBVCxDQUEyQixlQUEzQixDQUFkOztBQXpCZ0QsNkJBMEJ2Q3RFLENBMUJ1QztBQTJCNUMsUUFBSXFFLEtBQUssQ0FBQ3JFLENBQUQsQ0FBTCxDQUFTb0UsT0FBYixFQUFzQjtBQUNsQkEsYUFBTyxHQUFHQyxLQUFLLENBQUNyRSxDQUFELENBQUwsQ0FBU3VFLEtBQW5CO0FBQ0g7O0FBQ0RGLFNBQUssQ0FBQ3JFLENBQUQsQ0FBTCxDQUFTd0UsT0FBVCxHQUFtQixZQUFZO0FBQzNCLFVBQUlILEtBQUssQ0FBQ3JFLENBQUQsQ0FBTCxDQUFTdUUsS0FBVCxLQUFtQixTQUF2QixFQUFrQztBQUM5QkgsZUFBTyxHQUFHLFNBQVY7QUFDSCxPQUZELE1BRU8sSUFBSUMsS0FBSyxDQUFDckUsQ0FBRCxDQUFMLENBQVN1RSxLQUFULEtBQW1CLFNBQXZCLEVBQWtDO0FBQ3JDSCxlQUFPLEdBQUcsU0FBVjtBQUNILE9BRk0sTUFFQSxJQUFJQyxLQUFLLENBQUNyRSxDQUFELENBQUwsQ0FBU3VFLEtBQVQsS0FBbUIsU0FBdkIsRUFBa0M7QUFDckNILGVBQU8sR0FBRyxTQUFWO0FBQ0gsT0FGTSxNQUVBLElBQUlDLEtBQUssQ0FBQ3JFLENBQUQsQ0FBTCxDQUFTdUUsS0FBVCxLQUFtQixNQUF2QixFQUErQjtBQUNsQ0gsZUFBTyxHQUFHLE1BQVY7QUFDSDtBQUNKLEtBVkQ7QUE5QjRDOztBQTBCaEQsT0FBSyxJQUFJcEUsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR3FFLEtBQUssQ0FBQ0ksTUFBMUIsRUFBa0N6RSxDQUFDLEVBQW5DLEVBQXVDO0FBQUEsVUFBOUJBLENBQThCO0FBZXRDLEdBekMrQyxDQTJDaEQ7OztBQUNBLE1BQUlYLFNBQVMsR0FBRyxTQUFoQjtBQUNBLE1BQUlHLE9BQU8sR0FBRyxFQUFkLENBN0NnRCxDQStDaEQ7O0FBQ0EsV0FBU2tGLElBQVQsR0FBZ0I7QUFDWkMseUJBQXFCLENBQUNELElBQUQsQ0FBckI7O0FBQ0EsUUFBSU4sT0FBTyxLQUFLLFNBQWhCLEVBQTJCO0FBQ3ZCakIsaUJBQVc7QUFDWGMsZ0JBQVUsQ0FBQ3pELElBQVgsQ0FBZ0JuQixTQUFoQixFQUEyQkMsTUFBM0IsRUFBbUNDLEdBQW5DLEVBQXdDQyxPQUFPLEdBQUdBLE9BQWxEO0FBQ0gsS0FIRCxNQUdPLElBQUk0RSxPQUFPLEtBQUssU0FBaEIsRUFBMkI7QUFDOUJqQixpQkFBVztBQUNYZSxtQkFBYSxDQUFDMUQsSUFBZCxDQUFtQm5CLFNBQW5CLEVBQThCRSxHQUE5QjtBQUNILEtBSE0sTUFHQSxJQUFJNkUsT0FBTyxLQUFLLFNBQWhCLEVBQTJCO0FBQzlCakIsaUJBQVc7QUFDWGdCLG1CQUFhLENBQUMzRCxJQUFkLENBQW1CbkIsU0FBbkIsRUFBOEJDLE1BQTlCLEVBQXNDQyxHQUF0QyxFQUEyQ0MsT0FBTyxHQUFHQSxPQUFyRDtBQUNILEtBSE0sTUFHQSxJQUFJNEUsT0FBTyxLQUFLLE1BQWhCLEVBQXdCO0FBQzNCakIsaUJBQVc7QUFDWDFCLFVBQUksQ0FBQ2pCLElBQUwsQ0FBVW5CLFNBQVYsRUFBcUJDLE1BQXJCLEVBQTZCQyxHQUE3QixFQUFrQ0MsT0FBTyxHQUFHQSxPQUE1QztBQUNIO0FBQ0o7O0FBQ0RrRixNQUFJLEdBaEU0QyxDQWtFaEQ7O0FBQ0EsTUFBTUUsSUFBSSxHQUFHN0IsUUFBUSxDQUFDRSxjQUFULENBQXdCLE1BQXhCLENBQWI7QUFDQSxNQUFNNEIsS0FBSyxHQUFHOUIsUUFBUSxDQUFDRSxjQUFULENBQXdCLE9BQXhCLENBQWQ7QUFDQSxNQUFNNkIsTUFBTSxHQUFHL0IsUUFBUSxDQUFDRSxjQUFULENBQXdCLFFBQXhCLENBQWY7QUFDQSxNQUFNOEIsS0FBSyxHQUFHaEMsUUFBUSxDQUFDRSxjQUFULENBQXdCLE9BQXhCLENBQWQ7QUFDQSxNQUFNK0IsTUFBTSxHQUFHakMsUUFBUSxDQUFDRSxjQUFULENBQXdCLFFBQXhCLENBQWY7QUFDQSxNQUFNZ0MsUUFBUSxHQUFHbEMsUUFBUSxDQUFDRSxjQUFULENBQXdCLFVBQXhCLENBQWpCO0FBQ0EsTUFBTWlDLGNBQWMsR0FBR25DLFFBQVEsQ0FBQ29DLHNCQUFULENBQWdDLEtBQWhDLENBQXZCO0FBRUFQLE1BQUksQ0FBQzVCLGdCQUFMLENBQXNCLE9BQXRCLEVBQStCLFlBQVc7QUFDdEMzRCxhQUFTLEdBQUcsU0FBWjtBQUNBNEYsWUFBUSxDQUFDRyxLQUFULENBQWVyRCxLQUFmLEdBQXVCLE1BQXZCO0FBQ0FzRCxTQUFLLENBQUNDLElBQU4sQ0FBV0osY0FBWCxFQUEyQkssT0FBM0IsQ0FBbUMsVUFBQ0MsTUFBRDtBQUFBLGFBQVlBLE1BQU0sQ0FBQ0osS0FBUCxDQUFhckQsS0FBYixHQUFxQixNQUFqQztBQUFBLEtBQW5DO0FBQ0gsR0FKRDtBQU1BOEMsT0FBSyxDQUFDN0IsZ0JBQU4sQ0FBdUIsT0FBdkIsRUFBZ0MsWUFBWTtBQUN4QzNELGFBQVMsR0FBRyxTQUFaO0FBQ0E0RixZQUFRLENBQUNHLEtBQVQsQ0FBZXJELEtBQWYsR0FBdUIsU0FBdkI7QUFDQXNELFNBQUssQ0FBQ0MsSUFBTixDQUFXSixjQUFYLEVBQTJCSyxPQUEzQixDQUFtQyxVQUFDQyxNQUFEO0FBQUEsYUFBWUEsTUFBTSxDQUFDSixLQUFQLENBQWFyRCxLQUFiLEdBQXFCLFNBQWpDO0FBQUEsS0FBbkM7QUFDSCxHQUpEO0FBTUErQyxRQUFNLENBQUM5QixnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxZQUFZO0FBQ3pDeEQsV0FBTyxHQUFHaUcsTUFBTSxDQUFDQyxNQUFQLENBQWMsRUFBZCxFQUFrQmxHLE9BQWxCLEVBQTJCO0FBQUVZLGFBQU8sRUFBRSxTQUFYO0FBQXNCQyxlQUFTLEVBQUUsU0FBakM7QUFBNENDLGNBQVEsRUFBRTtBQUF0RCxLQUEzQixDQUFWO0FBQ0gsR0FGRDtBQUlBeUUsT0FBSyxDQUFDL0IsZ0JBQU4sQ0FBdUIsT0FBdkIsRUFBZ0MsWUFBWTtBQUN4Q3hELFdBQU8sR0FBR2lHLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JsRyxPQUFsQixFQUEyQjtBQUFFWSxhQUFPLEVBQUUsU0FBWDtBQUFzQkMsZUFBUyxFQUFFLFNBQWpDO0FBQTRDQyxjQUFRLEVBQUU7QUFBdEQsS0FBM0IsQ0FBVjtBQUNILEdBRkQ7QUFJQTBFLFFBQU0sQ0FBQ2hDLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLFlBQVk7QUFDekN4RCxXQUFPLEdBQUdpRyxNQUFNLENBQUNDLE1BQVAsQ0FBYyxFQUFkLEVBQWtCbEcsT0FBbEIsRUFBMkI7QUFBRVksYUFBTyxFQUFFLFNBQVg7QUFBc0JDLGVBQVMsRUFBRSxTQUFqQztBQUE0Q0MsY0FBUSxFQUFFO0FBQXRELEtBQTNCLENBQVY7QUFDSCxHQUZELEVBL0ZnRCxDQW9HaEQ7O0FBQ0EsTUFBTXFGLElBQUksR0FBRzVDLFFBQVEsQ0FBQ1UsYUFBVCxDQUF1QixzQkFBdkIsQ0FBYjtBQUVBa0MsTUFBSSxDQUFDM0MsZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0IsWUFBVztBQUN0QyxRQUFJTyxRQUFRLENBQUNxQyxLQUFULEtBQW1CLFdBQXZCLEVBQW9DO0FBQ2hDckMsY0FBUSxDQUFDc0MsTUFBVDtBQUNBckMsa0JBQVksQ0FBQ3NDLEdBQWIsR0FBbUIsd0tBQW5CO0FBQ0g7O0FBQ0R0QyxnQkFBWSxDQUFDdUMsSUFBYjtBQUNBOUIsY0FBVSxDQUFDK0IsU0FBWDtBQUNBQyxjQUFVLENBQUNDLE9BQVgsQ0FBbUJDLE9BQW5CLEdBQTZCLE1BQTdCO0FBQ0gsR0FSRDtBQVVBLE1BQU1GLFVBQVUsR0FBR2xELFFBQVEsQ0FBQ1UsYUFBVCxDQUF1QixnQkFBdkIsQ0FBbkIsQ0FqSGdELENBbUhoRDs7QUFDQSxNQUFNMkMsU0FBUyxHQUFHckQsUUFBUSxDQUFDVSxhQUFULENBQXVCLGFBQXZCLENBQWxCO0FBQ0EyQyxXQUFTLENBQUNwRCxnQkFBVixDQUEyQixRQUEzQixFQUFxQyxZQUFZO0FBQzdDLFFBQU1xRCxJQUFJLEdBQUcsS0FBS0MsS0FBTCxDQUFXLENBQVgsQ0FBYjtBQUNBLFFBQU1SLEdBQUcsR0FBR1MsR0FBRyxDQUFDQyxlQUFKLENBQW9CSCxJQUFwQixDQUFaO0FBQ0E3QyxnQkFBWSxDQUFDc0MsR0FBYixHQUFtQkEsR0FBbkI7QUFDQXZDLFlBQVEsQ0FBQ3NDLE1BQVQ7QUFDQXJDLGdCQUFZLENBQUN1QyxJQUFiO0FBQ0E5QixjQUFVLENBQUMrQixTQUFYO0FBQ0FDLGNBQVUsQ0FBQ0MsT0FBWCxDQUFtQkMsT0FBbkIsR0FBNkIsTUFBN0I7QUFDSCxHQVJELEVBckhnRCxDQStIaEQ7O0FBQ0FGLFlBQVUsQ0FBQ2pELGdCQUFYLENBQTRCLE9BQTVCLEVBQXFDLFlBQVk7QUFDN0MsUUFBSU8sUUFBUSxDQUFDcUMsS0FBVCxLQUFtQixXQUF2QixFQUFvQztBQUNoQ3JDLGNBQVEsQ0FBQ3NDLE1BQVQ7QUFDSDs7QUFDRCxRQUFJLEtBQUtLLE9BQUwsQ0FBYUMsT0FBYixLQUF5QixPQUE3QixFQUFzQztBQUNsQzNDLGtCQUFZLENBQUN1QyxJQUFiO0FBQ0EsV0FBS0csT0FBTCxDQUFhQyxPQUFiLEdBQXVCLE1BQXZCO0FBRUgsS0FKRCxNQUlPLElBQUksS0FBS0QsT0FBTCxDQUFhQyxPQUFiLEtBQXlCLE1BQTdCLEVBQXFDO0FBQ3hDM0Msa0JBQVksQ0FBQ2lELEtBQWI7QUFDQSxXQUFLUCxPQUFMLENBQWFDLE9BQWIsR0FBdUIsT0FBdkI7QUFDSDtBQUNKLEdBWkQsRUFoSWdELENBOEloRDs7QUFDQSxNQUFNTyxLQUFLLEdBQUczRCxRQUFRLENBQUNFLGNBQVQsQ0FBd0Isa0JBQXhCLENBQWQ7QUFDQSxNQUFNMEQsZ0JBQWdCLEdBQUc1RCxRQUFRLENBQUNFLGNBQVQsQ0FBd0IscUJBQXhCLENBQXpCO0FBQ0EsTUFBTTJELFdBQVcsR0FBRzdELFFBQVEsQ0FBQ0UsY0FBVCxDQUF3QixPQUF4QixDQUFwQjs7QUFFQTBELGtCQUFnQixDQUFDbkMsT0FBakIsR0FBMkIsWUFBVztBQUNsQ2tDLFNBQUssQ0FBQ3RCLEtBQU4sQ0FBWXlCLE9BQVosR0FBdUIsT0FBdkI7QUFDSCxHQUZEOztBQUlBRCxhQUFXLENBQUNwQyxPQUFaLEdBQXNCLFlBQVc7QUFDN0JrQyxTQUFLLENBQUN0QixLQUFOLENBQVl5QixPQUFaLEdBQXNCLE1BQXRCO0FBQ0gsR0FGRDs7QUFJQXhELFFBQU0sQ0FBQ21CLE9BQVAsR0FBaUIsVUFBVXNDLENBQVYsRUFBYTtBQUMxQixRQUFJQSxDQUFDLENBQUNDLE1BQUYsS0FBYUwsS0FBakIsRUFBd0I7QUFDcEJBLFdBQUssQ0FBQ3RCLEtBQU4sQ0FBWXlCLE9BQVosR0FBc0IsTUFBdEI7QUFDSDtBQUNKLEdBSkQsQ0EzSmdELENBaUtoRDs7O0FBQ0EsTUFBTUcsY0FBYyxHQUFHakUsUUFBUSxDQUFDRSxjQUFULENBQXdCLGdCQUF4QixDQUF2Qjs7QUFDQStELGdCQUFjLENBQUNDLFFBQWYsR0FBMEIsVUFBU0gsQ0FBVCxFQUFZO0FBQ2xDQSxLQUFDLENBQUNJLGNBQUY7QUFDQSxRQUFNQyxNQUFNLEdBQUdwRSxRQUFRLENBQUNxRSxLQUFULENBQWVKLGNBQTlCO0FBQ0EsUUFBTUssUUFBUSxHQUFHLElBQUlDLFFBQUosQ0FBYUgsTUFBYixDQUFqQjtBQUNBLFFBQU1JLGFBQWEsR0FBR0YsUUFBUSxDQUFDRyxHQUFULENBQWEsZUFBYixDQUF0QjtBQUNBaEUsZ0JBQVksQ0FBQ3NDLEdBQWIsR0FBbUJ5QixhQUFuQjtBQUNBYixTQUFLLENBQUN0QixLQUFOLENBQVl5QixPQUFaLEdBQXNCLE1BQXRCO0FBQ0F0RCxZQUFRLENBQUNzQyxNQUFUO0FBQ0FyQyxnQkFBWSxDQUFDdUMsSUFBYjtBQUNBOUIsY0FBVSxDQUFDK0IsU0FBWDtBQUNBQyxjQUFVLENBQUNDLE9BQVgsQ0FBbUJDLE9BQW5CLEdBQTZCLE1BQTdCO0FBQ0gsR0FYRCxDQW5LZ0QsQ0FnTGhEOzs7QUFDQSxXQUFTaEQsV0FBVCxHQUF1QjtBQUNuQjdELFVBQU0sQ0FBQ0ksS0FBUCxHQUFlSixNQUFNLENBQUNJLEtBQXRCO0FBQ0FKLFVBQU0sQ0FBQ0ssTUFBUCxHQUFnQkwsTUFBTSxDQUFDSyxNQUF2QjtBQUNBTCxVQUFNLENBQUNJLEtBQVAsR0FBZTJELE1BQU0sQ0FBQ29FLFVBQXRCO0FBQ0FuSSxVQUFNLENBQUNLLE1BQVAsR0FBZ0IwRCxNQUFNLENBQUNxRSxXQUF2QjtBQUNBbkksT0FBRyxDQUFDb0ksU0FBSixDQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBb0JySSxNQUFNLENBQUNJLEtBQTNCLEVBQWtDSixNQUFNLENBQUNLLE1BQXpDO0FBQ0FKLE9BQUcsQ0FBQ3lDLFNBQUo7QUFDSDtBQUVKLENBMUxELEU7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTEEsSUFBTXJCLE1BQU0sR0FBR2hDLG1CQUFPLENBQUMsaUNBQUQsQ0FBdEI7O0FBQ0EsSUFBTUQsU0FBUyxHQUFHQyxtQkFBTyxDQUFDLHVDQUFELENBQXpCOztBQUNBLElBQU1DLEtBQUssR0FBR0QsbUJBQU8sQ0FBQywrQkFBRCxDQUFyQjs7QUFFQXFDLFdBQVcsR0FBRyxJQUFkOztJQUVNOEIsYTs7O0FBQ0YseUJBQVl4RCxNQUFaLEVBQW9CUixRQUFwQixFQUE4QjtBQUFBOztBQUMxQixTQUFLUSxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLUixRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLFNBQUtDLFlBQUwsR0FBb0IsS0FBS0QsUUFBTCxDQUFjRSxpQkFBbEM7QUFDQSxTQUFLQyxTQUFMLEdBQWlCLElBQUlDLFVBQUosQ0FBZSxLQUFLSCxZQUFwQixDQUFqQjtBQUNBLFNBQUtELFFBQUwsQ0FBY0ssT0FBZCxHQUF3QixJQUF4QjtBQUNBLFNBQUs0QixPQUFMLEdBQWUsRUFBZjs7QUFDQSxTQUFLLElBQUlmLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdnQixXQUFwQixFQUFpQ2hCLENBQUMsRUFBbEMsRUFBc0M7QUFDbEMsV0FBS2UsT0FBTCxDQUFhRSxJQUFiLENBQWtCTixNQUFNLENBQUNPLFlBQVAsQ0FBb0I1QixNQUFNLENBQUNJLEtBQTNCLEVBQWtDSixNQUFNLENBQUNLLE1BQXpDLEVBQWlEcUIsV0FBakQsQ0FBbEI7QUFDSDtBQUNKOzs7O2dDQUVXMUIsTSxFQUFRO0FBQUE7O0FBQ2hCLFdBQUt5QixPQUFMLENBQWF3RSxPQUFiLENBQXFCLFVBQUNsRSxNQUFEO0FBQUEsZUFBWUEsTUFBTSxDQUFDdUcsVUFBUCxDQUFrQixLQUFJLENBQUN0SSxNQUFMLENBQVlJLEtBQTlCLEVBQXFDLEtBQUksQ0FBQ0osTUFBTCxDQUFZSyxNQUFqRCxDQUFaO0FBQUEsT0FBckI7QUFDSDs7O2lDQUVZd0IsRyxFQUFLO0FBQ2QsV0FBS0osT0FBTCxDQUFhd0UsT0FBYixDQUFxQixVQUFDbEUsTUFBRDtBQUFBLGVBQVlBLE1BQU0sQ0FBQ3dHLFlBQVAsQ0FBb0IxRyxHQUFwQixFQUF5QixHQUF6QixDQUFaO0FBQUEsT0FBckI7QUFDSDs7O3lCQUVJOUIsUyxFQUFXRSxHLEVBQUs7QUFDakJBLFNBQUcsQ0FBQ0YsU0FBSixHQUFnQkEsU0FBaEI7QUFDQUUsU0FBRyxDQUFDRSxRQUFKLENBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixLQUFLSCxNQUFMLENBQVlJLEtBQS9CLEVBQXNDLEtBQUtKLE1BQUwsQ0FBWUssTUFBbEQ7QUFDQSxXQUFLYixRQUFMLENBQWNjLG9CQUFkLENBQW1DLEtBQUtYLFNBQXhDO0FBQ0EsVUFBTWtDLEdBQUcsR0FBR3ZDLEtBQUssQ0FBQ3dDLE1BQU4sQ0FBYSxLQUFLbkMsU0FBbEIsQ0FBWjtBQUNBLFdBQUs4QixPQUFMLENBQWF3RSxPQUFiLENBQXFCLFVBQUNsRSxNQUFEO0FBQUEsZUFBWUEsTUFBTSxDQUFDYixJQUFQLENBQVlqQixHQUFaLENBQVo7QUFBQSxPQUFyQjtBQUNBLFdBQUt1SSxXQUFMO0FBQ0EsV0FBS0QsWUFBTCxDQUFrQjFHLEdBQWxCO0FBQ0g7Ozs7OztBQUdMVixNQUFNLENBQUNDLE9BQVAsR0FBaUJvQyxhQUFqQixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RDQSxJQUFNbkMsTUFBTSxHQUFHaEMsbUJBQU8sQ0FBQyxpQ0FBRCxDQUF0Qjs7SUFFTW9KLGE7Ozs7O0FBQ0YseUJBQVloSSxDQUFaLEVBQWV5QixDQUFmLEVBQWtCTyxLQUFsQixFQUF5QmpCLE1BQXpCLEVBQWlDdkIsR0FBakMsRUFBc0M7QUFBQTs7QUFBQTs7QUFDbEMsdUZBQU1RLENBQU4sRUFBU3lCLENBQVQsRUFBWU8sS0FBWixFQUFtQmpCLE1BQW5CO0FBQ0EsVUFBS3ZCLEdBQUwsR0FBV0EsR0FBWDtBQUNBLFVBQUtzQixhQUFMLEdBQXFCLE1BQUtDLE1BQTFCO0FBSGtDO0FBSXJDOzs7OzJCQUVNO0FBQ0gsV0FBS3ZCLEdBQUwsQ0FBU3lDLFNBQVQ7QUFDQSxXQUFLekMsR0FBTCxDQUFTMEMsR0FBVCxDQUFhLEtBQUtsQyxDQUFsQixFQUFxQixLQUFLeUIsQ0FBMUIsRUFBNkIsS0FBS1gsYUFBbEMsRUFBaUQsQ0FBakQsRUFBb0QsSUFBSWEsSUFBSSxDQUFDQyxFQUE3RDtBQUNBLFdBQUtwQyxHQUFMLENBQVN5SSxXQUFULEdBQXVCLHlCQUF5QixLQUFLbkgsYUFBTCxHQUFtQixHQUE1QyxHQUFrRCxHQUF6RTtBQUNBLFdBQUt0QixHQUFMLENBQVMwSSxTQUFULEdBQXFCLEtBQUtwSCxhQUFMLEdBQW9CLEdBQXpDO0FBQ0EsV0FBS3RCLEdBQUwsQ0FBUzJJLE1BQVQ7QUFDQSxXQUFLckgsYUFBTCxJQUFzQixHQUF0Qjs7QUFDQSxVQUFJLEtBQUtBLGFBQUwsR0FBcUIsSUFBekIsRUFBK0I7QUFDM0I4RCw2QkFBcUIsQ0FBQyxLQUFLbkUsSUFBTCxDQUFVMkgsSUFBVixDQUFlLElBQWYsQ0FBRCxDQUFyQjtBQUNIO0FBQ0o7Ozs7RUFqQnVCeEgsTTs7QUFvQjVCRixNQUFNLENBQUNDLE9BQVAsR0FBaUJxSCxhQUFqQixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RCQSxJQUFNakcsS0FBSyxHQUFHbkQsbUJBQU8sQ0FBQywrQkFBRCxDQUFyQjs7SUFFTUQsUzs7Ozs7QUFDRixxQkFBWXFCLENBQVosRUFBZXlCLENBQWYsRUFBa0JPLEtBQWxCLEVBQXlCckMsS0FBekIsRUFBZ0NDLE1BQWhDLEVBQXdDO0FBQUE7O0FBQUE7O0FBQ3BDLG1GQUFNSSxDQUFOLEVBQVN5QixDQUFULEVBQVlPLEtBQVo7QUFDQSxVQUFLckMsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsVUFBS0MsTUFBTCxHQUFjQSxNQUFkO0FBSG9DO0FBSXZDOzs7O3lCQUVJSixHLEVBQUs7QUFDTkEsU0FBRyxDQUFDeUMsU0FBSjtBQUNBekMsU0FBRyxDQUFDZ0IsSUFBSixDQUFTLEtBQUtSLENBQWQsRUFBaUIsS0FBS3lCLENBQXRCLEVBQXlCLEtBQUs5QixLQUE5QixFQUFxQyxLQUFLQyxNQUExQztBQUNBSixTQUFHLENBQUNGLFNBQUosR0FBZ0IsS0FBSzBDLEtBQXJCO0FBQ0F4QyxTQUFHLENBQUMyQyxJQUFKO0FBQ0g7Ozs7RUFabUJKLEs7O0FBZXhCckIsTUFBTSxDQUFDQyxPQUFQLEdBQWlCaEMsU0FBakIsQzs7Ozs7Ozs7Ozs7OztJQ2pCTW9ELEssR0FDRixlQUFZL0IsQ0FBWixFQUFleUIsQ0FBZixFQUFrQk8sS0FBbEIsRUFBeUI7QUFBQTs7QUFDckIsT0FBS2hDLENBQUwsR0FBU0EsQ0FBVDtBQUNBLE9BQUt5QixDQUFMLEdBQVNBLENBQVQ7QUFDQSxPQUFLTyxLQUFMLEdBQWFBLEtBQWI7QUFDSCxDOztBQUdMdEIsTUFBTSxDQUFDQyxPQUFQLEdBQWlCb0IsS0FBakIsQzs7Ozs7Ozs7Ozs7QUNSQSxJQUFNc0csVUFBVSxHQUFHLGtCQUFuQjtBQUVBLElBQU14SixLQUFLLEdBQUc7QUFDVndDLFFBRFUsa0JBQ0hpSCxHQURHLEVBQ0U7QUFDUixRQUFJQyxNQUFNLEdBQUcsQ0FBYjs7QUFDQSxTQUFLLElBQUl0SSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHcUksR0FBRyxDQUFDNUQsTUFBeEIsRUFBZ0N6RSxDQUFDLEVBQWpDLEVBQXFDO0FBQ2pDc0ksWUFBTSxJQUFJRCxHQUFHLENBQUNySSxDQUFELENBQUgsR0FBU3FJLEdBQUcsQ0FBQ3JJLENBQUQsQ0FBdEI7QUFDSDs7QUFDRG1CLE9BQUcsR0FBR08sSUFBSSxDQUFDNkcsSUFBTCxDQUFVRCxNQUFNLEdBQUdELEdBQUcsQ0FBQzVELE1BQXZCLENBQU47QUFDQSxXQUFPdEQsR0FBUDtBQUNILEdBUlM7QUFVVjtBQUNBeUIsYUFYVSx5QkFXSTtBQUNWLFFBQUliLEtBQUssR0FBRyxHQUFaOztBQUNBLFNBQUssSUFBSS9CLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsQ0FBcEIsRUFBdUJBLENBQUMsRUFBeEIsRUFBNEI7QUFDeEIrQixXQUFLLElBQUlxRyxVQUFVLENBQUMxRyxJQUFJLENBQUM4RyxLQUFMLENBQVk5RyxJQUFJLENBQUNZLE1BQUwsS0FBZ0IsRUFBNUIsQ0FBRCxDQUFuQjtBQUNIOztBQUNELFdBQU9QLEtBQVA7QUFDSDtBQWpCUyxDQUFkO0FBb0JBdEIsTUFBTSxDQUFDQyxPQUFQLEdBQWlCOUIsS0FBakIsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0QkEsSUFBTUYsU0FBUyxHQUFHQyxtQkFBTyxDQUFDLHVDQUFELENBQXpCOztBQUNBLElBQU1nQyxNQUFNLEdBQUdoQyxtQkFBTyxDQUFDLGlDQUFELENBQXRCOztBQUNBLElBQU1vSixhQUFhLEdBQUdwSixtQkFBTyxDQUFDLGlEQUFELENBQTdCOztBQUNBLElBQU1DLEtBQUssR0FBR0QsbUJBQU8sQ0FBQywrQkFBRCxDQUFyQjs7SUFFTWtFLFU7OztBQUNGLHNCQUFZL0QsUUFBWixFQUFzQjtBQUFBOztBQUNsQixTQUFLQSxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLFNBQUtDLFlBQUwsR0FBb0IsS0FBS0QsUUFBTCxDQUFjRSxpQkFBbEM7QUFDQSxTQUFLQyxTQUFMLEdBQWlCLElBQUlDLFVBQUosQ0FBZSxLQUFLSCxZQUFwQixDQUFqQjtBQUNBLFNBQUtELFFBQUwsQ0FBY0ssT0FBZCxHQUF3QixJQUF4QjtBQUNBLFNBQUtDLElBQUwsR0FBWSxFQUFaO0FBQ0g7Ozs7Z0NBRVc7QUFDUixXQUFLQSxJQUFMLEdBQVksRUFBWjtBQUNIOzs7eUJBRUlDLFMsRUFBV0MsTSxFQUFRQyxHLEVBQUtDLE8sRUFBUztBQUNsQ0QsU0FBRyxDQUFDRixTQUFKLEdBQWdCQSxTQUFoQjtBQUNBRSxTQUFHLENBQUNFLFFBQUosQ0FBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CSCxNQUFNLENBQUNJLEtBQTFCLEVBQWlDSixNQUFNLENBQUNLLE1BQXhDO0FBQ0EsV0FBS2IsUUFBTCxDQUFjYyxvQkFBZCxDQUFtQyxLQUFLWCxTQUF4QztBQUNBLFVBQU1rQyxHQUFHLEdBQUd2QyxLQUFLLENBQUN3QyxNQUFOLENBQWEsS0FBS25DLFNBQWxCLENBQVo7QUFFQSxVQUFNb0MsTUFBTSxHQUFHLElBQUlWLE1BQUosQ0FBVyxHQUFYLEVBQWdCLEdBQWhCLEVBQXFCLE9BQXJCLEVBQThCUSxHQUE5QixDQUFmO0FBQ0FFLFlBQU0sQ0FBQ2IsSUFBUCxDQUFZakIsR0FBWixFQVBrQyxDQVNsQzs7QUFDQSxVQUFJNEIsR0FBRyxHQUFJLEtBQUsvQixJQUFMLEdBQVksR0FBdkIsRUFBNkI7QUFDekIsWUFBSXFKLE9BQU8sR0FBRyxJQUFJVixhQUFKLENBQWtCMUcsTUFBTSxDQUFDdEIsQ0FBekIsRUFBNEJzQixNQUFNLENBQUNHLENBQW5DLEVBQXNDLE9BQXRDLEVBQStDTCxHQUEvQyxFQUFvRDVCLEdBQXBELENBQWQ7QUFDQWtKLGVBQU8sQ0FBQ2pJLElBQVI7QUFDQSxhQUFLcEIsSUFBTCxHQUFZK0IsR0FBWjtBQUNILE9BZGlDLENBZ0JsQzs7O0FBQ0E1QixTQUFHLENBQUMrQixJQUFKO0FBQ0EvQixTQUFHLENBQUNnQyxTQUFKLENBQWNGLE1BQU0sQ0FBQ3RCLENBQXJCLEVBQXdCc0IsTUFBTSxDQUFDRyxDQUEvQjtBQUVBLFVBQUlDLElBQUksR0FBRyxHQUFYOztBQUNBLFdBQUssSUFBSXpCLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsR0FBcEIsRUFBeUJBLENBQUMsSUFBSyxNQUFJeUIsSUFBbkMsRUFBMEM7QUFDdEMsWUFBTTVCLFFBQVEsR0FBSSxJQUFJNkIsSUFBSSxDQUFDQyxFQUFULEdBQWNSLEdBQWYsR0FBc0JNLElBQXZDO0FBQ0EsWUFBTTNCLFNBQVMsR0FBSVIsTUFBTSxDQUFDSyxNQUFQLElBQWlCLEtBQUtWLFNBQUwsQ0FBZWUsQ0FBZixJQUFvQixHQUFyQyxDQUFuQjtBQUNBVCxXQUFHLENBQUNxQyxNQUFKLENBQVcsSUFBSUYsSUFBSSxDQUFDQyxFQUFULEdBQWMsR0FBekI7QUFDQSxZQUFNMUIsR0FBRyxHQUFHVixHQUFHLENBQUNXLG9CQUFKLENBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCWixNQUFNLENBQUNLLE1BQXRDLEVBQThDLENBQTlDLENBQVo7QUFDQU0sV0FBRyxDQUFDRSxZQUFKLENBQWlCLENBQWpCLEVBQW9CWCxPQUFPLENBQUNZLE9BQVIsR0FBa0JaLE9BQU8sQ0FBQ1ksT0FBMUIsR0FBb0MsS0FBeEQ7QUFDQUgsV0FBRyxDQUFDRSxZQUFKLENBQWlCLEVBQWpCLEVBQXFCWCxPQUFPLENBQUNhLFNBQVIsR0FBb0JiLE9BQU8sQ0FBQ2EsU0FBNUIsR0FBd0MsUUFBN0Q7QUFDQUosV0FBRyxDQUFDRSxZQUFKLENBQWlCLENBQWpCLEVBQW9CWCxPQUFPLENBQUNjLFFBQVIsR0FBbUJkLE9BQU8sQ0FBQ2MsUUFBM0IsR0FBc0MsT0FBMUQ7QUFDQSxZQUFNQyxJQUFJLEdBQUcsSUFBSTdCLFNBQUosQ0FBY3lDLEdBQWQsRUFBbUIsQ0FBQ3RCLFFBQUQsR0FBWSxDQUEvQixFQUFrQ0ksR0FBbEMsRUFBdUNILFNBQVMsR0FBRyxDQUFuRCxFQUFzREQsUUFBdEQsQ0FBYjtBQUNBVSxZQUFJLENBQUNDLElBQUwsQ0FBVWpCLEdBQVY7QUFDSDs7QUFDREEsU0FBRyxDQUFDc0MsT0FBSjtBQUNIOzs7Ozs7QUFHTHBCLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQm1DLFVBQWpCLEMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJjb25zdCBSZWN0YW5nbGUgPSByZXF1aXJlKCcuL3JlY3RhbmdsZScpO1xuY29uc3QgVXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbmNsYXNzIEJhcnMge1xuICAgIGNvbnN0cnVjdG9yKGFuYWx5emVyKSB7XG4gICAgICAgIHRoaXMuYW5hbHl6ZXIgPSBhbmFseXplcjtcbiAgICAgICAgdGhpcy5idWZmZXJMZW5ndGggPSB0aGlzLmFuYWx5emVyLmZyZXF1ZW5jeUJpbkNvdW50O1xuICAgICAgICB0aGlzLmRhdGFBcnJheSA9IG5ldyBVaW50OEFycmF5KHRoaXMuYnVmZmVyTGVuZ3RoKTtcbiAgICAgICAgdGhpcy5hbmFseXplci5mZnRTaXplID0gMjA0ODtcbiAgICAgICAgdGhpcy5wZWFrID0gNTA7XG4gICAgfVxuXG4gICAgZHJhdyhmaWxsU3R5bGUsIGNhbnZhcywgY3R4LCBvcHRpb25zKSB7IFxuICAgICAgICBjdHguZmlsbFN0eWxlID0gZmlsbFN0eWxlO1xuICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5hbmFseXplci5nZXRCeXRlRnJlcXVlbmN5RGF0YSh0aGlzLmRhdGFBcnJheSk7XG4gICAgICAgIFxuICAgICAgICBsZXQgYmFyV2lkdGggPSAoY2FudmFzLndpZHRoIC8gdGhpcy5idWZmZXJMZW5ndGgpICogMi41O1xuICAgICAgICBsZXQgYmFySGVpZ2h0O1xuICAgICAgICBsZXQgeCA9IDA7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmJ1ZmZlckxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBiYXJIZWlnaHQgPSBjYW52YXMuaGVpZ2h0ICogKHRoaXMuZGF0YUFycmF5W2ldLzI1NSk7XG4gICAgICAgICAgICAvLyBjb25zdCByID0gMjU1ICogKHRoaXMuZGF0YUFycmF5W2ldIC8gMjU1KTtcbiAgICAgICAgICAgIC8vIGNvbnN0IGcgPSAyNTUgKiAoaSAvIHRoaXMuYnVmZmVyTGVuZ3RoKTtcbiAgICAgICAgICAgIC8vIGNvbnN0IGIgPSAyNTUgKiAoaSAvIHRoaXMuYnVmZmVyTGVuZ3RoKTtcblxuICAgICAgICAgICAgY29uc3QgZ3JkID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KDAsIDAsIGNhbnZhcy53aWR0aCwgMClcbiAgICAgICAgICAgIGdyZC5hZGRDb2xvclN0b3AoMCwgb3B0aW9ucy5wcmltYXJ5ID8gb3B0aW9ucy5wcmltYXJ5IDogXCJibHVlXCIpO1xuICAgICAgICAgICAgZ3JkLmFkZENvbG9yU3RvcCguOCwgb3B0aW9ucy5zZWNvbmRhcnkgPyBvcHRpb25zLnNlY29uZGFyeSA6IFwiZ3JlZW5cIik7XG4gICAgICAgICAgICBncmQuYWRkQ29sb3JTdG9wKDEsIG9wdGlvbnMudGVydGlhcnkgPyBvcHRpb25zLnRlcnRpYXJ5IDogXCJ3aGl0ZVwiKTtcblxuICAgICAgICAgICAgLy8gbGV0IHJlY3QgPSBuZXcgUmVjdGFuZ2xlKHgsIGNhbnZhcy5oZWlnaHQgLSBiYXJIZWlnaHQsIFwicmdiKFwiICsgciArIFwiLFwiICsgZyArIFwiLFwiICsgYiArIFwiKVwiLCBiYXJXaWR0aCwgYmFySGVpZ2h0KVxuICAgICAgICAgICAgbGV0IHJlY3QgPSBuZXcgUmVjdGFuZ2xlKHgsIChjYW52YXMuaGVpZ2h0IC0gYmFySGVpZ2h0KSsxMDAsIGdyZCwgYmFyV2lkdGgsIGJhckhlaWdodClcbiAgICAgICAgICAgIHJlY3QuZHJhdyhjdHgpO1xuICAgICAgICAgICAgeCArPSBiYXJXaWR0aDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCYXJzOyIsImNvbnN0IENpcmNsZSA9IHJlcXVpcmUoJy4vY2lyY2xlJyk7XG5jb25zdCBSZWN0YW5nbGUgPSByZXF1aXJlKCcuL3JlY3RhbmdsZScpO1xuY29uc3QgVXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbmNsYXNzIEJlYXRpbmdDaXJjbGUge1xuICAgIGNvbnN0cnVjdG9yKGFuYWx5emVyKSB7XG4gICAgICAgIHRoaXMuYW5hbHl6ZXIgPSBhbmFseXplcjtcbiAgICAgICAgdGhpcy5idWZmZXJMZW5ndGggPSB0aGlzLmFuYWx5emVyLmZyZXF1ZW5jeUJpbkNvdW50O1xuICAgICAgICB0aGlzLmRhdGFBcnJheSA9IG5ldyBVaW50OEFycmF5KHRoaXMuYnVmZmVyTGVuZ3RoKTtcbiAgICAgICAgdGhpcy5hbmFseXplci5mZnRTaXplID0gMjA0ODtcbiAgICAgICAgdGhpcy5wZWFrID0gNTA7XG4gICAgICAgIHRoaXMuY3VycmVudFJhZGl1cyA9IHRoaXMucmFkaXVzO1xuXG4gICAgICAgIHRoaXMuY2lyY2xlcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE5VTV9DSVJDTEVTOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuY2lyY2xlcy5wdXNoKENpcmNsZS5yYW5kb21DaXJjbGUoY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0LCBOVU1fQ0lSQ0xFUykpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhdyhmaWxsU3R5bGUsIGNhbnZhcywgY3R4LCBvcHRpb25zKSB7XG5cbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGZpbGxTdHlsZTtcbiAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgICAgIHRoaXMuYW5hbHl6ZXIuZ2V0Qnl0ZUZyZXF1ZW5jeURhdGEodGhpcy5kYXRhQXJyYXkpO1xuICAgICAgICBjb25zdCBybXMgPSBVdGlscy5nZXRSTVModGhpcy5kYXRhQXJyYXkpO1xuXG4gICAgICAgIGNvbnN0IGNpcmNsZSA9IG5ldyBDaXJjbGUoMzAwLCAzMDAsIFwid2hpdGVcIiwgcm1zKTtcbiAgICAgICAgY2lyY2xlLmRyYXcoY3R4KTtcblxuICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICBjdHgudHJhbnNsYXRlKGNpcmNsZS54LCBjaXJjbGUueSk7XG5cbiAgICAgICAgbGV0IGJhcnMgPSAxODA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzYwOyBpICs9ICgzNjAgLyBiYXJzKSkge1xuICAgICAgICAgICAgY29uc3QgYmFyV2lkdGggPSAoMiAqIE1hdGguUEkgKiBybXMpIC8gYmFycztcbiAgICAgICAgICAgIGNvbnN0IGJhckhlaWdodCA9IChjYW52YXMuaGVpZ2h0ICogKHRoaXMuZGF0YUFycmF5W2ldIC8gMjU1KSkgKiAuMTtcbiAgICAgICAgICAgIGN0eC5yb3RhdGUoMiAqIE1hdGguUEkgLyAxODApO1xuICAgICAgICAgICAgY29uc3QgZ3JkID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KDAsIDAsIDI1MCwgMClcbiAgICAgICAgICAgIGdyZC5hZGRDb2xvclN0b3AoMCwgb3B0aW9ucy5wcmltYXJ5ID8gb3B0aW9ucy5wcmltYXJ5IDogXCJyZWRcIik7XG4gICAgICAgICAgICBncmQuYWRkQ29sb3JTdG9wKC43LCBvcHRpb25zLnNlY29uZGFyeSA/IG9wdGlvbnMuc2Vjb25kYXJ5IDogXCJvcmFuZ2VcIik7XG4gICAgICAgICAgICBncmQuYWRkQ29sb3JTdG9wKDEsIG9wdGlvbnMudGVydGlhcnkgPyBvcHRpb25zLnRlcnRpYXJ5IDogXCJ3aGl0ZVwiKTtcbiAgICAgICAgICAgIGNvbnN0IHJlY3QgPSBuZXcgUmVjdGFuZ2xlKHJtcywgLWJhcldpZHRoIC8gMiwgZ3JkLCBiYXJIZWlnaHQsIGJhcldpZHRoKVxuICAgICAgICAgICAgcmVjdC5kcmF3KGN0eCk7XG4gICAgICAgIH1cbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQmVhdGluZ0NpcmNsZTtcblxuIiwiY29uc3QgU2hhcGUgPSByZXF1aXJlKCcuL3NoYXBlJyk7XG5jb25zdCBVdGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxuY2xhc3MgQ2lyY2xlIGV4dGVuZHMgU2hhcGUge1xuICAgIGNvbnN0cnVjdG9yKHgsIHksIGNvbG9yLCByYWRpdXMpIHtcbiAgICAgICAgc3VwZXIoeCwgeSwgY29sb3IpO1xuICAgICAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cztcbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5hcmModGhpcy54LCB0aGlzLnksIHRoaXMucmFkaXVzLCAwLCAyICogTWF0aC5QSSk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yOyBcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcmFuZG9tQ2lyY2xlKG1heFgsIG1heFksIG51bUNpcmNsZXMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDaXJjbGUobWF4WCAqIE1hdGgucmFuZG9tKCksIFxuICAgICAgICBtYXhZICogTWF0aC5yYW5kb20oKSwgXG4gICAgICAgIFV0aWxzLnJhbmRvbUNvbG9yKCksIDFcbiAgICAgICAgKVxuICAgIH1cblxuICAgIC8vIHN0YXRpYyByYWRpdXMobWF4WCwgbWF4WSwgbnVtQ2lyY2xlcykge1xuICAgIC8vICAgICAvLyBsZXQgdGFyZ2V0Q2lyY2xlQXJlYSA9IChtYXhYICogbWF4WSkgLyBudW1DaXJjbGVzO1xuICAgIC8vICAgICAvLyBsZXQgdGFyZ2V0UmFkaXVzID0gTWF0aC5zcXJ0KHRhcmdldENpcmNsZUFyZWEgLyBNYXRoLlBJKTtcbiAgICAvLyAgICAgLy8gcmV0dXJuIDIgKiB0YXJnZXRSYWRpdXM7XG4gICAgLy8gICAgIHJldHVybiAxO1xuICAgIC8vIH1cblxuICAgIG1vdmVSYW5kb20obWF4WCwgbWF4WSkge1xuICAgICAgICBsZXQgZHggPSBNYXRoLnJhbmRvbSgpO1xuICAgICAgICBsZXQgZHkgPSBNYXRoLnJhbmRvbSgpO1xuICAgICAgICB0aGlzLnggPSBNYXRoLmFicygodGhpcy54ICsgKGR4ICogdGhpcy5yYWRpdXMgKiAwLjEpKSAlIG1heFgpO1xuICAgICAgICB0aGlzLnkgPSBNYXRoLmFicygodGhpcy55ICsgKGR5ICogdGhpcy5yYWRpdXMgKiAwLjEpKSAlIG1heFkpO1xuICAgIH1cblxuICAgIHVwZGF0ZVJhZGl1cyhuLCBmYWN0b3IpIHtcbiAgICAgICAgdGhpcy5yYWRpdXMgPSBuKmZhY3RvcjtcbiAgICB9XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDaXJjbGU7ICIsImNvbnN0IFZpc3VhbGl6ZXIgPSByZXF1aXJlKCcuL3Zpc3VhbGl6ZXInKTtcbmNvbnN0IE1vdmluZ0NpcmNsZXMgPSByZXF1aXJlKCcuL21vdmluZ19jaXJjbGVzJyk7XG5jb25zdCBCZWF0aW5nQ2lyY2xlID0gcmVxdWlyZSgnLi9iZWF0aW5nX2NpcmNsZScpO1xuY29uc3QgQmFycyA9IHJlcXVpcmUoJy4vYmFycycpO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzXCIpO1xuICAgIGxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGNsZWFyQ2FudmFzKCk7XG5cbiAgICAvLyBjcmVhdGUgYXVkaW8gY29udGV4dFxuICAgIGNvbnN0IEF1ZGlvQ29udGV4dCA9IHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dDtcbiAgICBjb25zdCBhdWRpb0N0eCA9IG5ldyBBdWRpb0NvbnRleHQoKTtcblxuICAgIGNvbnN0IGF1ZGlvRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhdWRpbycpO1xuICAgIGNvbnN0IHRyYWNrID0gYXVkaW9DdHguY3JlYXRlTWVkaWFFbGVtZW50U291cmNlKGF1ZGlvRWxlbWVudCk7XG4gICAgY29uc3QgZ2Fpbk5vZGUgPSBhdWRpb0N0eC5jcmVhdGVHYWluKCk7XG4gICAgY29uc3QgYW5hbHl6ZXIgPSBhdWRpb0N0eC5jcmVhdGVBbmFseXNlcigpO1xuICAgIHRyYWNrLmNvbm5lY3QoZ2Fpbk5vZGUpO1xuICAgIHRyYWNrLmNvbm5lY3QoYW5hbHl6ZXIpO1xuICAgIGdhaW5Ob2RlLmNvbm5lY3QoYXVkaW9DdHguZGVzdGluYXRpb24pO1xuXG4gICAgLy8gaW5pdGlhbGl6ZSB2aXN1YWxpemF0aW9ucyBcbiAgICBsZXQgdmlzdWFsaXplciA9IG5ldyBWaXN1YWxpemVyKGFuYWx5emVyKTtcbiAgICBsZXQgbW92aW5nQ2lyY2xlcyA9IG5ldyBNb3ZpbmdDaXJjbGVzKGNhbnZhcywgYW5hbHl6ZXIpO1xuICAgIGxldCBiZWF0aW5nQ2lyY2xlID0gbmV3IEJlYXRpbmdDaXJjbGUoYW5hbHl6ZXIpO1xuICAgIGxldCBiYXJzID0gbmV3IEJhcnMoYW5hbHl6ZXIpO1xuXG4gICAgLy8gZGV0ZWN0IHdoaWNoIHZpc3VhbGl6YXRpb24gaXMgY2hlY2tlZCBcbiAgICBsZXQgY2hlY2tlZDtcbiAgICBjb25zdCByYWRpbyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKFwidmlzdWFsaXphdGlvblwiKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJhZGlvLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChyYWRpb1tpXS5jaGVja2VkKSB7XG4gICAgICAgICAgICBjaGVja2VkID0gcmFkaW9baV0udmFsdWUgXG4gICAgICAgIH1cbiAgICAgICAgcmFkaW9baV0ub25jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChyYWRpb1tpXS52YWx1ZSA9PT0gJ2RlZmF1bHQnKSB7XG4gICAgICAgICAgICAgICAgY2hlY2tlZCA9ICdkZWZhdWx0JztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmFkaW9baV0udmFsdWUgPT09ICdkcnVua2VuJykge1xuICAgICAgICAgICAgICAgIGNoZWNrZWQgPSAnZHJ1bmtlbic7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJhZGlvW2ldLnZhbHVlID09PSAnYmVhdGluZycpIHtcbiAgICAgICAgICAgICAgICBjaGVja2VkID0gJ2JlYXRpbmcnO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyYWRpb1tpXS52YWx1ZSA9PT0gJ2JhcnMnKSB7XG4gICAgICAgICAgICAgICAgY2hlY2tlZCA9ICdiYXJzJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvLyBkZWZhdWx0IGZpbGwgc3R5bGUgXG4gICAgbGV0IGZpbGxTdHlsZSA9IFwiIzI3MkIzNFwiO1xuICAgIGxldCBvcHRpb25zID0ge307XG5cbiAgICAvLyByZXF1ZXN0IGFuaW1hdGlvbiBmcmFtZSBcbiAgICBmdW5jdGlvbiBsb29wKCkge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcClcbiAgICAgICAgaWYgKGNoZWNrZWQgPT09ICdkZWZhdWx0Jykge1xuICAgICAgICAgICAgY2xlYXJDYW52YXMoKTtcbiAgICAgICAgICAgIHZpc3VhbGl6ZXIuZHJhdyhmaWxsU3R5bGUsIGNhbnZhcywgY3R4LCBvcHRpb25zID0gb3B0aW9ucylcbiAgICAgICAgfSBlbHNlIGlmIChjaGVja2VkID09PSAnZHJ1bmtlbicpIHtcbiAgICAgICAgICAgIGNsZWFyQ2FudmFzKCk7XG4gICAgICAgICAgICBtb3ZpbmdDaXJjbGVzLmRyYXcoZmlsbFN0eWxlLCBjdHgpXG4gICAgICAgIH0gZWxzZSBpZiAoY2hlY2tlZCA9PT0gJ2JlYXRpbmcnKSB7XG4gICAgICAgICAgICBjbGVhckNhbnZhcygpO1xuICAgICAgICAgICAgYmVhdGluZ0NpcmNsZS5kcmF3KGZpbGxTdHlsZSwgY2FudmFzLCBjdHgsIG9wdGlvbnMgPSBvcHRpb25zKVxuICAgICAgICB9IGVsc2UgaWYgKGNoZWNrZWQgPT09ICdiYXJzJykge1xuICAgICAgICAgICAgY2xlYXJDYW52YXMoKTtcbiAgICAgICAgICAgIGJhcnMuZHJhdyhmaWxsU3R5bGUsIGNhbnZhcywgY3R4LCBvcHRpb25zID0gb3B0aW9ucylcbiAgICAgICAgfVxuICAgIH1cbiAgICBsb29wKCk7XG5cbiAgICAvLyB2aXN1YWwgc2V0dGluZ3MgXG4gICAgY29uc3QgZGFyayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGFya1wiKVxuICAgIGNvbnN0IGxpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsaWdodFwiKVxuICAgIGNvbnN0IGRlc2VydCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVzZXJ0XCIpXG4gICAgY29uc3Qgc3BhY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNwYWNlXCIpXG4gICAgY29uc3QgdHVuZHJhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0dW5kcmFcIilcbiAgICBjb25zdCBjb250cm9scyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udHJvbHNcIik7XG4gICAgY29uc3QgY29udHJvbEJ1dHRvbnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZmFzXCIpO1xuXG4gICAgZGFyay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGZpbGxTdHlsZSA9IFwiIzI3MkIzNFwiO1xuICAgICAgICBjb250cm9scy5zdHlsZS5jb2xvciA9IFwiI2VlZVwiO1xuICAgICAgICBBcnJheS5mcm9tKGNvbnRyb2xCdXR0b25zKS5mb3JFYWNoKChidXR0b24pID0+IGJ1dHRvbi5zdHlsZS5jb2xvciA9IFwiI2VlZVwiKTtcbiAgICB9KTtcblxuICAgIGxpZ2h0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZpbGxTdHlsZSA9IFwiI2ZmZTBiZFwiO1xuICAgICAgICBjb250cm9scy5zdHlsZS5jb2xvciA9IFwiIzI3MkIzNFwiO1xuICAgICAgICBBcnJheS5mcm9tKGNvbnRyb2xCdXR0b25zKS5mb3JFYWNoKChidXR0b24pID0+IGJ1dHRvbi5zdHlsZS5jb2xvciA9IFwiIzI3MkIzNFwiKTtcbiAgICB9KTtcblxuICAgIGRlc2VydC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucywgeyBwcmltYXJ5OiBcIiNmZjAwMDBcIiwgc2Vjb25kYXJ5OiBcIiNmZjhkMDBcIiwgdGVydGlhcnk6IFwiI2ZmZGMwN1wiIH0pO1xuICAgIH0pO1xuXG4gICAgc3BhY2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMsIHsgcHJpbWFyeTogXCIjMTQxNzE3XCIsIHNlY29uZGFyeTogXCIjNGE1NDU3XCIsIHRlcnRpYXJ5OiBcIiNlMWU1ZTZcIiB9KTtcbiAgICB9KTtcblxuICAgIHR1bmRyYS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucywgeyBwcmltYXJ5OiBcIiMwYzA4NGNcIiwgc2Vjb25kYXJ5OiBcIiMwOTYzODZcIiwgdGVydGlhcnk6IFwiI0ZGRkZGRlwiIH0pO1xuICAgIH0pOyAgICBcblxuXG4gICAgLy8gYXVkaW8gc2V0dGluZ3MgXG4gICAgY29uc3QgZGVtbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb250cm9scy1hdWRpby1kZW1vJyk7XG5cbiAgICBkZW1vLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChhdWRpb0N0eC5zdGF0ZSA9PT0gJ3N1c3BlbmRlZCcpIHtcbiAgICAgICAgICAgIGF1ZGlvQ3R4LnJlc3VtZSgpO1xuICAgICAgICAgICAgYXVkaW9FbGVtZW50LnNyYyA9ICdodHRwczovL2F1ZGlvLXNzbC5pdHVuZXMuYXBwbGUuY29tL2FwcGxlLWFzc2V0cy11cy1zdGQtMDAwMDAxL0F1ZGlvUHJldmlldzEyOC92NC80Ny85My8zOS80NzkzMzk2ZC0yZmM4LTQxMTMtZGY4Ny00YjM2MWMyZDQwY2QvbXphZl8yMjQyODA0ODYwMDk2ODYwNjY2LnBsdXMuYWFjLnAubTRhJztcbiAgICAgICAgfVxuICAgICAgICBhdWRpb0VsZW1lbnQucGxheSgpO1xuICAgICAgICB2aXN1YWxpemVyLnJlc2V0UGVhaygpO1xuICAgICAgICBwbGF5QnV0dG9uLmRhdGFzZXQucGxheWluZyA9ICd0cnVlJztcbiAgICB9KTtcbiAgICBcbiAgICBjb25zdCBwbGF5QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRyb2xzLXBsYXknKTtcblxuICAgIC8vIGVuYWJsZSBmaWxlIHVwbG9hZFxuICAgIGNvbnN0IGF1ZGlvRmlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhdWRpby1maWxlJyk7XG4gICAgYXVkaW9GaWxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgZmlsZSA9IHRoaXMuZmlsZXNbMF07XG4gICAgICAgIGNvbnN0IHNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZSk7XG4gICAgICAgIGF1ZGlvRWxlbWVudC5zcmMgPSBzcmM7XG4gICAgICAgIGF1ZGlvQ3R4LnJlc3VtZSgpO1xuICAgICAgICBhdWRpb0VsZW1lbnQucGxheSgpO1xuICAgICAgICB2aXN1YWxpemVyLnJlc2V0UGVhaygpO1xuICAgICAgICBwbGF5QnV0dG9uLmRhdGFzZXQucGxheWluZyA9ICd0cnVlJztcbiAgICB9KTtcblxuICAgIC8vIHBsYXkgYW5kIHBhdXNlIGF1ZGlvXG4gICAgcGxheUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGF1ZGlvQ3R4LnN0YXRlID09PSAnc3VzcGVuZGVkJykge1xuICAgICAgICAgICAgYXVkaW9DdHgucmVzdW1lKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZGF0YXNldC5wbGF5aW5nID09PSAnZmFsc2UnKSB7XG4gICAgICAgICAgICBhdWRpb0VsZW1lbnQucGxheSgpO1xuICAgICAgICAgICAgdGhpcy5kYXRhc2V0LnBsYXlpbmcgPSAndHJ1ZSc7XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGFzZXQucGxheWluZyA9PT0gJ3RydWUnKSB7XG4gICAgICAgICAgICBhdWRpb0VsZW1lbnQucGF1c2UoKTtcbiAgICAgICAgICAgIHRoaXMuZGF0YXNldC5wbGF5aW5nID0gJ2ZhbHNlJztcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAvLyBtb2RhbCBmb3Igc29uZyB1cmwgXG4gICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNvdW5kY2xvdWQtbW9kYWxcIik7XG4gICAgY29uc3Qgc291bmRjbG91ZEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udHJvbHMtYXVkaW8tbGlua1wiKTtcbiAgICBjb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xvc2VcIik7XG5cbiAgICBzb3VuZGNsb3VkQnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9ICBcImJsb2NrXCI7XG4gICAgfVxuXG4gICAgY2xvc2VCdXR0b24ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfVxuXG4gICAgd2luZG93Lm9uY2xpY2sgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoZS50YXJnZXQgPT09IG1vZGFsKSB7XG4gICAgICAgICAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzdWJtaXQgbmV3IGF1ZGlvIFVSTCBcbiAgICBjb25zdCBzb3VuZGNsb3VkRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic291bmRjbG91ZEZvcm1cIik7XG4gICAgc291bmRjbG91ZEZvcm0ub25zdWJtaXQgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgZm9ybUVsID0gZG9jdW1lbnQuZm9ybXMuc291bmRjbG91ZEZvcm07XG4gICAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGZvcm1FbCk7XG4gICAgICAgIGNvbnN0IHNvdW5kY2xvdWRVcmwgPSBmb3JtRGF0YS5nZXQoXCJzb3VuZGNsb3VkVXJsXCIpO1xuICAgICAgICBhdWRpb0VsZW1lbnQuc3JjID0gc291bmRjbG91ZFVybDtcbiAgICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBhdWRpb0N0eC5yZXN1bWUoKTtcbiAgICAgICAgYXVkaW9FbGVtZW50LnBsYXkoKTtcbiAgICAgICAgdmlzdWFsaXplci5yZXNldFBlYWsoKTtcbiAgICAgICAgcGxheUJ1dHRvbi5kYXRhc2V0LnBsYXlpbmcgPSAndHJ1ZSc7XG4gICAgfVxuXG4gICAgLy8gY2xlYXIgY2FudmFzIFxuICAgIGZ1bmN0aW9uIGNsZWFyQ2FudmFzKCkge1xuICAgICAgICBjYW52YXMud2lkdGggPSBjYW52YXMud2lkdGg7XG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xuICAgICAgICBjYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgfVxuXG59KTsiLCJjb25zdCBDaXJjbGUgPSByZXF1aXJlKCcuL2NpcmNsZScpO1xuY29uc3QgUmVjdGFuZ2xlID0gcmVxdWlyZSgnLi9yZWN0YW5nbGUnKTtcbmNvbnN0IFV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG5OVU1fQ0lSQ0xFUyA9IDIwMDA7IFxuXG5jbGFzcyBNb3ZpbmdDaXJjbGVzIHtcbiAgICBjb25zdHJ1Y3RvcihjYW52YXMsIGFuYWx5emVyKSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xuICAgICAgICB0aGlzLmFuYWx5emVyID0gYW5hbHl6ZXI7XG4gICAgICAgIHRoaXMuYnVmZmVyTGVuZ3RoID0gdGhpcy5hbmFseXplci5mcmVxdWVuY3lCaW5Db3VudDtcbiAgICAgICAgdGhpcy5kYXRhQXJyYXkgPSBuZXcgVWludDhBcnJheSh0aGlzLmJ1ZmZlckxlbmd0aCk7XG4gICAgICAgIHRoaXMuYW5hbHl6ZXIuZmZ0U2l6ZSA9IDEwMjQ7XG4gICAgICAgIHRoaXMuY2lyY2xlcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE5VTV9DSVJDTEVTOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuY2lyY2xlcy5wdXNoKENpcmNsZS5yYW5kb21DaXJjbGUoY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0LCBOVU1fQ0lSQ0xFUykpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZUNpcmNsZXMoY2FudmFzKSB7XG4gICAgICAgIHRoaXMuY2lyY2xlcy5mb3JFYWNoKChjaXJjbGUpID0+IGNpcmNsZS5tb3ZlUmFuZG9tKHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpKVxuICAgIH1cblxuICAgIHVwZGF0ZVJhZGl1cyhybXMpIHtcbiAgICAgICAgdGhpcy5jaXJjbGVzLmZvckVhY2goKGNpcmNsZSkgPT4gY2lyY2xlLnVwZGF0ZVJhZGl1cyhybXMsIC4wMykpXG4gICAgfVxuXG4gICAgZHJhdyhmaWxsU3R5bGUsIGN0eCkge1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gZmlsbFN0eWxlO1xuICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgICAgIHRoaXMuYW5hbHl6ZXIuZ2V0Qnl0ZUZyZXF1ZW5jeURhdGEodGhpcy5kYXRhQXJyYXkpO1xuICAgICAgICBjb25zdCBybXMgPSBVdGlscy5nZXRSTVModGhpcy5kYXRhQXJyYXkpO1xuICAgICAgICB0aGlzLmNpcmNsZXMuZm9yRWFjaCgoY2lyY2xlKSA9PiBjaXJjbGUuZHJhdyhjdHgpKTtcbiAgICAgICAgdGhpcy5tb3ZlQ2lyY2xlcygpO1xuICAgICAgICB0aGlzLnVwZGF0ZVJhZGl1cyhybXMpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBNb3ZpbmdDaXJjbGVzOyIsImNvbnN0IENpcmNsZSA9IHJlcXVpcmUoJy4vY2lyY2xlJyk7XG5cbmNsYXNzIFB1bHNpbmdDaXJjbGUgZXh0ZW5kcyBDaXJjbGUge1xuICAgIGNvbnN0cnVjdG9yKHgsIHksIGNvbG9yLCByYWRpdXMsIGN0eCkge1xuICAgICAgICBzdXBlcih4LCB5LCBjb2xvciwgcmFkaXVzKTtcbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XG4gICAgICAgIHRoaXMuY3VycmVudFJhZGl1cyA9IHRoaXMucmFkaXVzO1xuICAgIH1cbiAgICBcbiAgICBkcmF3KCkge1xuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgdGhpcy5jdHguYXJjKHRoaXMueCwgdGhpcy55LCB0aGlzLmN1cnJlbnRSYWRpdXMsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcInJnYmEoMjU1LCAyNTUsIDI1NSwgXCIgKyB0aGlzLmN1cnJlbnRSYWRpdXMvNTAwICsgXCIpXCJcbiAgICAgICAgdGhpcy5jdHgubGluZVdpZHRoID0gdGhpcy5jdXJyZW50UmFkaXVzICouMDE7XG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuICAgICAgICB0aGlzLmN1cnJlbnRSYWRpdXMgKj0gMS4xOyBcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFJhZGl1cyA8IDIwMDApIHtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmRyYXcuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUHVsc2luZ0NpcmNsZTsiLCJjb25zdCBTaGFwZSA9IHJlcXVpcmUoJy4vc2hhcGUnKTtcblxuY2xhc3MgUmVjdGFuZ2xlIGV4dGVuZHMgU2hhcGUge1xuICAgIGNvbnN0cnVjdG9yKHgsIHksIGNvbG9yLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKHgsIHksIGNvbG9yKTtcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5yZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgIH0gXG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVjdGFuZ2xlOyIsImNsYXNzIFNoYXBlIHtcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCBjb2xvcikge1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNoYXBlOyIsImNvbnN0IEhFWF9ESUdJVFMgPSBcIjAxMjM0NTY3ODlBQkNERUZcIjtcblxuY29uc3QgVXRpbHMgPSB7XG4gICAgZ2V0Uk1TKGFycikge1xuICAgICAgICBsZXQgdmFsdWVzID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhbHVlcyArPSBhcnJbaV0gKiBhcnJbaV07XG4gICAgICAgIH1cbiAgICAgICAgcm1zID0gTWF0aC5zcXJ0KHZhbHVlcyAvIGFyci5sZW5ndGgpO1xuICAgICAgICByZXR1cm4gcm1zO1xuICAgIH0sXG5cbiAgICAvLyBmcm9tICdkcnVua2VuIGNpcmNsZXMnIFxuICAgIHJhbmRvbUNvbG9yKCkge1xuICAgICAgICBsZXQgY29sb3IgPSBcIiNcIjtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2OyBpKyspIHtcbiAgICAgICAgICAgIGNvbG9yICs9IEhFWF9ESUdJVFNbTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIDE2KSldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb2xvcjtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVXRpbHM7IiwiY29uc3QgUmVjdGFuZ2xlID0gcmVxdWlyZSgnLi9yZWN0YW5nbGUnKTtcbmNvbnN0IENpcmNsZSA9IHJlcXVpcmUoJy4vY2lyY2xlJyk7XG5jb25zdCBQdWxzaW5nQ2lyY2xlID0gcmVxdWlyZSgnLi9wdWxzaW5nX2NpcmNsZScpO1xuY29uc3QgVXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbmNsYXNzIFZpc3VhbGl6ZXIge1xuICAgIGNvbnN0cnVjdG9yKGFuYWx5emVyKSB7XG4gICAgICAgIHRoaXMuYW5hbHl6ZXIgPSBhbmFseXplcjtcbiAgICAgICAgdGhpcy5idWZmZXJMZW5ndGggPSB0aGlzLmFuYWx5emVyLmZyZXF1ZW5jeUJpbkNvdW50O1xuICAgICAgICB0aGlzLmRhdGFBcnJheSA9IG5ldyBVaW50OEFycmF5KHRoaXMuYnVmZmVyTGVuZ3RoKTtcbiAgICAgICAgdGhpcy5hbmFseXplci5mZnRTaXplID0gMjA0ODtcbiAgICAgICAgdGhpcy5wZWFrID0gNTA7XG4gICAgfVxuXG4gICAgcmVzZXRQZWFrKCkge1xuICAgICAgICB0aGlzLnBlYWsgPSA1MDtcbiAgICB9XG5cbiAgICBkcmF3KGZpbGxTdHlsZSwgY2FudmFzLCBjdHgsIG9wdGlvbnMpIHsgXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBmaWxsU3R5bGU7XG4gICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgICB0aGlzLmFuYWx5emVyLmdldEJ5dGVGcmVxdWVuY3lEYXRhKHRoaXMuZGF0YUFycmF5KTtcbiAgICAgICAgY29uc3Qgcm1zID0gVXRpbHMuZ2V0Uk1TKHRoaXMuZGF0YUFycmF5KTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGNpcmNsZSA9IG5ldyBDaXJjbGUoMTUwLCAxNTAsIFwid2hpdGVcIiwgcm1zKTtcbiAgICAgICAgY2lyY2xlLmRyYXcoY3R4KTtcblxuICAgICAgICAvL3B1bHNlIGNpcmNsdWxhclxuICAgICAgICBpZiAocm1zID4gKHRoaXMucGVhayAqIC45OCkpIHtcbiAgICAgICAgICAgIGxldCBjaXJjbGUyID0gbmV3IFB1bHNpbmdDaXJjbGUoY2lyY2xlLngsIGNpcmNsZS55LCBcIndoaXRlXCIsIHJtcywgY3R4KTtcbiAgICAgICAgICAgIGNpcmNsZTIuZHJhdygpO1xuICAgICAgICAgICAgdGhpcy5wZWFrID0gcm1zO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc3RhcnQgYXQgdG9wIGxlZnQgb2YgY2lyY2xlOyBcbiAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgY3R4LnRyYW5zbGF0ZShjaXJjbGUueCwgY2lyY2xlLnkpO1xuXG4gICAgICAgIGxldCBiYXJzID0gMzYwO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM2MDsgaSArPSAoMzYwL2JhcnMpKSB7XG4gICAgICAgICAgICBjb25zdCBiYXJXaWR0aCA9ICgyICogTWF0aC5QSSAqIHJtcykgLyBiYXJzO1xuICAgICAgICAgICAgY29uc3QgYmFySGVpZ2h0ID0gKGNhbnZhcy5oZWlnaHQgKiAodGhpcy5kYXRhQXJyYXlbaV0gLyAyNTUpKTtcbiAgICAgICAgICAgIGN0eC5yb3RhdGUoMSAqIE1hdGguUEkgLyAxODApO1xuICAgICAgICAgICAgY29uc3QgZ3JkID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KDAsIDAsIGNhbnZhcy5oZWlnaHQsIDApO1xuICAgICAgICAgICAgZ3JkLmFkZENvbG9yU3RvcCgwLCBvcHRpb25zLnByaW1hcnkgPyBvcHRpb25zLnByaW1hcnkgOiBcInJlZFwiKTtcbiAgICAgICAgICAgIGdyZC5hZGRDb2xvclN0b3AoLjUsIG9wdGlvbnMuc2Vjb25kYXJ5ID8gb3B0aW9ucy5zZWNvbmRhcnkgOiBcIm9yYW5nZVwiKTtcbiAgICAgICAgICAgIGdyZC5hZGRDb2xvclN0b3AoMSwgb3B0aW9ucy50ZXJ0aWFyeSA/IG9wdGlvbnMudGVydGlhcnkgOiBcIndoaXRlXCIpO1xuICAgICAgICAgICAgY29uc3QgcmVjdCA9IG5ldyBSZWN0YW5nbGUocm1zLCAtYmFyV2lkdGggLyAyLCBncmQsIGJhckhlaWdodCAqIDIsIGJhcldpZHRoKTtcbiAgICAgICAgICAgIHJlY3QuZHJhdyhjdHgpO1xuICAgICAgICB9XG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFZpc3VhbGl6ZXI7Il0sInNvdXJjZVJvb3QiOiIifQ==