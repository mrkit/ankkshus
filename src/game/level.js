export const WIDTH = 1920;
export const HEIGHT = 900;
export const WORLD_WIDTH = 10000;
export const GROUND_Y = 780;

export const GRAVITY = 1000;
export const RUN_SPEED = 1000;
export const JUMP_SPEED = 550;
export const BOULDER_AIR_SPEED = 500;
export const BOULDER_GROUND_SPEED = 900;
export const PEASANT_COUNT = 20;
export const PLAYER_START_X = 150;
export const GOAL_X = 9450;

// Where Luci sits on screen. The rest of the width shows what is ahead.
export const CAMERA_LEAD = 700;

// Ground segments as [start, end] in world x. The longest flat jump is
// RUN_SPEED * 2 * JUMP_SPEED / GRAVITY = 1100 px, so the gaps below
// (450, 500, 550, 600, 650, 700) are between 41% and 64% of it.
export const SEGMENTS = [
  [0, 1350],
  [1800, 2900],
  [3400, 4400],
  [4950, 5850],
  [6450, 7250],
  [7900, 8550],
  [9250, WORLD_WIDTH],
];

export function segmentAt(x) {
  return SEGMENTS.find((s) => x >= s[0] && x <= s[1]) || null;
}

export function gapAt(x) {
  for (let i = 0; i < SEGMENTS.length - 1; i++) {
    if (x > SEGMENTS[i][1] && x < SEGMENTS[i + 1][0]) {
      return [SEGMENTS[i][1], SEGMENTS[i + 1][0]];
    }
  }
  return null;
}

export function clampCamera(x) {
  return Math.max(0, Math.min(WORLD_WIDTH - WIDTH, x));
}
