const Physics = require('./physics.js');
const MovingObject = require('./moving_object');

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
