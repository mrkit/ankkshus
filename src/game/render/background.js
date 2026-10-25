import { GROUND_Y, HEIGHT, WIDTH } from '../level.js';
import { dot } from './sprites.js';

// Hills are a sum of two sines on world x, so each parallax layer scrolls
// without a tile seam.
function drawHills(ctx, camX, parallax, base, amp, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, GROUND_Y);
  for (let sx = 0; sx <= WIDTH + 40; sx += 40) {
    const wx = sx + camX * parallax;
    const h =
      base + amp * Math.sin(wx / 420) + amp * 0.6 * Math.sin(wx / 170 + 1.3);
    ctx.lineTo(sx, GROUND_Y - h);
  }
  ctx.lineTo(WIDTH, GROUND_Y);
  ctx.closePath();
  ctx.fill();
}

const CLOUDS = [
  [120, 140, 1.0],
  [700, 90, 1.3],
  [1150, 210, 0.8],
  [1700, 120, 1.1],
  [2300, 170, 0.9],
];
const CLOUD_PERIOD = 2800;

function drawCloud(ctx, x, y, s) {
  dot(ctx, x, y, 90 * s, 36 * s);
  dot(ctx, x - 50 * s, y + 8 * s, 55 * s, 30 * s);
  dot(ctx, x + 55 * s, y + 6 * s, 60 * s, 32 * s);
  dot(ctx, x + 10 * s, y - 22 * s, 55 * s, 34 * s);
}

export function drawBackground(ctx, camX) {
  const sky = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
  sky.addColorStop(0, '#0052e7');
  sky.addColorStop(0.7, '#3d86f5');
  sky.addColorStop(1, '#a9d1ff');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  ctx.fillStyle = '#fff2a8';
  ctx.beginPath();
  ctx.arc(1600, 150, 70, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  for (const [cx, cy, s] of CLOUDS) {
    let sx = (((cx - camX * 0.3) % CLOUD_PERIOD) + CLOUD_PERIOD) % CLOUD_PERIOD;
    sx -= 300;
    drawCloud(ctx, sx, cy, s);
  }

  drawHills(ctx, camX, 0.15, 200, 60, '#2d53c9');
  drawHills(ctx, camX, 0.35, 90, 45, '#3a7f49');

  // Anything below the ground line that no segment covers is a pit.
  const pit = ctx.createLinearGradient(0, GROUND_Y, 0, HEIGHT);
  pit.addColorStop(0, '#2b1d10');
  pit.addColorStop(1, '#050302');
  ctx.fillStyle = pit;
  ctx.fillRect(0, GROUND_Y, WIDTH, HEIGHT - GROUND_Y);
}
