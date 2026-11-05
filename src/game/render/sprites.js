import { GROUND_Y, HEIGHT, SEGMENTS, WIDTH } from '../level.js';

const LUCI_GREEN = '#5fd14b';
const LUCI_DARK = '#3b9a2e';
const LUCI_LIGHT = '#8ff07a';

export function dot(ctx, x, y, rx, ry) {
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();
}

function limb(ctx, x1, y1, x2, y2, width, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

// Leg swing per walk frame: [back leg x, front leg x] at the foot.
const WALK = [
  [-22, 22],
  [-6, 6],
  [22, -22],
  [6, -6],
];

export function drawLuci(ctx, luci) {
  ctx.save();
  ctx.translate(luci.x, luci.y);
  ctx.scale(luci.facing, 1);

  let legs = [0, 0];
  let armBack = [-38, -60];
  let armFront = [38, -60];
  if (!luci.onGround) {
    legs = [-26, 18];
    armBack = [-44, -125];
    armFront = [44, -125];
  } else if (luci.vx !== 0) {
    legs = WALK[luci.walkFrame];
    armBack = [-38 - legs[1], -62];
    armFront = [38 - legs[0], -62];
  }
  const legLift = luci.onGround ? 0 : 18;
  limb(ctx, -12, -58, legs[0] - 12, -legLift, 14, LUCI_DARK);
  limb(ctx, 12, -58, legs[1] + 12, -legLift, 14, LUCI_GREEN);

  limb(ctx, -22, -98, armBack[0], armBack[1], 11, LUCI_DARK);

  ctx.fillStyle = LUCI_GREEN;
  ctx.beginPath();
  ctx.roundRect(-26, -112, 52, 62, 18);
  ctx.fill();

  limb(ctx, 22, -98, armFront[0], armFront[1], 11, LUCI_GREEN);

  limb(ctx, -16, -176, -28, -204, 5, LUCI_DARK);
  limb(ctx, 16, -176, 28, -204, 5, LUCI_DARK);
  ctx.fillStyle = LUCI_LIGHT;
  dot(ctx, -28, -206, 7, 7);
  dot(ctx, 28, -206, 7, 7);

  const head = ctx.createRadialGradient(-12, -152, 8, 0, -140, 56);
  head.addColorStop(0, LUCI_LIGHT);
  head.addColorStop(1, LUCI_GREEN);
  ctx.fillStyle = head;
  ctx.beginPath();
  ctx.ellipse(0, -140, 50, 44, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#10241a';
  dot(ctx, -17, -146, 10, 15);
  dot(ctx, 19, -146, 10, 15);
  ctx.fillStyle = '#ffffff';
  dot(ctx, -14, -151, 3.5, 3.5);
  dot(ctx, 22, -151, 3.5, 3.5);

  ctx.strokeStyle = LUCI_DARK;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(2, -122, 10, 0.2, Math.PI - 0.2);
  ctx.stroke();
  ctx.restore();
}

export function drawPeasant(ctx, p) {
  ctx.save();
  ctx.translate(p.x, p.y);
  if (p.hit) {
    ctx.globalAlpha = 1 - p.fall;
    ctx.rotate((Math.PI / 2) * p.fall * (p.speed >= 0 ? 1 : -1));
  }
  const dir = p.speed >= 0 ? 1 : -1;
  ctx.scale(dir, 1);
  const body = `hsl(${p.hue} 65% 45%)`;
  const dark = `hsl(${p.hue} 65% 30%)`;
  const swing = p.hit ? 0 : Math.sin(p.walkTime * 11) * 12;
  limb(ctx, -6, -34, -6 + swing, 0, 8, dark);
  limb(ctx, 6, -34, 6 - swing, 0, 8, body);
  ctx.fillStyle = body;
  ctx.beginPath();
  ctx.roundRect(-16, -68, 32, 40, 8);
  ctx.fill();
  ctx.fillStyle = '#f3c98f';
  ctx.beginPath();
  ctx.arc(0, -82, 15, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = dark;
  ctx.beginPath();
  ctx.arc(0, -86, 15, Math.PI, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#222';
  ctx.beginPath();
  ctx.arc(6, -82, 2.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

// The sun rolls in from the left. Rays turn with it so the roll reads.
export function drawSun(ctx, b) {
  ctx.save();
  ctx.translate(b.x, b.y);

  const glow = ctx.createRadialGradient(0, 0, b.r * 0.8, 0, 0, b.r * 1.9);
  glow.addColorStop(0, 'rgba(255, 196, 61, 0.45)');
  glow.addColorStop(1, 'rgba(255, 196, 61, 0)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(0, 0, b.r * 1.9, 0, Math.PI * 2);
  ctx.fill();

  ctx.rotate(b.angle);
  ctx.fillStyle = '#ffb02e';
  const rays = 12;
  for (let i = 0; i < rays; i++) {
    const a = (i / rays) * Math.PI * 2;
    const half = Math.PI / rays / 1.6;
    const tip = b.r * (i % 2 ? 1.38 : 1.55);
    ctx.beginPath();
    ctx.moveTo(
      Math.cos(a - half) * b.r * 0.92,
      Math.sin(a - half) * b.r * 0.92,
    );
    ctx.lineTo(Math.cos(a) * tip, Math.sin(a) * tip);
    ctx.lineTo(
      Math.cos(a + half) * b.r * 0.92,
      Math.sin(a + half) * b.r * 0.92,
    );
    ctx.closePath();
    ctx.fill();
  }

  const face = ctx.createRadialGradient(
    -b.r * 0.3,
    -b.r * 0.3,
    b.r * 0.1,
    0,
    0,
    b.r,
  );
  face.addColorStop(0, '#fff3a8');
  face.addColorStop(0.55, '#ffd23f');
  face.addColorStop(1, '#f59a1b');
  ctx.fillStyle = face;
  ctx.beginPath();
  ctx.arc(0, 0, b.r, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#e07b0c';
  ctx.lineWidth = 6;
  ctx.stroke();
  ctx.restore();
}

export function drawGround(ctx, camX, segments = SEGMENTS) {
  for (const [start, end] of segments) {
    if (end < camX || start > camX + WIDTH) continue;
    const x = start - camX;
    const w = end - start;
    ctx.fillStyle = '#6b4a2b';
    ctx.fillRect(x, GROUND_Y, w, HEIGHT - GROUND_Y);
    ctx.fillStyle = '#4a3119';
    ctx.fillRect(x, GROUND_Y + 60, w, HEIGHT - GROUND_Y - 60);
    ctx.fillStyle = '#4caf3f';
    ctx.fillRect(x, GROUND_Y, w, 18);
    ctx.fillStyle = '#2f8a2a';
    ctx.fillRect(x, GROUND_Y + 18, w, 6);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    for (let px = start - (start % 160) + 80; px < end; px += 160) {
      ctx.beginPath();
      ctx.ellipse(px - camX, GROUND_Y + 42, 10, 6, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

export function drawGoal(ctx, goal, time) {
  ctx.save();
  ctx.translate(goal.x, goal.y);
  const glow = ctx.createRadialGradient(0, -60, 10, 0, -60, 150);
  glow.addColorStop(0, 'rgba(255, 240, 120, 0.55)');
  glow.addColorStop(1, 'rgba(255, 240, 120, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(-150, -210, 300, 210);
  ctx.fillStyle = '#e8e8e8';
  ctx.fillRect(-5, -goal.h, 10, goal.h);
  ctx.beginPath();
  ctx.arc(0, -goal.h, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ff4d4d';
  ctx.beginPath();
  ctx.moveTo(5, -goal.h + 10);
  for (let i = 0; i <= 8; i++) {
    const fx = 5 + i * 14;
    ctx.lineTo(fx, -goal.h + 10 + Math.sin(time * 8 + i * 0.7) * 6 * (i / 8));
  }
  for (let i = 8; i >= 0; i--) {
    const fx = 5 + i * 14;
    ctx.lineTo(
      fx,
      -goal.h + 80 + Math.sin(time * 8 + i * 0.7 + 0.5) * 6 * (i / 8),
    );
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}
