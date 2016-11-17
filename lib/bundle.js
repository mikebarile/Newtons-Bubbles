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
	  let pause = document.getElementById('pause');
	  let corner = document.getElementById('corner-instructions');
	  let display = document.getElementById('start-display');
	  let space = document.getElementById('press-space');
	
	  pause.addEventListener("click", () => {
	    gv.run = !gv.run;
	    if (gv.run) {
	      gv.start();
	    }
	  });
	
	  document.addEventListener("keydown", () => {
	  	if (event.which === 32 && !gv.run){
	      pause.className = "pause";
	      corner.className = "corner-instructions";
	      display.className = "start-display gone";
	      space.className = "press-space gone";
	      gv.run = true;
	  		gv.start();
	  	}
	  });
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Bubble = __webpack_require__(2);
	const UserBubble = __webpack_require__(5);
	const Physics = __webpack_require__(6);
	const Color = __webpack_require__(7);
	
	class Game {
	  constructor () {
	    this.bubbles = [];
	    this.userBubbles = [];
	    this.glitter = [];
	    this.pellets = [];
	    this.addUserBubble();
	    this.addBubbles();
	    this.draw = this.draw.bind(this);
	    this.moveObjects = this.moveObjects.bind(this);
	    this.checkCollisions = this.checkCollisions.bind(this);
	    this.step = this.step.bind(this);
	    this.allBubbles = this.allBubbles.bind(this);
	    this.checkRadius = this.checkRadius.bind(this);
	    this.applyGravity = this.applyGravity.bind(this);
	    this.checkEnd = this.checkEnd.bind(this);
	    this.resetGame = this.resetGame.bind(this);
	  }
	
	  allBubbles() {
	    let newArray = this.userBubbles.concat(this.bubbles).concat(this.glitter).concat(this.pellets);
	    return newArray;
	  }
	
	  addBubbles() {
	    for (var i = 0; i < Game.NUM_BUBBLES; i++) {
	      let bubble = new Bubble(this, i);
	      while(this.checkCollision(bubble)){
	        bubble = new Bubble(this, i);
	      }
	      this.bubbles.push(bubble);
	    }
	  }
	
	  addUserBubble() {
	    this.userBubbles.push(new UserBubble(this));
	  }
	
	  // Function to ensure bubbles are initialized separated from one another
	  checkCollision(bubble) {
	    let collided = false;
	    for (var i = 0; i < this.allBubbles().length; i++) {
	      if (this.allBubbles()[i].isCollidedWith(bubble)){
	        collided = true;
	      }
	    }
	    return collided;
	  }
	
	  checkCollisions() {
	
	    this.checkUserCollision();
	
	    for (var i = 0; i < this.bubbles.length; i++) {
	      for (var j = i + 1; j < this.bubbles.length; j++) {
	        if (this.bubbles[i].isCollidedWith(this.bubbles[j])) {
	          Physics.collide(this.bubbles[i], this.bubbles[j]);
	        }
	      }
	    }
	  }
	
	  checkUserCollision() {
	    let user = this.userBubbles[0];
	
	    for (var i = 0; i < this.bubbles.length; i++) {
	      let bubble = this.bubbles[i];
	      if (user.isCollidedWith(bubble)) {
	        if (user.radius >= bubble.radius) {
	          if (bubble.alive === true) {
	            user.absorbBubble(bubble);
	          }
	        }
	        else {
	          user.createGlitter(bubble);
	          user.alive = false;
	        }
	      }
	    }
	  }
	
	  checkRadius() {
	    this.bubbles = this.bubbles.filter(obj => {
	      return obj.radius > 1;
	    });
	
	    this.glitter = this.glitter.filter(obj => {
	      return obj.radius > 0.005;
	    });
	
	    this.pellets = this.pellets.filter(obj => {
	      return obj.radius > 0.005;
	    });
	  }
	
	  applyGravity() {
	    this.bubbles.forEach(bubble => {
	      this.allBubbles().forEach(obj => {
	        if (bubble.pos[0] !== obj.pos[0] && bubble.pos[1] !== obj.pos[1]) {
	          obj.vel = Physics.calculateGravity(obj, bubble);
	        }
	      });
	    });
	    this.userBubbles.forEach(bubble => {
	      this.allBubbles().forEach(obj => {
	        if (bubble.pos[0] !== obj.pos[0] && bubble.pos[1] !== obj.pos[1]) {
	          obj.vel = Physics.calculateGravity(obj, bubble);
	        }
	      });
	    });
	  }
	
	  step(delta) {
	    this.moveObjects(delta);
	    this.checkCollisions();
	    this.checkRadius();
	    this.applyGravity();
	    this.userBubbles[0].setRandomColor();
	    this.checkEnd();
	  }
	
	  draw(ctx) {
	    ctx.clearRect(0, 0, Game.X_COORD, Game.Y_COORD);
	    this.allBubbles().forEach(bubble => { bubble.draw(ctx); });
	  }
	
	  moveObjects(delta) {
	    this.allBubbles().forEach(bubble => { bubble.move(delta); });
	  }
	
	  resetGame() {
	    this.bubbles = [];
	    this.userBubbles = [];
	    this.glitter = [];
	    this.pellets = [];
	    this.addUserBubble();
	    this.addBubbles();
	  }
	
	  checkEnd() {
	    if(!this.userBubbles[0].alive) {
	      let end = document.getElementById('end-display');
	      end.className = 'end-display';
	      document.addEventListener("keydown", () => {
	        if (event.which === 32){
	          this.resetGame();
	          end.className = 'end-display gone';
	          this.gameView.userBubble = this.userBubbles[0];
	        }
	      });
	    }
	  }
	}
	
	Game.X_COORD = window.innerWidth;
	Game.Y_COORD = window.innerHeight;
	Game.NUM_BUBBLES = 25;
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Physics = __webpack_require__(6);
	const MovingObject = __webpack_require__(3);
	const Glitter = __webpack_require__(8);
	const Color = __webpack_require__(7);
	
	const RADIUS = 50;
	const SPEED = 3;
	
	class Bubble extends MovingObject {
	  constructor(game, idx) {
	    let opts = {};
	    let speed = Math.floor(Math.random() * SPEED) + 1;
	    opts.radius = Math.floor(Math.random() * RADIUS) + 1;
	    opts.vel = Physics.randomVec(speed);
	    opts.pos = Physics.randomPos(opts.radius);
	    opts.color = Color.bubbleColor(idx);
	    super(opts);
	    this.game = game;
	    this.createGlitter = this.createGlitter.bind(this);
	  }
	
	  bounce (x, y, otherBubble) {
	    this.vel = [x, y];
	    this.createGlitter(otherBubble);
	    this.pos = [this.pos[0] + x, this.pos[1] + y];
	  }
	
	  createGlitter(otherBubble) {
	    let poc = Physics.pointOfContact(this, otherBubble);
	    for (var i = 0; i < this.radius*(Physics.mag(this.vel)+Physics.mag(otherBubble.vel))/10; i++) {
	      this.game.glitter.push(new Glitter(this.color, poc, this.radius, this.vel));
	      this.radius = this.radius - .01;
	    }
	  }
	}
	
	module.exports = Bubble;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Color = __webpack_require__(7);
	
	class MovingObject {
	  constructor(options) {
	    this.pos = options.pos;
	    this.vel = options.vel;
	    this.radius = options.radius;
	    this.color = options.color;
	    this.alive = true;
	    this.glitter = false;
	    this.pellet = false;
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
	
	  move(delta) {
	
	    // Logic for shrinking dead bubbles
	    if (this.alive === false && this.radius > 0 && !this.glitter) {
	      if (this.radius < 1) {
	        this.radius = 0;
	      }
	      else {
	        this.radius = this.radius - 1;
	      }
	    }
	
	    if (this.glitter && this.radius >= 0.005) {
	      this.radius = this.radius - 0.005;
	    }
	
	    if (this.pellet && this.radius >= 0.005) {
	      this.radius = this.radius - 0.005;
	    }
	
	    // Logic for growing user bubble upon absorption
	    if (this.targetRadius !== null && this.radius < this.targetRadius) {
	      this.radius = this.radius + .1;
	    }
	
	    delta = delta || 1;
	
	    if (this.pos[0] - this.radius <= 0) {
	      this.pos[0] = 0 + this.radius;
	      this.vel[0] = this.vel[0] * -1;
	    }
	    else if (this.pos[0] + this.radius >= window.innerWidth) {
	      this.pos[0] = window.innerWidth - this.radius;
	      this.vel[0] = this.vel[0] * -1;
	    }
	
	
	    if (this.pos[1] - this.radius <= 0) {
	      this.pos[1] = 0 + this.radius;
	      this.vel[1] = this.vel[1] * -1;
	    }
	    else if (this.pos[1] + this.radius >= window.innerHeight) {
	      this.pos[1] = window.innerHeight - this.radius;
	      this.vel[1] = this.vel[1] * -1;
	    }
	
	    this.pos = [
	      this.pos[0] + delta/20 * this.vel[0],
	      this.pos[1] + delta/20 * this.vel[1]
	    ];
	  }
	
	}
	
	module.exports = MovingObject;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	
	const MOVES = {
	  "w": [ 0, -1],
	  "a": [-1,  0],
	  "s": [ 0,  1],
	  "d": [ 1,  0],
	  "up": [ 0, -1],
	  "left": [-1,  0],
	  "down": [ 0,  1],
	  "right": [ 1,  0]
	};
	
	class GameView {
	  constructor(game, ctx) {
	    this.game = game;
	    this.game.gameView = this;
	    this.ctx = ctx;
	    this.start = this.start.bind(this);
	    this.userBubble = this.game.userBubbles[0];
	    this.lastTime = 0;
	    this.run = false;
	  }
	
	  animate(curTime) {
	    let delta = curTime - this.lastTime;
	
	    if (delta > 35) {
	      delta = 16.66;
	    }
	
	    this.game.draw(this.ctx);
	    this.game.step(delta);
	    this.lastTime = curTime;
	
	    if(this.run === true) {
	      requestAnimationFrame(this.animate.bind(this));
	    }
	  }
	
	  bindKeyHandlers() {
	    const ship = this.userBubble;
	
	    Object.keys(MOVES).forEach((k) => {
	      let input = MOVES[k];
	      key(k, () => { this.userBubble.propel(input); });
	    });
	  }
	
	  start() {
	    this.bindKeyHandlers();
	    requestAnimationFrame(this.animate.bind(this));
	  }
	
	}
	
	module.exports = GameView;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(3);
	const Pellet = __webpack_require__(9);
	const Physics = __webpack_require__(6);
	const Color = __webpack_require__(7);
	const Glitter = __webpack_require__(8);
	
	class UserBubble extends MovingObject {
	  constructor (game) {
	    let opts = {};
	    opts.radius = 10;
	    opts.vel = [0, 0];
	    opts.pos = [window.innerWidth/2, window.innerHeight/2];
	    opts.color = Color.randomColor();
	    super(opts);
	    this.game = game;
	    this.firstAbsorb = false;
	    this.colorCount = 0;
	  }
	
	  propel(input) {
	    this.vel[0] += input[0];
	    this.vel[1] += input[1];
	    this.radius = this.radius * .999;
	    this.game.pellets.push(new Pellet(this.color, this.pos, this.radius, this.vel));
	  }
	
	  absorbBubble(bubble) {
	    this.targetRadius = Physics.addMassMath(this, bubble);
	    this.color = Color.colorDifference(this, bubble);
	    bubble.alive = false;
	    for (var i = 0; i < bubble.radius; i++) {
	      bubble.createGlitter(this);
	    }
	    this.firstAbsorb = true;
	  }
	
	  createGlitter(otherBubble) {
	    let poc = Physics.pointOfContact(this, otherBubble);
	    for (var i = 0; i < this.radius*(Physics.mag(this.vel)+Physics.mag(otherBubble.vel)); i++) {
	      this.game.glitter.push(new Glitter(this.color, poc, this.radius, this.vel));
	      this.radius = this.radius - .01;
	    }
	  }
	
	  setRandomColor() {
	    this.colorCount += 1;
	    if (this.firstAbsorb === false && this.colorCount === 15) {
	      this.color = Color.randomColor();
	      this.colorCount = 0;
	    }
	  }
	}
	
	module.exports = UserBubble;


/***/ },
/* 6 */
/***/ function(module, exports) {

	const G = .0001;
	
	class Physics {
	  static addMassMath(user, bubble) {
	    let userMass = Math.PI * Math.pow(user.radius, 2);
	    let bubMass = Math.PI * Math.pow(bubble.radius, 2);
	
	    userMass = userMass + bubMass;
	    let newRadius = Math.sqrt(userMass / Math.PI);
	    return newRadius;
	  }
	
	  static mag(v) {
	    return Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2));
	  }
	
	  // Physics engine governing elastic collisions
	  static collide(bub1, bub2) {
	    // Calculate mass for each bubble
	    let m1 = Math.PI * Math.pow((bub1.radius), 2);
	    let m2 = Math.PI * Math.pow((bub2.radius), 2);
	
	    // Calculate contact angle
	    let dx = bub1.pos[0] - bub2.pos[0];
	    let dy = bub1.pos[1] - bub2.pos[1];
	    let angle = Math.atan2(dy, dx);
	
	    // Calculate velocity magnitudes and directional vectors
	    let mag1 = this.mag(bub1.vel);
	    let mag2 = this.mag(bub2.vel);
	    let d1 = Math.atan2(bub1.vel[1], bub1.vel[0]);
	    let d2 = Math.atan2(bub2.vel[1], bub2.vel[0]);
	
	    // Calculate new speeds based on magnitude, direction and the collision angle
	    let newX1 = mag1*Math.cos(d1 - angle);
	    let newY1 = mag1*Math.sin(d1 - angle);
	    let newX2 = mag2*Math.cos(d2 - angle);
	    let newY2 = mag2*Math.sin(d2 - angle);
	
	    // Adjust final speeds
	    let finalX1 = ((m1 - m2)*newX1 + (m2+m2)*newX2) / (m1+m2);
	    let finalX2 = ((m1 + m1)*newX1 + (m2 - m1)*newX2) / (m1+m2);
	    let finalY1 = newY1;
	    let finalY2 = newY2;
	
	    let x1 = Math.cos(angle)*finalX1 + Math.cos(angle + Math.PI/2)*finalY1;
	    let y1 = Math.sin(angle)*finalX1 + Math.sin(angle + Math.PI/2)*finalY1;
	    let x2 = Math.cos(angle)*finalX2 + Math.cos(angle + Math.PI/2)*finalY2;
	    let y2 = Math.sin(angle)*finalX2 + Math.sin(angle + Math.PI/2)*finalY2;
	
	    bub1.bounce(x1, y1, bub2);
	    bub2.bounce(x2, y2, bub1);
	  }
	
	  static scale(vec, m) {
	    return [vec[0] * m, vec[1] * m];
	  }
	
	  static randomVec(length) {
	    const deg = 2 * Math.PI * Math.random();
	    return this.scale([Math.sin(deg), Math.cos(deg)], length);
	  }
	
	  static randomPos(radius) {
	    let xPos = Math.floor(Math.random() * (window.innerWidth - 2*radius - 1)) + radius + 1;
	    let yPos = Math.floor(Math.random() * (window.innerHeight - 2*radius - 1)) + radius + 1;
	    return [xPos, yPos];
	  }
	
	  static pointOfContact(b1, b2) {
	    let x0 = b1.pos[0];
	    let y0 = b1.pos[1];
	
	    let dx = x0 - b2.pos[0];
	    let dy = y0 - b2.pos[1];
	
	
	
	    let mag = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
	    let uv = [dx / mag, dy / mag];
	
	    return [x0 - b1.radius*uv[0], y0 - b1.radius*uv[1]];
	  }
	
	  static pelletPos(pos, radius, vel) {
	    let x0 = pos[0];
	    let y0 = pos[1];
	
	    let mag = this.mag(vel);
	    let uv = [vel[0] / mag, vel[1] / mag];
	
	    return [x0 + radius*uv[0], y0 + radius*uv[1]];
	  }
	
	  static glitterVel(vel) {
	    let vx, vy;
	
	    if (vel[0] === 0){
	      vx = .001;
	    }
	    else {
	      vx = vel[0];
	    }
	
	    if (vel[1] === 0){
	      vy = .001;
	    }
	    else {
	      vy = vel[1];
	    }
	
	    let x = Math.random()*4*Math.sign(vx) + vel[0];
	    let y = Math.random()*4*Math.sign(vy) + vel[1];
	    return [x,y];
	  }
	
	  static calculateGravity(obj1, obj2) {
	    let m1 = Math.PI * Math.pow(obj1.radius, 2);
	    let m2 = Math.PI * Math.pow(obj2.radius, 2);
	
	    if (obj1.glitter === true){
	      m2 = m2 * 50;
	    }
	
	    let dx = obj2.pos[0] - obj1.pos[0];
	    let dy = obj2.pos[1] - obj1.pos[1];
	    let d = this.mag([dx, dy]);
	
	    let a = G * m2 / (d * d);
	
	    let vx = a * dx;
	    let vy = a * dy;
	
	    return [obj1.vel[0] + vx, obj1.vel[1] + vy];
	  }
	}
	
	module.exports = Physics;


