const MovingObject = require('./moving_object');
const Pellet = require('./pellet');
const Physics = require('./physics');
const Color = require('./color');
const Glitter = require('./glitter');

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
