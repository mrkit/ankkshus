import { Luci } from '../entities/luci.js';
import { WIDTH } from '../level.js';
import { drawBackground } from '../render/background.js';
import { drawTitle } from '../render/hud.js';
import { drawGround, drawLuci } from '../render/sprites.js';
import { PlayScene } from './play.js';

export class TitleScene {
  constructor(game, message = null) {
    this.game = game;
    this.message = message;
    this.time = 0;
    this.luci = new Luci();
    this.luci.x = 1500;
    this.luci.onGround = true;
    this.luci.vx = 1;
  }

  update(dt) {
    this.time += dt;
    this.luci.walkTime += dt;
    if (this.game.input.consumeAdvance())
      this.game.setScene(new PlayScene(this.game));
  }

  render(ctx) {
    drawBackground(ctx, this.time * 120);
    drawGround(ctx, 0, [[0, WIDTH]]);
    drawLuci(ctx, this.luci);
    drawTitle(ctx, this.time, this.message, this.game.input.touch);
  }
}
