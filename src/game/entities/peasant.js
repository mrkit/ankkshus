import { GROUND_Y, PEASANT_COUNT, SEGMENTS } from '../level.js';

const EDGE = 40;
const FALL_TIME = 0.3;

export class Peasant {
  constructor(segment, x, speed, hue) {
    this.segment = segment;
    this.x = x;
    this.y = GROUND_Y;
    this.speed = speed;
    this.hue = hue;
    this.walkTime = Math.random() * 10;
    this.hitTime = -1;
  }

  get hit() {
    return this.hitTime >= 0;
  }

  get gone() {
    return this.hitTime >= FALL_TIME;
  }

  // Fraction of the fall completed, 0 while walking.
  get fall() {
    return this.hit ? Math.min(1, this.hitTime / FALL_TIME) : 0;
  }

  update(dt, boulder) {
    if (this.hit) {
      this.hitTime += dt;
      return;
    }
    this.x += this.speed * dt;
    this.walkTime += dt;
    const [start, end] = this.segment;
    if (this.x > end - EDGE || this.x < start + EDGE) {
      this.x = Math.max(start + EDGE, Math.min(end - EDGE, this.x));
      this.speed = -this.speed;
    }
    if (boulder.hitsPoint(this.x, this.y - 40, 20)) this.hitTime = 0;
  }
}

// Peasants are spread over the ground in proportion to segment length, and
// none start on the first 500 px so Luci is not standing in a crowd.
export function spawnPeasants() {
  const peasants = [];
  const total = SEGMENTS.reduce((sum, [a, b]) => sum + (b - a), 0);
  for (let i = 0; i < PEASANT_COUNT; i++) {
    let pick = 500 + Math.random() * (total - 500);
    let segment = SEGMENTS[SEGMENTS.length - 1];
    let x = segment[0] + EDGE;
    for (const seg of SEGMENTS) {
      const length = seg[1] - seg[0];
      if (pick <= length) {
        segment = seg;
        x = seg[0] + Math.max(EDGE, Math.min(length - EDGE, pick));
        break;
      }
      pick -= length;
    }
    const speed = 120 + Math.random() * 120;
    const hue = 200 + Math.random() * 40;
    peasants.push(new Peasant(segment, x, speed, hue));
  }
  return peasants;
}
