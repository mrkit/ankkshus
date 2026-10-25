import { HEIGHT, WIDTH } from './level.js';

const KEYS = {
  left: ['ArrowLeft', 'a', 'A'],
  right: ['ArrowRight', 'd', 'D'],
  jump: ['ArrowUp', 'w', 'W', ' '],
};

export const TOUCH_BUTTONS = [
  { name: 'left', x: 160, y: HEIGHT - 150, r: 85 },
  { name: 'right', x: 400, y: HEIGHT - 150, r: 85 },
  { name: 'jump', x: WIDTH - 180, y: HEIGHT - 150, r: 100 },
];

export const MUTE_RECT = { x: WIDTH - 80, y: 20, w: 56, h: 56 };

// Held keys are read directly. One-shot presses (jump, advance, mute) are
// flags that the game clears at the end of each frame, so a scene only has
// to read them once.
export class Input {
  constructor(canvas, toLogical) {
    this.toLogical = toLogical;
    this.keys = { left: false, right: false, jump: false };
    this.pointers = new Map();
    this.jumpPressed = false;
    this.advancePressed = false;
    this.mutePressed = false;
    this.touch = window.matchMedia('(pointer: coarse)').matches;
    this.onFirstInteraction = null;

    window.addEventListener('keydown', (e) => this.onKey(e, true));
    window.addEventListener('keyup', (e) => this.onKey(e, false));
    canvas.addEventListener('pointerdown', (e) => this.onPointerDown(e));
    window.addEventListener('pointerup', (e) =>
      this.pointers.delete(e.pointerId),
    );
    window.addEventListener('pointercancel', (e) =>
      this.pointers.delete(e.pointerId),
    );
    window.addEventListener('blur', () => {
      this.keys = { left: false, right: false, jump: false };
      this.pointers.clear();
    });
  }

  interact() {
    if (this.onFirstInteraction) {
      this.onFirstInteraction();
      this.onFirstInteraction = null;
    }
  }

  onKey(e, down) {
    if (down && e.repeat) return;
    if (e.key === 'm' || e.key === 'M') {
      if (down) this.mutePressed = true;
      return;
    }
    let bound = false;
    for (const name of Object.keys(KEYS)) {
      if (KEYS[name].includes(e.key)) {
        this.keys[name] = down;
        bound = true;
        if (down && name === 'jump') this.jumpPressed = true;
      }
    }
    if (bound || e.key === 'ArrowDown') e.preventDefault();
    if (down && !e.metaKey && !e.ctrlKey && !e.altKey) {
      this.advancePressed = true;
      this.interact();
    }
  }

  onPointerDown(e) {
    e.preventDefault();
    this.interact();
    if (e.pointerType === 'touch') this.touch = true;
    const p = this.toLogical(e.clientX, e.clientY);
    const m = MUTE_RECT;
    if (p.x >= m.x && p.x <= m.x + m.w && p.y >= m.y && p.y <= m.y + m.h) {
      this.mutePressed = true;
      return;
    }
    this.advancePressed = true;
    if (!this.touch) return;
    for (const b of TOUCH_BUTTONS) {
      if ((p.x - b.x) ** 2 + (p.y - b.y) ** 2 <= b.r * b.r) {
        this.pointers.set(e.pointerId, b.name);
        if (b.name === 'jump') this.jumpPressed = true;
      }
    }
  }

  isDown(name) {
    if (this.keys[name]) return true;
    for (const held of this.pointers.values()) if (held === name) return true;
    return false;
  }

  get left() {
    return this.isDown('left');
  }

  get right() {
    return this.isDown('right');
  }

  consumeJump() {
    const v = this.jumpPressed;
    this.jumpPressed = false;
    return v;
  }

  consumeAdvance() {
    const v = this.advancePressed;
    this.advancePressed = false;
    return v;
  }

  consumeMute() {
    const v = this.mutePressed;
    this.mutePressed = false;
    return v;
  }

  endFrame() {
    this.jumpPressed = false;
    this.advancePressed = false;
    this.mutePressed = false;
  }
}
