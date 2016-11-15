const Game = require('./game.js');

class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.start = this.start.bind(this);
    this.userBubble = this.game.userBubbles[0];
  }

  bindKeyHandlers() {
    const ship = this.userBubble;

    Object.keys(GameView.MOVES).forEach((k) => {
      let move = GameView.MOVES[k];
      key(k, () => { this.userBubble.power(move); });
    });

  }

  start() {
    setInterval(() => {this.game.draw(this.ctx);}, 20);
    setInterval(this.game.step, 20);
  }

}

GameView.MOVES = {
  "w": [ 0, -1],
  "a": [-1,  0],
  "s": [ 0,  1],
  "d": [ 1,  0],
};

module.exports = GameView;
