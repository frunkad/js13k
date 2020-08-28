import "./styles.css";

import { init, Sprite, GameLoop, Pool } from "kontra";

let { canvas } = init();

let sky = Sprite({
  x: 20,
  y: 40,
  height: 40,
  width: 600 - 20 * 2,
  color: "white"
});

let bricks = Pool({
  create: Sprite
});

bricks.get({
  x: 100,
  y: 400,
  color: "yellow",
  width: 60,
  height: 40,
  dx: 2
});

bricks.get({
  x: 260,
  y: 400,
  color: "yellow",
  width: 60,
  height: 40,
  dx: 2
});

let loop = GameLoop({
  // create the main game loop
  update: function () {
    // update the game state
    bricks.update();

    // wrap the sprites position when it reaches
    // the edge of the screen
    for (let brick of bricks.objects) {
      if (brick.x > canvas.width) {
        brick.x = -brick.width;
      }
    }
  },
  render: function () {
    // render the game state
    bricks.render();
    sky.render();
  }
});

loop.start(); // start the game
