const Physics = require('./physics.js');
const MovingObject = require('./moving_object');

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
