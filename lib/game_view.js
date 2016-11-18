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
    this.firstGame = true;
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
    document.onkeydown = this.userBubble.propel;
    document.onkeyup = this.userBubble.propel;
    if (this.firstGame) {
      this.firstGame = false;
      document.addEventListener("keydown", () => {
        if (event.which === 32) {
          let win = document.getElementById('win-display');
          let end = document.getElementById('end-display');
          let difficulty = document.getElementById('difficulty');
          this.game.resetGame();
          win.className = 'win-display gone';
          end.className = 'end-display gone';
          difficulty.className = "difficulty gone";
          this.userBubble = this.game.userBubbles[0];
          this.bindKeyHandlers();
        }
      });
    }
  }

  start() {
    this.game.addBubbles();
    this.bindKeyHandlers();
    requestAnimationFrame(this.animate.bind(this));
  }

}

module.exports = GameView;
