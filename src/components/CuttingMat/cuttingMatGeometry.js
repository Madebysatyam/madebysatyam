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

/** Stroke draw — short strokes, overlapping groups, visible per-line stagger. */
export const TIMING = {
  frame: 0.32,
  gridMinor: 0.18,
  gridMajor: 0.22,
  arc: 0.38,
  radial: 0.42,
  staggerMinor: 0.014,
  staggerMajor: 0.055,
  staggerChart: 0.09,
};

export const START = {
  frame: 0,
  verticalMinor: 0.06,
  verticalMajor: 0.1,
  horizontalMinor: 0.28,
  horizontalMajor: 0.34,
  arcs: 0.62,
  radials: 0.78,
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