/***/ },
/* 7 */
/***/ function(module, exports) {

	const COLORS = [
	  "#4C00FF",
	  "#0042FF",
	  "#0088FF",
	  "#0400FF",
	  "#01CEFF",
	  "#00FFF8",
	  "#00FF62",
	  "#00FF17",
	  "#00FFAD",
	  "#40FF01",
	  "#9DFF00",
	  "#FFE600",
	  "#FFCB00",
	  "#F9FF00",
	  "#FFB101",
	  "#FF9900",
	  "#FF4E00",
	  "#FF2700",
	  "#FF7400",
	  "#FF0101",
	  "#FF0060",
	  "#C500FF",
	  "#7D00FF",
	  "#FF00E4",
	  "#FF00BB"
	];
	
	class Color {
	  static randomColor() {
	    return COLORS[Math.floor(Math.random()*25)];
	  }
	
	  static bubbleColor(idx) {
	    return COLORS[idx];
	  }
	
	  static parseHexColor(c) {
	    var j = {};
	
	    j.red = parseInt(c.slice(1,3), 16);
	    j.green = parseInt(c.slice(3,5), 16);
	    j.blue = parseInt(c.slice(5,7), 16);
	
	    return j;
	  }
	
	  static colorDifference(user, bubble) {
	
	    let userColor = this.parseHexColor(user.color);
	    let bubColor = this.parseHexColor(bubble.color);
	
	    if(typeof(userColor) != 'undefined' && typeof(bubColor) != 'undefined') {
	      return ("#" + this.weighColors(user, bubble, userColor.red, bubColor.red) +
	        this.weighColors(user, bubble, userColor.green, bubColor.green) +
	        this.weighColors(user, bubble, userColor.blue, bubColor.blue));
	    }
	  }
	
	  static weighColors(b1, b2, c1, c2) {
	    let m1 = Math.PI * Math.pow(b1.radius,2);
	    let m2 = Math.PI * Math.pow(b2.radius,2);
	
	    return Math.abs(Math.floor((c1*m1 + c2*m2) / (m1 + m2))).toString(16);
	  }
	}
	
	module.exports = Color;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	const Physics = __webpack_require__(6);
	const MovingObject = __webpack_require__(3);
	
	class Glitter extends MovingObject {
	  constructor(color, pos, radius, vel) {
	    let opts = {};
	    let speed = 3;
	    opts.radius = 1;
	    opts.vel = Physics.glitterVel(vel);
	    opts.pos = pos;
	    opts.color = color;
	    super(opts);
	    this.glitter = true;
	  }
	
	
	}
	
	module.exports = Glitter;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	const Physics = __webpack_require__(6);
	const MovingObject = __webpack_require__(3);
	
	class Pellet extends MovingObject {
	  constructor(color, pos, radius, vel) {
	    let opts = {};
	    let speed = 3;
	    opts.radius = 1;
	    opts.vel = [vel[0]*-1 / 5, vel[1]*-1 / 5];
	    opts.pos = Physics.pelletPos(pos, radius, vel);
	    opts.color = color;
	    super(opts);
	    this.pellet = true;
	  }
	}
	
	module.exports = Pellet;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map