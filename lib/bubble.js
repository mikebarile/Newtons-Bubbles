const MovingObject = require('./moving_object');

const COLOR = "#505050";
const RADIUS = 40;
const SPEED = 6;

const scale = (vec, m) => {
  return [vec[0] * m, vec[1] * m];
};

const randomVec = (length) => {
  const deg = 2 * Math.PI * Math.random();
  return scale([Math.sin(deg), Math.cos(deg)], length);
};

const randomPos = (radius) => {
  let xPos = Math.floor(Math.random() * (window.innerWidth - 2*radius - 1)) + radius + 1;
  let yPos = Math.floor(Math.random() * (window.innerHeight - 2*radius - 1)) + radius + 1;
  return [xPos, yPos];
};

class Bubble extends MovingObject {
  constructor (pos) {
    let opts = {};
    let speed = Math.floor(Math.random() * SPEED) + 1;
    opts.color = COLOR;
    opts.radius = Math.floor(Math.random() * RADIUS) + 5;
    opts.vel = randomVec(speed);
    opts.pos = randomPos(opts.radius);
    super(opts);
  }

  bounce (x, y) {
    this.vel = [x, y];
  }
}

module.exports = Bubble;
