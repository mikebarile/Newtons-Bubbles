class Physics {
  static addMassMath(user, bubble) {
    let userMass = Math.PI * Math.pow(user.radius, 2);
    let bubMass = Math.PI * Math.pow(bubble.radius, 2);

    userMass = userMass + bubMass;
    let newRadius = Math.sqrt(userMass / Math.PI);
    return newRadius;
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
    let mag1 = Math.sqrt(Math.pow(bub1.vel[0], 2) + Math.pow(bub1.vel[1], 2));
    let mag2 = Math.sqrt(Math.pow(bub2.vel[0], 2) + Math.pow(bub2.vel[1], 2));
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
    let dx = b1.pos[0] - b2.pos[0];
    let dy = b1.pos[1] - b2.pos[1];

    let d = Math.sqrt(Math.pow(dy,2) + Math.pow(dx,2));
    let a = (Math.pow(b1.radius,2) - Math.pow(b2.radius,2) + Math.pow(d, 2)) / (2.0 * d);

    let x2 = b1.pos[0] + (dx * a/d);
    let y2 = b1.pos[1] + (dx * a/d);

    let h = Math.sqrt((b1.radius * b1.radius) - (a * a));

    let rx = -dy * (h / d);
    let ry = dx * (h / d);

    let xi = x2 + rx;
    let xiPrime = x2 -rx;
    let yi = y2 + ry;
    let yiPrime = y2 - ry;

    return [xi, yi, xiPrime, yiPrime];
  }

  static pelletPos(pos, radius, vel) {
    let x0 = pos[0];
    let y0 = pos[1];

    let mag = Math.sqrt(Math.pow(vel[0], 2) + Math.pow(vel[1], 2));
    let uv = [vel[0] / mag, vel[1] / mag];

    return [x0 + radius*uv[0], y0 + radius*uv[1]];
  }
}

module.exports = Physics;
