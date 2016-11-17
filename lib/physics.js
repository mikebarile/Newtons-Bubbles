const G = .0001;

class Physics {
  static addMassMath(user, bubble) {
    let userMass = Math.PI * Math.pow(user.radius, 2);
    let bubMass = Math.PI * Math.pow(bubble.radius, 2);

    userMass = userMass + bubMass;
    let newRadius = Math.sqrt(userMass / Math.PI);
    return newRadius;
  }

  static mag(v) {
    return Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2));
  }

  // Physics engine governing elastic collisions
  static collide(bub1, bub2) {
    // Calculate mass for each bubble
    let m1 = Math.PI * Math.pow((bub1.radius), 2);
    let m2 = Math.PI * Math.pow((bub2.radius), 2);

    // Calculate contact angle
    let dx = bub1.pos[0] - bub2.pos[0];
    let dy = bub1.pos[1] - bub2.pos[1];
    let angle = Math.atan2(dy, dx);

    // Calculate velocity magnitudes and directional vectors
    let mag1 = this.mag(bub1.vel);
    let mag2 = this.mag(bub2.vel);
    let d1 = Math.atan2(bub1.vel[1], bub1.vel[0]);
    let d2 = Math.atan2(bub2.vel[1], bub2.vel[0]);

    // Calculate new speeds based on magnitude, direction and the collision angle
    let newX1 = mag1*Math.cos(d1 - angle);
    let newY1 = mag1*Math.sin(d1 - angle);
    let newX2 = mag2*Math.cos(d2 - angle);
    let newY2 = mag2*Math.sin(d2 - angle);

    // Adjust final speeds
    let finalX1 = ((m1 - m2)*newX1 + (m2+m2)*newX2) / (m1+m2);
    let finalX2 = ((m1 + m1)*newX1 + (m2 - m1)*newX2) / (m1+m2);
    let finalY1 = newY1;
    let finalY2 = newY2;

    let x1 = Math.cos(angle)*finalX1 + Math.cos(angle + Math.PI/2)*finalY1;
    let y1 = Math.sin(angle)*finalX1 + Math.sin(angle + Math.PI/2)*finalY1;
    let x2 = Math.cos(angle)*finalX2 + Math.cos(angle + Math.PI/2)*finalY2;
    let y2 = Math.sin(angle)*finalX2 + Math.sin(angle + Math.PI/2)*finalY2;

    bub1.bounce(x1, y1, bub2);
    bub2.bounce(x2, y2, bub1);
  }

  static scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  }

  static randomVec(length) {
    const deg = 2 * Math.PI * Math.random();
    return this.scale([Math.sin(deg), Math.cos(deg)], length);
  }

  static randomPos(radius) {
    let xPos = Math.floor(Math.random() * (window.innerWidth - 2*radius - 1)) + radius + 1;
    let yPos = Math.floor(Math.random() * (window.innerHeight - 2*radius - 1)) + radius + 1;
    return [xPos, yPos];
  }

  static pointOfContact(b1, b2) {
    let x0 = b1.pos[0];
    let y0 = b1.pos[1];

    let dx = x0 - b2.pos[0];
    let dy = y0 - b2.pos[1];



    let mag = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    let uv = [dx / mag, dy / mag];

    return [x0 - b1.radius*uv[0], y0 - b1.radius*uv[1]];
  }

  static pelletPos(pos, radius, vel) {
    let x0 = pos[0];
    let y0 = pos[1];

    let mag = this.mag(vel);
    let uv = [vel[0] / mag, vel[1] / mag];

    return [x0 + radius*uv[0], y0 + radius*uv[1]];
  }

  static changeToZero(bubble) {
    let x = bubble.vel[0];
    let y = bubble.vel[1];

    if (x === 0 && y === 0) {
      return true;
    }

    if (x > 0) {
      x = x - 0.2;
    }

    if (x < 0) {
      x = x + 0.2;
    }

    if (y > 0) {
      y = y - 0.2;
    }

    if (y < 0) {
      y = y + 0.2;
    }

    if (y > -0.2 && y < 0.2) {
      y = 0;
    }

    if (x > -0.2 && x < 0.2) {
      x = 0;
    }

    bubble.vel = [x, y];

    return false;
  }

  static glitterVel(vel) {
    let vx, vy, x, y;

    if (vel[0] === 0){
      vx = .001;
    }
    else {
      vx = vel[0];
    }

    if (vel[1] === 0){
      vy = .001;
    }
    else {
      vy = vel[1];
    }

    x = Math.random()*4*Math.sign(vx) + vel[0];
    y = Math.random()*4*Math.sign(vy) + vel[1];
    return [x,y];
  }

  static calculateGravity(obj1, obj2) {
    let m1 = Math.PI * Math.pow(obj1.radius, 2);
    let m2 = Math.PI * Math.pow(obj2.radius, 2);

    if (obj1.glitter === true){
      m2 = m2 * 50;
    }

    let dx = obj2.pos[0] - obj1.pos[0];
    let dy = obj2.pos[1] - obj1.pos[1];
    let d = this.mag([dx, dy]);

    let a = G * m2 / (d * d);

    let vx = a * dx;
    let vy = a * dy;

    return [obj1.vel[0] + vx, obj1.vel[1] + vy];
  }
}

module.exports = Physics;
