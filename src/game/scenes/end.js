import { drawEnd } from '../render/hud.js';
import { TitleScene } from './title.js';

// Shown over the frozen last frame of play. A tap after a short delay goes
// back to the title, which repeats the message.
export class EndScene {
  constructor(game, playScene, message, color) {
    this.game = game;
    this.playScene = playScene;
    this.message = message;
    this.color = color;
    this.time = 0;
  }

  update(dt) {
    this.time += dt;
    if (this.time > 0.6 && this.game.input.consumeAdvance()) {
      this.game.setScene(new TitleScene(this.game, this.message));
    }
  }

  render(ctx) {
    this.playScene.render(ctx);
    drawEnd(ctx, this.message, this.color, this.time);
  }
}
