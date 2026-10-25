import {
  BOULDER_AIR_SPEED,
  BOULDER_GROUND_SPEED,
  GRAVITY,
  GROUND_Y,
} from '../level.js';

export const BOULDER_RADIUS = 130;

// Spawns off screen to the left, falls for about a second, then rolls along
// the ground line. It never falls into a gap, so it stays a threat for the
// whole level.
export class Boulder {
  constructor() {
    this.r = BOULDER_RADIUS;
    this.x = -700;
    this.y = GROUND_Y - this.r - 450;
    this.vy = 0;
    this.onGround = false;
    this.angle = 0;
  }

  update(dt) {
    const vx = this.onGround ? BOULDER_GROUND_SPEED : BOULDER_AIR_SPEED;
    this.x += vx * dt;
    if (!this.onGround) {
      this.vy += GRAVITY * dt;
      this.y += this.vy * dt;
      if (this.y >= GROUND_Y - this.r) {
        this.y = GROUND_Y - this.r;
        this.onGround = true;
      }
    }
    this.angle += (vx / this.r) * dt;
  }

  hitsRect(rect) {
    const cx = Math.max(rect.x, Math.min(rect.x + rect.w, this.x));
    const cy = Math.max(rect.y, Math.min(rect.y + rect.h, this.y));
    return (cx - this.x) ** 2 + (cy - this.y) ** 2 <= this.r * this.r;
  }

  hitsPoint(x, y, pad) {
    return (x - this.x) ** 2 + (y - this.y) ** 2 <= (this.r + pad) ** 2;
  }
}
