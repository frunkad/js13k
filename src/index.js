import "./styles.css";

import { init, Sprite, GameLoop, Pool, collides } from "kontra";

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
  x: 100 + (60 + 60) * 1,
  y: 400,
  color: "yellow",
  width: 60,
  height: 40,
  dx: 2
});

bricks.get({
  x: 100 + (60 + 60) * 2,
  y: 400,
  color: "yellow",
  width: 60,
  height: 40,
  dx: 2
});

bricks.get({
  x: 100 + (60 + 60) * 3,
  y: 400,
  color: "yellow",
  width: 60,
  height: 40,
  dx: 2
});

bricks.get({
  x: 100 + (60 + 60) * 4,
  y: 400,
  color: "yellow",
  width: 60,
  height: 40,
  dx: 2
});

let ball = Sprite({
  x: 300,
  y: 100,
  color: "red",
  radius: 20,
  dy: 2,
  height: 30,
  width: 30

  // render: function () {
  //   this.context.fillStyle = this.color;
  //   this.context.beginPath();
  //   this.context.arc(0, 0, this.radius, 0, 2 * Math.PI);
  //   this.context.fill();
  // }
});

let loop = GameLoop({
  // create the main game loop
  update: function () {
    // update the game state

    let reverseBall = false;
    if (collides(ball, sky)) {
      reverseBall = true;
    }

    for (let brick of bricks.objects) {
      if (brick.x > canvas.width) {
        brick.x = -brick.width;
      } else if (collides(ball, brick)) {
        reverseBall = true;
      }
    }

    if (ball.y > canvas.height || ball.y <= 0) {
      reverseBall = true;
    }

    if (reverseBall) {
      ball.dy = -ball.dy;
    }
    bricks.update();
    ball.update();
  },
  render: function () {
    // render the game state
    bricks.render();
    sky.render();
    ball.render();
  }
});

loop.start(); // start the game
