import Game from './game.js';

class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  start() {
    setInterval(this.game.moveObjects, 20);
    setInterval(this.game.draw, 20);
  }
}

export default GameView;
