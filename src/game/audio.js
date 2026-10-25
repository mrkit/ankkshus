// MIDI note numbers. A zero is a rest. The bass plays one note for every
// two melody notes.
const MELODY = [72, 76, 79, 76, 81, 79, 76, 72, 74, 77, 81, 77, 79, 76, 74, 0];
const BASS = [48, 48, 45, 45, 41, 41, 43, 43];
const BEAT = 0.17;

const midi = (n) => 440 * 2 ** ((n - 69) / 12);

// Everything here is silent until unlock() runs from a user gesture,
// because browsers refuse to start an AudioContext before one.
export class Audio {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.muted = false;
    this.wantMusic = false;
    this.musicTimer = 0;
    this.nextTime = 0;
    this.step = 0;
  }

  unlock() {
    if (this.ctx) return;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    this.ctx = new Ctx();
    this.master = this.ctx.createGain();
    this.master.gain.value = this.muted ? 0 : 0.5;
    this.master.connect(this.ctx.destination);
    if (this.wantMusic) this.startMusic();
  }

  suspend() {
    this.ctx?.suspend();
  }

  resume() {
    this.ctx?.resume();
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.master) this.master.gain.value = this.muted ? 0 : 0.5;
  }

  tone(freq, start, dur, type, gain, endFreq = freq) {
    const osc = this.ctx.createOscillator();
    const env = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, start);
    osc.frequency.exponentialRampToValueAtTime(endFreq, start + dur);
    env.gain.setValueAtTime(gain, start);
    env.gain.exponentialRampToValueAtTime(0.001, start + dur);
    osc.connect(env).connect(this.master);
    osc.start(start);
    osc.stop(start + dur + 0.02);
  }

  startMusic() {
    this.wantMusic = true;
    if (!this.ctx || this.musicTimer) return;
    this.nextTime = this.ctx.currentTime + 0.05;
    this.step = 0;
    this.scheduleMusic();
    this.musicTimer = setInterval(() => this.scheduleMusic(), 100);
  }

  stopMusic() {
    this.wantMusic = false;
    clearInterval(this.musicTimer);
    this.musicTimer = 0;
  }

  scheduleMusic() {
    while (this.nextTime < this.ctx.currentTime + 0.3) {
      const m = MELODY[this.step % MELODY.length];
      if (m) this.tone(midi(m), this.nextTime, BEAT * 0.9, 'square', 0.12);
      if (this.step % 2 === 0) {
        const b = BASS[(this.step / 2) % BASS.length];
        this.tone(midi(b), this.nextTime, BEAT * 1.8, 'triangle', 0.25);
      }
      this.nextTime += BEAT;
      this.step++;
    }
  }

  jump() {
    if (!this.ctx) return;
    this.tone(500, this.ctx.currentTime, 0.12, 'square', 0.15, 900);
  }

  die() {
    if (!this.ctx) return;
    this.tone(400, this.ctx.currentTime, 0.5, 'sawtooth', 0.25, 60);
  }

  win() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    [72, 76, 79, 84].forEach((n, i) => {
      this.tone(midi(n), t + i * 0.12, 0.25, 'square', 0.15);
    });
  }
}
