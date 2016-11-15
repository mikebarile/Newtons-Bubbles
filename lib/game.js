const Bubble = require('./bubble.js');

class Game {
  constructor () {
    this.bubbles = [];
    this.addBubbles();
    this.draw = this.draw.bind(this);
    this.moveObjects = this.moveObjects.bind(this);
    this.checkCollisions = this.checkCollisions.bind(this);
    this.step = this.step.bind(this);
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

  checkCollision(bubble) {
    let collided = false;
    for (var i = 0; i < this.bubbles.length; i++) {
      if (this.bubbles[i].isCollidedWith(bubble)){
        collided = true;
      }
    }
    return collided;
  }

  checkCollisions() {
    for (var i = 0; i < this.bubbles.length; i++) {
      for (var j = i + 1; j < this.bubbles.length; j++) {
        if (this.bubbles[i].isCollidedWith(this.bubbles[j])) {
          console.log("COLLISION");
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
    this.bubbles.forEach(bubble => { bubble.draw(ctx); });
  }

  moveObjects() {
    this.bubbles.forEach(bubble => { bubble.move(); });
  }

}

Game.X_COORD = window.innerWidth;
Game.Y_COORD = window.innerHeight;
Game.NUM_BUBBLES = 15;

module.exports = Game;
