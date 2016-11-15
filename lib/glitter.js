const Physics = require('./physics.js');
const MovingObject = require('./moving_object');

class Glitter extends MovingObject {
  constructor(color, pos, radius) {
    let opts = {};
    let speed = 3;
    opts.radius = 1;
    opts.vel = Physics.randomVec(speed);
    opts.pos = pos;
    super(opts);
  }
}

module.exports = Glitter;
