import {
  GRAVITY,
  GROUND_Y,
  gapAt,
  HEIGHT,
  JUMP_SPEED,
  PLAYER_START_X,
  RUN_SPEED,
  segmentAt,
  WORLD_WIDTH,
} from '../level.js';

const HALF_W = 30;
const FOOT = 22;
const COYOTE = 0.08;
const JUMP_BUFFER = 0.12;

// Position is the point between Luci's feet. The hitbox is HALF_W either
// side of it and h above it.
export class Luci {
  constructor() {
    this.x = PLAYER_START_X;
    this.y = GROUND_Y;
    this.vx = 0;
    this.vy = 0;
    this.w = HALF_W * 2;
    this.h = 160;
    this.facing = 1;
    this.onGround = false;
    this.coyote = 0;
    this.jumpBuffer = 0;
    this.walkTime = 0;
  }

  get rect() {
    return { x: this.x - HALF_W, y: this.y - this.h, w: this.w, h: this.h };
  }

  supported() {
    return (
      segmentAt(this.x - FOOT) !== null || segmentAt(this.x + FOOT) !== null
    );
  }

  update(dt, input, audio) {
    const dir = (input.right ? 1 : 0) - (input.left ? 1 : 0);
    this.vx = dir * RUN_SPEED;
    if (dir) this.facing = dir;

    if (input.consumeJump()) this.jumpBuffer = JUMP_BUFFER;
    if (this.jumpBuffer > 0 && (this.onGround || this.coyote > 0)) {
      this.vy = -JUMP_SPEED;
      this.onGround = false;
      this.coyote = 0;
      this.jumpBuffer = 0;
      audio.jump();
    }
    this.jumpBuffer -= dt;
    this.coyote -= dt;

    this.x = Math.max(
      HALF_W,
      Math.min(WORLD_WIDTH - HALF_W, this.x + this.vx * dt),
    );
    this.vy += GRAVITY * dt;
    const prevY = this.y;
    this.y += this.vy * dt;

    if (
      this.supported() &&
      this.vy >= 0 &&
      this.y >= GROUND_Y &&
      prevY <= GROUND_Y + 0.5
    ) {
      this.y = GROUND_Y;
      this.vy = 0;
      this.onGround = true;
    } else {
      if (this.onGround) this.coyote = COYOTE;
      this.onGround = false;
    }

    // Below the ground line Luci is inside a gap, and the gap walls hold her.
    if (this.y > GROUND_Y + 1) {
      const gap = gapAt(this.x);
      if (gap)
        this.x = Math.max(gap[0] + HALF_W, Math.min(gap[1] - HALF_W, this.x));
    }

    if (this.onGround && this.vx !== 0) this.walkTime += dt;
  }

  get fellOut() {
    return this.y - this.h > HEIGHT;
  }

  get walkFrame() {
    return Math.floor(this.walkTime * 12) % 4;
  }
}
