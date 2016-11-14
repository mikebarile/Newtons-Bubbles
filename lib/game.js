const Bubble = require("./bubble");
const UserBubble = require("./UserBubble");
const Util = require("./util");

class Game {
  constructor() {
    this.bubbles = [];
    this.userBubbles = [];

    this.addBubbles();
  }

  add(object) {
    if (object instanceof Bubble) {
      this.bubbles.push(object);
    } else if (object instanceof UserBubble) {
      this.userBubbles.push(object);
    } else {
      throw "invalid object";
    }
  }

  addBubbles() {
    for (let i = 0; i < Game.NUM_BUBBLES; i++) {
      this.add(new Bubble({ game: this }));
    }
  }

  addUserBubble() {
    const userBubble = new UserBubble({
      pos: this.randomPosition(),
      game: this
    });

    this.add(userBubble);

    return userBubble;
  }

  allObjects() {
    return [].concat(this.userBubbles, this.bubbles);
  }

  checkCollisions() {
    const allObjects = this.allObjects();
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 0; j < allObjects.length; j++) {
        const obj1 = allObjects[i];
        const obj2 = allObjects[j];

        if (obj1.isCollidedWith(obj2)) {
          const collision = obj1.collideWith(obj2);
          if (collision) return;
        }
      }
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach((object) => {
      object.draw(ctx);
    });
  }

  isOutOfBounds(pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  }

  moveObjects(delta) {
    this.allObjects().forEach((object) => {
      object.move(delta);
    });
  }

  randomPosition() {
    return [
      Game.DIM_X * Math.random(),
      Game.DIM_Y * Math.random()
    ];
  }

  remove(object) {
    if (object instanceof Bubble) {
      this.bubbles.splice(this.bubbles.indexOf(object), 1);
    } else if (object instanceof UserBubble) {
      this.userBubbles.splice(this.userBubbles.indexOf(object), 1);
    } else {
      throw "wtf?";
    }
  }

  step(delta) {
    this.moveObjects(delta);
    this.checkCollisions();
  }

  wrap(pos) {
    return [
      Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)
    ];
  }
}

Game.BG_COLOR = "#000000";
Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.FPS = 32;
Game.NUM_BUBBLES = 10;

module.exports = Game;
