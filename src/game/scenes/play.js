import { Boulder } from '../entities/boulder.js';
import { Goal } from '../entities/goal.js';
import { Luci } from '../entities/luci.js';
import { spawnPeasants } from '../entities/peasant.js';
import { CAMERA_LEAD, clampCamera, WIDTH } from '../level.js';
import { drawBackground } from '../render/background.js';
import { drawHud } from '../render/hud.js';
import {
  drawBoulder,
  drawGoal,
  drawGround,
  drawLuci,
  drawPeasant,
} from '../render/sprites.js';
import { EndScene } from './end.js';

export class PlayScene {
  constructor(game) {
    this.game = game;
    this.luci = new Luci();
    this.boulder = new Boulder();
    this.goal = new Goal();
    this.peasants = spawnPeasants();
    this.time = 0;
    this.camX = 0;
  }

  enter() {
    this.game.audio.startMusic();
  }

  exit() {
    this.game.audio.stopMusic();
  }

  update(dt) {
    const { input, audio } = this.game;
    this.time += dt;
    this.luci.update(dt, input, audio);
    this.boulder.update(dt);
    for (const p of this.peasants) p.update(dt, this.boulder);
    this.peasants = this.peasants.filter((p) => !p.gone);
    this.camX = clampCamera(this.luci.x - CAMERA_LEAD);

    if (this.goal.reachedBy(this.luci.rect)) {
      audio.win();
      this.game.setScene(new EndScene(this.game, this, 'YOU WON!', '#7CFC00'));
    } else if (this.boulder.hitsRect(this.luci.rect) || this.luci.fellOut) {
      audio.die();
      this.game.setScene(new EndScene(this.game, this, 'You Died', '#ff4d4d'));
    }
  }

  render(ctx) {
    drawBackground(ctx, this.camX);
    drawGround(ctx, this.camX);
    ctx.save();
    ctx.translate(-this.camX, 0);
    drawGoal(ctx, this.goal, this.time);
    for (const p of this.peasants) {
      if (p.x > this.camX - 100 && p.x < this.camX + WIDTH + 100)
        drawPeasant(ctx, p);
    }
    drawLuci(ctx, this.luci);
    drawBoulder(ctx, this.boulder);
    ctx.restore();
    drawHud(ctx, {
      luciX: this.luci.x,
      boulderX: this.boulder.x,
      muted: this.game.audio.muted,
      input: this.game.input,
    });
  }
}
