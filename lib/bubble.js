const MovingObject = require('./moving_object');

const COLOR = "#505050";
const RADIUS = 25;
const SPEED = 4;

const randomVec = (length) => {
  const deg = 2 * Math.PI * Math.random();
  return this.scale([Math.sin(deg), Math.cos(deg)], length);
};

const scale = (vec, m) => {
  return [vec[0] * m, vec[1] * m];
};

class Bubble extends  MovingObject {
  constructor (pos) {
    let opts = {};
    opts.color = COLOR;
    opts.radius = RADIUS;
    opts.vel = randomVec(SPEED);
    opts.pos = pos;
    super(opts);
  }

}

module.exports = MovingObject;
