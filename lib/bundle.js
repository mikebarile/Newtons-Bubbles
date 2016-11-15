/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	const GameView = __webpack_require__(4);
	
	document.addEventListener("DOMContentLoaded", () => {
	  let canvas = document.getElementById('game-canvas');
	  canvas.width = window.innerWidth;
	  canvas.height = window.innerHeight;
	  const ctx = canvas.getContext("2d");
	  let game = new Game();
	  let gv = new GameView(game, ctx);
	  gv.start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Bubble = __webpack_require__(2);
	
	class Game {
	  constructor () {
	    this.bubbles = [];
	    this.addBubbles();
	    this.draw = this.draw.bind(this);
	    this.moveObjects = this.moveObjects.bind(this);
	    this.checkCollisions = this.checkCollisions.bind(this);
	    this.step = this.step.bind(this);
	  }
	
	  addBubbles() {
	    for (var i = 0; i < Game.NUM_BUBBLES; i++) {
	      let bubble = new Bubble();
	      while(this.checkCollision(bubble)){
	        bubble = new Bubble();
	      }
	      this.bubbles.push(bubble);
	    }
	  }
	
	  checkCollision(bubble) {
	    let collided = false;
	    for (var i = 0; i < this.bubbles.length; i++) {
	      if (this.bubbles[i].isCollidedWith(bubble)){
	        collided = true;
	      }
	    }
	    return collided;
	  }
	
	  checkCollisions() {
	    for (var i = 0; i < this.bubbles.length; i++) {
	      for (var j = i + 1; j < this.bubbles.length; j++) {
	        if (this.bubbles[i].isCollidedWith(this.bubbles[j])) {
	          console.log("COLLISION");
	        }
	      }
	    }
	  }
	
	  step() {
	    this.moveObjects();
	    this.checkCollisions();
	  }
	
	  draw(ctx) {
	    ctx.clearRect(0, 0, Game.X_COORD, Game.Y_COORD);
	    this.bubbles.forEach(bubble => { bubble.draw(ctx); });
	  }
	
	  moveObjects() {
	    this.bubbles.forEach(bubble => { bubble.move(); });
	  }
	
	}
	
	Game.X_COORD = window.innerWidth;
	Game.Y_COORD = window.innerHeight;
	Game.NUM_BUBBLES = 15;
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(3);
	
	const COLOR = "#505050";
	const RADIUS = 40;
	const SPEED = 6;
	
	const scale = (vec, m) => {
	  return [vec[0] * m, vec[1] * m];
	};
	
	const randomVec = (length) => {
	  const deg = 2 * Math.PI * Math.random();
	  return scale([Math.sin(deg), Math.cos(deg)], length);
	};
	
	const randomPos = (radius) => {
	  let xPos = Math.floor(Math.random() * (window.innerWidth - 2*radius - 1)) + radius + 1;
	  let yPos = Math.floor(Math.random() * (window.innerHeight - 2*radius - 1)) + radius + 1;
	  return [xPos, yPos];
	};
	
	class Bubble extends MovingObject {
	  constructor (pos) {
	    let opts = {};
	    let speed = Math.floor(Math.random() * SPEED) + 1;
	    opts.color = COLOR;
	    opts.radius = Math.floor(Math.random() * RADIUS) + 5;
	    opts.vel = randomVec(speed);
	    opts.pos = randomPos(opts.radius);
	    super(opts);
	  }
	
	}
	
	module.exports = Bubble;


/***/ },
/* 3 */
/***/ function(module, exports) {

	class MovingObject {
	  constructor(options) {
	    this.pos = options.pos;
	    this.vel = options.vel;
	    this.radius = options.radius;
	    this.color = options.color;
	  }
	
	  draw(ctx) {
	    ctx.fillStyle = this.color;
	
	    ctx.beginPath();
	    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
	    ctx.fill();
	  }
	
	  isCollidedWith(otherObject) {
	    let distance = Math.sqrt(Math.pow((this.pos[0] - otherObject.pos[0]), 2) +
	      Math.pow((this.pos[1] - otherObject.pos[1]), 2));
	    return (distance < this.radius + otherObject.radius);
	  }
	
	  move() {
	    if (this.pos[0] - this.radius <= 0 ||
	      this.pos[0] + this.radius >= window.innerWidth) {
	        this.vel[0] = this.vel[0] * -1;
	    }
	
	    if (this.pos[1] - this.radius <= 0 ||
	      this.pos[1] + this.radius >= window.innerHeight) {
	        this.vel[1] = this.vel[1] * -1;
	    }
	
	    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
	  }
	
	}
	
	module.exports = MovingObject;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	
	class GameView {
	  constructor(game, ctx) {
	    this.game = game;
	    this.ctx = ctx;
	    this.start = this.start.bind(this);
	  }
	
	  start() {
	    setInterval(() => {this.game.draw(this.ctx);}, 20);
	    setInterval(this.game.step, 20);
	  }
	}
	
	module.exports = GameView;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map