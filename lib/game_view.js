const Game = require('./game.js');

const MOVES = {
  "w": [ 0, -1],
  "a": [-1,  0],
  "s": [ 0,  1],
  "d": [ 1,  0],
};

class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.start = this.start.bind(this);
    this.userBubble = this.game.userBubbles[0];
    this.lastTime = 0;
  }

  animate(curTime) {
    let delta = curTime - this.lastTime;

    this.game.draw(this.ctx);
    this.game.step(delta);
    this.lastTime = curTime;

    requestAnimationFrame(this.animate.bind(this));
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
