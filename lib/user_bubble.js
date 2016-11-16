const MovingObject = require('./moving_object');
const Pellet = require('./pellet');

class UserBubble extends MovingObject {
  constructor (game) {
    let opts = {};
    opts.radius = 10;
    opts.vel = [0, 0];
    opts.pos = [window.innerWidth/2, window.innerHeight/2];
    super(opts);
    this.game = game;
  }

  propel(input) {
    this.vel[0] += input[0];
    this.vel[1] += input[1];
    this.radius = this.radius * .999;
    this.game.pellets.push(new Pellet(this.color, this.pos, this.radius, this.vel));
  }
}

module.exports = UserBubble;
