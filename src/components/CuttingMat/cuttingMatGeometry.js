/** Cutting-mat coordinate system and path helpers (viewBox 50×35). */

export const CUTTING_MAT_WIDTH = 50;
export const CUTTING_MAT_HEIGHT = 35;
export const CUTTING_MAT_ORIGIN = { x: 0, y: CUTTING_MAT_HEIGHT };

export const STROKE_MINOR = "#2a2a2a";
export const STROKE_MAJOR = "#454545";
export const STROKE_CHART = "#8a8a8a";
export const STROKE_CHART_LINE = "#b8b8b8";
export const CHART_OPACITY = 0.48;

export const RADIAL_ANGLES = [15, 30, 45, 60];
export const RADIAL_LENGTH = 98;
export const ARC_RADII = [10, 20, 30];

/** Global timing scale — lower = faster (0.7 ≈ 30% quicker). */
export const SPEED = 0.7;

export const TIMING = {
  frame: 0.7 * SPEED,
  gridMinor: 0.35 * SPEED,
  gridMajor: 0.4 * SPEED,
  arc: 0.85 * SPEED,
  radial: 1.15 * SPEED,
  staggerMinor: 0.006 * SPEED,
  staggerMajor: 0.04 * SPEED,
  staggerChart: 0.14 * SPEED,
};

export const START = {
  frame: 0,
  verticalMinor: 0.25 * SPEED,
  verticalMajor: 0.85 * SPEED,
  horizontalMinor: 1.35 * SPEED,
  horizontalMajor: 1.85 * SPEED,
  arcs: 2.35 * SPEED,
  radials: 2.85 * SPEED,
};

/** When the last stroke draw finishes (seconds). */
export function drawCompleteDelaySec() {
  const lastRadial =
    START.radials + (RADIAL_ANGLES.length - 1) * TIMING.staggerChart + TIMING.radial;
  const lastArc =
    START.arcs + (ARC_RADII.length - 1) * TIMING.staggerChart + TIMING.arc;
  const lastGrid =
    START.horizontalMajor + (CUTTING_MAT_HEIGHT / 5) * TIMING.staggerMajor + TIMING.gridMajor;
  return Math.max(lastRadial, lastArc, lastGrid);
}

export function linePath(x1, y1, x2, y2) {
  return `M ${x1} ${y1} L ${x2} ${y2}`;
}

export function radialPath(angleDeg, length = RADIAL_LENGTH) {
  const rad = (angleDeg * Math.PI) / 180;
  const x2 = CUTTING_MAT_ORIGIN.x + length * Math.cos(rad);
  const y2 = CUTTING_MAT_ORIGIN.y - length * Math.sin(rad);
  return linePath(CUTTING_MAT_ORIGIN.x, CUTTING_MAT_ORIGIN.y, x2, y2);
}

export function arcPath(radius) {
  return `M ${radius} ${CUTTING_MAT_HEIGHT} A ${radius} ${radius} 0 0 0 0 ${CUTTING_MAT_HEIGHT - radius}`;
}

export function arcLength(radius) {
  return (Math.PI * radius) / 2;
}
