const Bubble = require('./bubble.js');
const UserBubble = require('./user_bubble.js');

class Game {
  constructor () {
    this.bubbles = [];
    this.userBubbles = [];
    this.addUserBubble();
    this.addBubbles();
    this.draw = this.draw.bind(this);
    this.moveObjects = this.moveObjects.bind(this);
    this.checkCollisions = this.checkCollisions.bind(this);
    this.step = this.step.bind(this);
    this.collide = this.collide.bind(this);
    this.allObjects = this.allObjects.bind(this);
  }

  allObjects() {
    let newArray = this.userBubbles.concat(this.bubbles);
    return newArray;
  }

  addBubbles() {
    for (var i = 0; i < Game.NUM_BUBBLES; i++) {
      let bubble = new Bubble();
      while(this.checkCollision(bubble)){
        bubble = new Bubble();
      }
      this.bubbles.push(bubble);
    }
  }

  addUserBubble() {
    this.userBubbles.push(new UserBubble());
  }

  checkCollision(bubble) {
    let collided = false;
    for (var i = 0; i < this.allObjects().length; i++) {
      if (this.allObjects()[i].isCollidedWith(bubble)){
        collided = true;
      }
    }
    return collided;
  }

  checkCollisions() {
    for (var i = 0; i < this.bubbles.length; i++) {
      for (var j = i + 1; j < this.bubbles.length; j++) {
        if (this.bubbles[i].isCollidedWith(this.bubbles[j])) {
          this.collide(this.bubbles[i], this.bubbles[j]);
        }
      }
    }
  }

  step() {
    this.moveObjects();
    this.checkCollisions();
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.X_COORD, Game.Y_COORD);
    this.allObjects().forEach(bubble => { bubble.draw(ctx); });
  }

  moveObjects() {
    this.allObjects().forEach(bubble => { bubble.move(); });
  }

  collide(bub1, bub2) {
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

Game.X_COORD = window.innerWidth;
Game.Y_COORD = window.innerHeight;
Game.NUM_BUBBLES = 15;

module.exports = Game;
