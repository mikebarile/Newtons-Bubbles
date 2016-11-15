const Bubble = require('./bubble.js');

class Game {
  constructor () {
    this.bubbles = [];
    this.addBubbles();
    this.draw = this.draw.bind(this);
    this.moveObjects = this.moveObjects.bind(this);
  }

  addBubbles() {
    for (var i = 0; i < Game.NUM_BUBBLES; i++) {
      this.bubbles.push(new Bubble(this.randomPos()));
    }
  }

  randomPos() {
    let xPos = Math.floor(Math.random() * Game.X_COORD) + 1;
    let yPos = Math.floor(Math.random() * Game.Y_COORD) + 1;
    return [xPos, yPos];
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
