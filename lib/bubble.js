const Physics = require('./physics.js');
const MovingObject = require('./moving_object');
const Glitter = require('./glitter');
const Color = require('./color');

const RADIUS = 50;
const SPEED = 3;

class Bubble extends MovingObject {
  constructor(game, idx) {
    let opts = {};
    let speed = Math.floor(Math.random() * SPEED) + 1;
    console.log(game);
    console.log(game.difficulty);
    opts.radius = Math.floor((Math.random()*.5+.5) * idx * game.difficulty) + 1;
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
