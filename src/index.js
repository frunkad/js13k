import "./styles.css";

import {
  init,
  Sprite,
  GameLoop,
  load,
  TileEngine,
  dataAssets,
  SpriteSheet
} from "kontra";

let { canvas } = init();

load("src/m.png", "src/m2.json", "src/colored_packed.json").then((assets) => {
  let tileEngine = TileEngine(dataAssets["src/m2"]);

  // let spriteSheet = SpriteSheet(dataAssets["src/colored_packed"]);
  let hero = Sprite({
    x: 100,
    y: 100,
    height: 16,
    width: 16,
    color: "red",
    dx: 16,
    update: function () {
      this.x += this.dx;
      if (this.x > canvas.width || this.x <= 0) {
        this.dx = -this.dx;
      }
    }
  });
  tileEngine.addObject(hero);
  let loop = GameLoop({
    // create the main game loop
    update: function () {
      hero.update();
      // update the game state
    },
    render: function () {
      // render the game state
      hero.render();
      tileEngine.render();
    }
  });

  loop.start(); // start the game
});
