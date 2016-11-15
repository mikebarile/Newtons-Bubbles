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
    setInterval(() => {this.game.draw(this.ctx);}, 20);
    setInterval(this.game.step, 20);
  }

}

module.exports = GameView;
