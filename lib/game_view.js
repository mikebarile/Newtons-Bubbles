const Game = require('./game.js');

class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.start = this.start.bind(this);
  }

  start() {
    setInterval(() => {this.game.draw(this.ctx);}, 20);
    setInterval(this.game.moveObjects, 20);
  }
}

module.exports = GameView;
