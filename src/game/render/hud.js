import { MUTE_RECT, TOUCH_BUTTONS } from '../input.js';
import { GOAL_X, HEIGHT, PLAYER_START_X, WIDTH } from '../level.js';

const FONT = '"Avenir Next", "Helvetica Neue", Arial, sans-serif';

function text(ctx, str, x, y, size, color, weight = 'bold') {
  ctx.font = `${weight} ${size}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = color;
  ctx.fillText(str, x, y);
}

function drawMute(ctx, muted) {
  const { x, y, w, h } = MUTE_RECT;
  ctx.save();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 10);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.moveTo(x + 12, y + 22);
  ctx.lineTo(x + 22, y + 22);
  ctx.lineTo(x + 32, y + 13);
  ctx.lineTo(x + 32, y + 43);
  ctx.lineTo(x + 22, y + 34);
  ctx.lineTo(x + 12, y + 34);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 3;
  ctx.beginPath();
  if (muted) {
    ctx.moveTo(x + 37, y + 22);
    ctx.lineTo(x + 47, y + 34);
    ctx.moveTo(x + 47, y + 22);
    ctx.lineTo(x + 37, y + 34);
  } else {
    ctx.arc(x + 32, y + 28, 9, -0.9, 0.9);
    ctx.moveTo(x + 46, y + 18);
    ctx.arc(x + 32, y + 28, 16, -0.9, 0.9);
  }
  ctx.stroke();
  ctx.restore();
}

function progress(x) {
  return Math.max(
    0,
    Math.min(1, (x - PLAYER_START_X) / (GOAL_X - PLAYER_START_X)),
  );
}

export function drawHud(ctx, { luciX, boulderX, muted, input }) {
  const barX = 460;
  const barW = 1000;
  const barY = 40;
  ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
  ctx.beginPath();
  ctx.roundRect(barX - 4, barY - 6, barW + 8, 12, 6);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(barX, barY - 2, barW * progress(luciX), 4);
  ctx.fillStyle = '#9a9a9a';
  ctx.beginPath();
  ctx.arc(barX + barW * progress(boulderX), barY, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#5fd14b';
  ctx.beginPath();
  ctx.arc(barX + barW * progress(luciX), barY, 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ff4d4d';
  ctx.fillRect(barX + barW, barY - 14, 4, 20);
  ctx.fillRect(barX + barW + 4, barY - 14, 14, 9);

  drawMute(ctx, muted);
  if (input.touch) drawTouchButtons(ctx, input);
}

function drawTouchButtons(ctx, input) {
  for (const b of TOUCH_BUTTONS) {
    const held = input.isDown(b.name);
    ctx.fillStyle = held
      ? 'rgba(255, 255, 255, 0.55)'
      : 'rgba(255, 255, 255, 0.25)';
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.beginPath();
    if (b.name === 'jump') {
      ctx.moveTo(b.x, b.y - 36);
      ctx.lineTo(b.x + 34, b.y + 6);
      ctx.lineTo(b.x + 12, b.y + 6);
      ctx.lineTo(b.x + 12, b.y + 36);
      ctx.lineTo(b.x - 12, b.y + 36);
      ctx.lineTo(b.x - 12, b.y + 6);
      ctx.lineTo(b.x - 34, b.y + 6);
    } else {
      const d = b.name === 'left' ? -1 : 1;
      ctx.moveTo(b.x + d * 34, b.y);
      ctx.lineTo(b.x - d * 14, b.y - 32);
      ctx.lineTo(b.x - d * 14, b.y + 32);
    }
    ctx.closePath();
    ctx.fill();
  }
}

export function drawTitle(ctx, time, message, touch) {
  ctx.save();
  ctx.font = `900 300px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.lineJoin = 'round';
  ctx.lineWidth = 22;
  ctx.strokeStyle = '#143d10';
  ctx.strokeText('LUCI', WIDTH / 2, 330);
  const fill = ctx.createLinearGradient(0, 200, 0, 460);
  fill.addColorStop(0, '#a6ff8c');
  fill.addColorStop(1, '#3fbf2f');
  ctx.fillStyle = fill;
  ctx.fillText('LUCI', WIDTH / 2, 330);
  ctx.restore();

  if (message) text(ctx, message, WIDTH / 2, 120, 56, '#ff5c5c');

  const blink = 0.6 + 0.4 * Math.sin(time * 4);
  ctx.save();
  ctx.globalAlpha = blink;
  text(ctx, 'TOUCH TO START', WIDTH / 2, 560, 52, '#ffffff');
  ctx.restore();
  const help = touch
    ? 'Hold the arrows to run and tap the up button to jump. Outrun the boulder.'
    : 'Arrow keys or WASD to run, Space or Up to jump, M to mute. Outrun the boulder.';
  text(ctx, help, WIDTH / 2, 640, 28, 'rgba(255, 255, 255, 0.85)', 'normal');
}

export function drawEnd(ctx, message, color, time) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  text(ctx, message, WIDTH / 2, HEIGHT / 2 - 40, 140, color);
  if (time > 0.6) {
    ctx.save();
    ctx.globalAlpha = 0.6 + 0.4 * Math.sin(time * 4);
    text(ctx, 'TOUCH TO CONTINUE', WIDTH / 2, HEIGHT / 2 + 100, 44, '#ffffff');
    ctx.restore();
  }
}
