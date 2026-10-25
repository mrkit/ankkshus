import { GOAL_X, GROUND_Y } from '../level.js';

export class Goal {
  constructor() {
    this.x = GOAL_X;
    this.y = GROUND_Y;
    this.w = 80;
    this.h = 260;
  }

  get rect() {
    return { x: this.x - this.w / 2, y: this.y - this.h, w: this.w, h: this.h };
  }

  reachedBy(rect) {
    const g = this.rect;
    return (
      rect.x < g.x + g.w &&
      rect.x + rect.w > g.x &&
      rect.y < g.y + g.h &&
      rect.y + rect.h > g.y
    );
  }
}
