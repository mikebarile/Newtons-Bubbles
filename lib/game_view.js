const Game = require('./game.js');

const MOVES = {
  "w": [ 0, -1],
  "a": [-1,  0],
  "s": [ 0,  1],
  "d": [ 1,  0],
  "up": [ 0, -1],
  "left": [-1,  0],
  "down": [ 0,  1],
  "right": [ 1,  0]
};

class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.game.gameView = this;
    this.ctx = ctx;
    this.start = this.start.bind(this);
    this.userBubble = this.game.userBubbles[0];
    this.lastTime = 0;
    this.run = false;
  }

  animate(curTime) {
    let delta = curTime - this.lastTime;

    if (delta > 35) {
      delta = 16.66;
    }

    this.game.draw(this.ctx);
    this.game.step(delta);
    this.lastTime = curTime;

    if(this.run === true) {
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  bindKeyHandlers() {
    const ship = this.userBubble;

    Object.keys(MOVES).forEach((k) => {
      let input = MOVES[k];
      key(k, () => { this.userBubble.propel(input); });
    });
  }

  start() {
    this.bindKeyHandlers();
    requestAnimationFrame(this.animate.bind(this));
  }

}

module.exports = GameView;
