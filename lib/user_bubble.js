const MovingObject = require('./moving_object');

class UserBubble extends MovingObject {
  constructor (pos) {
    let opts = {};
    opts.radius = 10;
    opts.vel = [0, 0];
    opts.pos = [window.innerWidth/2, window.innerHeight/2];
    super(opts);
  }

  propel(input) {
    this.vel[0] += input[0];
    this.vel[1] += input[1];
  }
}

module.exports = UserBubble;
