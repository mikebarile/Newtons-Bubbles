const Physics = require('./physics.js');
const MovingObject = require('./moving_object');
const Glitter = require('./glitter');

const RADIUS = 50;
const SPEED = 3;

class Bubble extends MovingObject {
  constructor(game) {
    let opts = {};
    let speed = Math.floor(Math.random() * SPEED) + 1;
    opts.radius = Math.floor(Math.random() * RADIUS) + 1;
    opts.vel = Physics.randomVec(speed);
    opts.pos = Physics.randomPos(opts.radius);
    super(opts);
    this.game = game;
    this.createGlitter = this.createGlitter.bind(this);
  }

  bounce (x, y, otherBubble) {
    this.createGlitter(otherBubble);
    this.pos = [this.pos[0] + x, this.pos[1] + y];
    this.vel = [x, y];
  }

  createGlitter(otherBubble) {
    let pocs = Physics.pointOfContact(this, otherBubble);
    let poc1 = [pocs[0], pocs[1]];
    let poc2 = [pocs[2], pocs[3]];
    for (var i = 0; i < this.radius; i++) {
      this.game.glitter.push(new Glitter(this.color, poc1, this.radius));
      this.game.glitter.push(new Glitter(this.color, poc2, this.radius));
      this.radius = this.radius - .01;
    }
  }
}

module.exports = Bubble;
