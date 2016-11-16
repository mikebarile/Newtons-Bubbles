const Game = require('./game.js');
const GameView = require('./game_view.js');

document.addEventListener("DOMContentLoaded", () => {
  let canvas = document.getElementById('game-canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");

  let game = new Game();
  let gv = new GameView(game, ctx);

  let pause = document.getElementById('pause');
  pause.addEventListener("click", () => {
    gv.run = !gv.run;
    if (gv.run === true) {
      gv.start();
    }
  });

  gv.start();
});
