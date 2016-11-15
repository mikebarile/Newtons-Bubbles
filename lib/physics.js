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

    bub1.bounce(x1, y1);
    bub2.bounce(x2, y2);
  }
}

module.exports = Physics;
