import { Audio } from './audio.js';
import { Input } from './input.js';
import { HEIGHT, WIDTH } from './level.js';

const STEP = 1 / 120;
const MAX_FRAME = 0.25;

// Owns the canvas, the fixed-step loop and the current scene. A scene is any
// object with update(dt) and render(ctx), plus optional enter() and exit().
export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.input = new Input(canvas, (x, y) => this.toLogical(x, y));
    this.audio = new Audio();
    this.input.onFirstInteraction = () => this.audio.unlock();
    this.scene = null;
    this.accumulator = 0;
    this.last = null;
    this.rafId = 0;
    this.scale = 1;

    window.addEventListener('resize', () => this.resize());
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.stop();
      else this.start();
    });
    this.resize();
  }

  resize() {
    const dpr = window.devicePixelRatio || 1;
    const fit = Math.min(
      window.innerWidth / WIDTH,
      window.innerHeight / HEIGHT,
    );
    const cssW = Math.floor(WIDTH * fit);
    const cssH = Math.floor(HEIGHT * fit);
    this.canvas.style.width = `${cssW}px`;
    this.canvas.style.height = `${cssH}px`;
    this.canvas.width = Math.round(cssW * dpr);
    this.canvas.height = Math.round(cssH * dpr);
    this.scale = this.canvas.width / WIDTH;
  }

  toLogical(clientX, clientY) {
    const r = this.canvas.getBoundingClientRect();
    return {
      x: ((clientX - r.left) / r.width) * WIDTH,
      y: ((clientY - r.top) / r.height) * HEIGHT,
    };
  }

  setScene(scene) {
    this.scene?.exit?.();
    this.scene = scene;
    this.input.endFrame();
    scene.enter?.();
  }

  start() {
    if (this.rafId) return;
    this.last = null;
    this.audio.resume();
    this.rafId = requestAnimationFrame((t) => this.frame(t));
  }

  stop() {
    cancelAnimationFrame(this.rafId);
    this.rafId = 0;
    this.audio.suspend();
  }

  frame(now) {
    this.rafId = requestAnimationFrame((t) => this.frame(t));
    if (this.last === null) this.last = now;
    this.accumulator += Math.min((now - this.last) / 1000, MAX_FRAME);
    this.last = now;

    if (this.input.consumeMute()) this.audio.toggleMute();
    while (this.accumulator >= STEP) {
      this.scene.update(STEP);
      this.accumulator -= STEP;
    }
    this.input.endFrame();

    const ctx = this.ctx;
    ctx.setTransform(this.scale, 0, 0, this.scale, 0, 0);
    this.scene.render(ctx);
  }
}
