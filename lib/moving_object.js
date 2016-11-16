const Color = require('./color.js');

class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = Color.randomColor();
    this.alive = true;
    this.glitter = false;
    this.pellet = false;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
    ctx.fill();
  }

  isCollidedWith(otherObject) {
    let distance = Math.sqrt(Math.pow((this.pos[0] - otherObject.pos[0]), 2) +
      Math.pow((this.pos[1] - otherObject.pos[1]), 2));
    return (distance < this.radius + otherObject.radius);
  }

  move(delta) {

    // Logic for shrinking dead bubbles
    if (this.alive === false && this.radius > 0 && !this.glitter) {
      if (this.radius < 1) {
        this.radius = 0;
      }
      else {
        this.radius = this.radius - 1;
      }
    }

    if (this.glitter && this.radius >= 0.01) {
      this.radius = this.radius - 0.01;
    }

    if (this.pellet && this.radius >= 0.005) {
      this.radius = this.radius - 0.005;
    }

    // Logic for growing user bubble upon absorption
    if (this.targetRadius !== null && this.radius < this.targetRadius) {
      this.radius = this.radius + .1;
    }

    delta = delta || 1;

    if (this.pos[0] - this.radius <= 0) {
      this.pos[0] = 0 + this.radius;
      this.vel[0] = this.vel[0] * -1;
    }
    else if (this.pos[0] + this.radius >= window.innerWidth) {
      this.pos[0] = window.innerWidth - this.radius;
      this.vel[0] = this.vel[0] * -1;
    }


    if (this.pos[1] - this.radius <= 0) {
      this.pos[1] = 0 + this.radius;
      this.vel[1] = this.vel[1] * -1;
    }
    else if (this.pos[1] + this.radius >= window.innerHeight) {
      this.pos[1] = window.innerHeight - this.radius;
      this.vel[1] = this.vel[1] * -1;
    }

    this.pos = [
      this.pos[0] + delta/20 * this.vel[0],
      this.pos[1] + delta/20 * this.vel[1]
    ];
  }

}

module.exports = MovingObject;
