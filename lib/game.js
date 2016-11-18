const Bubble = require('./bubble.js');
const UserBubble = require('./user_bubble.js');
const Physics = require('./physics.js');
const Color = require('./color.js');

class Game {
  constructor () {
    this.bubbles = [];
    this.userBubbles = [];
    this.glitter = [];
    this.pellets = [];
    this.difficulty = 3;
    this.gameOver = false;
    this.addUserBubble();
    this.addBubbles();
    this.draw = this.draw.bind(this);
    this.moveObjects = this.moveObjects.bind(this);
    this.checkCollisions = this.checkCollisions.bind(this);
    this.step = this.step.bind(this);
    this.allBubbles = this.allBubbles.bind(this);
    this.checkRadius = this.checkRadius.bind(this);
    this.applyGravity = this.applyGravity.bind(this);
    this.checkEnd = this.checkEnd.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.checkBox = this.checkBox.bind(this);
    this.checkWin = this.checkWin.bind(this);
  }

  allBubbles() {
    let newArray = this.userBubbles.concat(this.bubbles).concat(this.glitter).concat(this.pellets);
    return newArray;
  }

  addBubbles() {
    for (var i = 0; i < Game.NUM_BUBBLES; i++) {
      let bubble = new Bubble(this, i);
      while(this.checkCollision(bubble) || this.checkBox(bubble)){
        bubble = new Bubble(this, i);
      }
      this.bubbles.push(bubble);
    }
  }

  checkBox(bubble) {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let x = bubble.pos[0];
    let y = bubble.pos[1];
    return (
      (x > width/2 - 300 && x < width/2 + 300) &&
      (y > height/2 - 300 && y < height/2 + 300)
    );
  }

  addUserBubble() {
    this.userBubbles.push(new UserBubble(this));
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
            user.absorbBubble(bubble);
          }
        }
        else {
          user.createGlitter(bubble);
          user.alive = false;
        }
      }
    }
  }

  checkRadius() {
    this.bubbles = this.bubbles.filter(obj => {
      return obj.radius > 1;
    });

    this.glitter = this.glitter.filter(obj => {
      return obj.radius > 0.005;
    });

    this.pellets = this.pellets.filter(obj => {
      return obj.radius > 0.005;
    });
  }

  applyGravity() {
    this.bubbles.forEach(bubble => {
      this.allBubbles().forEach(obj => {
        if (bubble.pos[0] !== obj.pos[0] && bubble.pos[1] !== obj.pos[1]) {
          obj.vel = Physics.calculateGravity(obj, bubble);
        }
      });
    });
    this.userBubbles.forEach(bubble => {
      this.allBubbles().forEach(obj => {
        if (bubble.pos[0] !== obj.pos[0] && bubble.pos[1] !== obj.pos[1]) {
          obj.vel = Physics.calculateGravity(obj, bubble);
        }
      });
    });
  }

  step(delta) {
    this.moveObjects(delta);
    this.checkCollisions();
    this.checkRadius();
    this.applyGravity();
    this.userBubbles[0].setRandomColor();
    this.userBubbles[0].moveUserBubble();
    this.checkEnd();
    this.checkWin();
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.X_COORD, Game.Y_COORD);
    this.allBubbles().forEach(bubble => { bubble.draw(ctx); });
  }

  moveObjects(delta) {
    this.allBubbles().forEach(bubble => { bubble.move(delta); });
  }

  resetGame() {
    this.bubbles = [];
    this.userBubbles = [];
    this.glitter = [];
    this.pellets = [];
    this.addUserBubble();
    this.addBubbles();
    this.gameOver = false;
  }

  checkEnd() {
    if(!this.userBubbles[0].alive && !this.gameOver) {
      this.gameOver = true;
      let end = document.getElementById('end-display');
      end.className = 'end-display';
    }
  }

  checkWin() {
    if(this.userBubbles[0].alive && this.bubbles.length === 0 && !this.gameOver) {
      this.gameOver = true;
      this.userBubbles[0].won = true;
      let win = document.getElementById('win-display');
      win.className = 'win-display';
    }
  }
}

Game.X_COORD = window.innerWidth;
Game.Y_COORD = window.innerHeight;
Game.NUM_BUBBLES = 25;

module.exports = Game;
