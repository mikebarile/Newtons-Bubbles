const MovingObject = require('./moving_object');

class UserBubble extends MovingObject {
  constructor (pos) {
    let opts = {};
    opts.color = "blue";
    opts.radius = 10;
    opts.vel = [0, 0];
    opts.pos = [window.innerWidth/2, window.innerHeight/2];
    super(opts);
  }
}

module.exports = UserBubble;
