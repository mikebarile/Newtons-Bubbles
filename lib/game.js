const Bubble = require('./bubble.js');
const UserBubble = require('./user_bubble.js');
const Physics = require('./physics.js');

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
    this.allBubbles = this.allBubbles.bind(this);
  }

  allBubbles() {
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

  // Function to ensure bubbles are initialized separated from one another
  checkCollision(bubble) {
    let collided = false;
    for (var i = 0; i < this.allBubbles().length; i++) {
      if (this.allBubbles()[i].isCollidedWith(bubble)){
        collided = true;
      }
    }
    return collided;
  }

  checkCollisions() {

    this.checkUserCollision();

    for (var i = 0; i < this.bubbles.length; i++) {
      for (var j = i + 1; j < this.bubbles.length; j++) {
        if (this.bubbles[i].isCollidedWith(this.bubbles[j])) {
          Physics.collide(this.bubbles[i], this.bubbles[j]);
        }
      }
    }
  }

  checkUserCollision() {
    let user = this.userBubbles[0];

    for (var i = 0; i < this.bubbles.length; i++) {
      let bubble = this.bubbles[i];
      if (user.isCollidedWith(bubble)) {
        if (user.radius >= bubble.radius) {
          if (bubble.alive === true) {
            user.targetRadius = Physics.addMassMath(user, bubble);
            bubble.alive = false;
          }
        }
        else {
          user.alive = false;
        }
      }
    }
  }

  step(delta) {
    this.moveObjects(delta);
    this.checkCollisions();
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.X_COORD, Game.Y_COORD);
    this.allBubbles().forEach(bubble => { bubble.draw(ctx); });
  }

  moveObjects(delta) {
    this.allBubbles().forEach(bubble => { bubble.move(delta); });
  }

}

Game.X_COORD = window.innerWidth;
Game.Y_COORD = window.innerHeight;
Game.NUM_BUBBLES = 25;

module.exports = Game;
