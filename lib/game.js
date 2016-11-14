import Bubble from './bubble.js';

class Game {
  constructor () {
    this.bubbles = [];
    this.addBubbles();
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

Game.X_COORD = 1000;
Game.Y_COORD = 1000;
Game.NUM_BUBBLES = 15;

export default Game;
