function randomColor() {
  const hexDigits = "0123456789ABCDEF";

  let color = "#";
  for (let i = 0; i < 3; i ++) {
    color += hexDigits[Math.floor((Math.random() * 16))];
  }

  return color;
}

class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = randomColor();
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
