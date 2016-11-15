class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
    ctx.fill();
  }

  move() {
    if (this.pos[0] - this.radius <= 0 ||
      this.pos[0] + this.radius >= window.innerWidth) {
        this.vel[0] = this.vel[0] * -1;
    }

    if (this.pos[1] - this.radius <= 0 ||
      this.pos[1] + this.radius >= window.innerHeight) {
        this.vel[1] = this.vel[1] * -1;
    }

    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
  }

}

module.exports = MovingObject;
