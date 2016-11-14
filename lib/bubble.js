import MovingObject from './moving_object';

const COLOR = "#505050";
const RADIUS = 25;
const SPEED = 4;

class Bubble extends  MovingObject {
  constructor (pos) {
    let opts = {};
    opts.color = COLOR;
    opts.radius = RADIUS;
    opts.vel = this.randomVec(SPEED);
    opts.pos = pos;
    super(opts);
  }

  randomVec (length) {
    const deg = 2 * Math.PI * Math.random();
    return this.scale([Math.sin(deg), Math.cos(deg)], length);
  }

  scale (vec, m) {
    return [vec[0] * m, vec[1] * m];
  }
}
