/** Parametric blob paths — same vertex count for smooth morph (reference: quatrefoil, star, sunburst). */

const POINTS = 64;

export const ROLE_SHAPE_PARAMS = {
  /* Rounded four-point star */
  cooking: {
    base: 0.78,
    a2: 0.06,
    a4: 0.3,
    a5: 0,
    a6: 0.04,
  },
  /* Four-lobed clover */
  crafting: {
    base: 0.68,
    a2: 0.36,
    a4: 0.02,
    a5: 0,
    a6: 0,
  },
  /* Scalloped sunburst */
  exploring: {
    base: 0.72,
    a2: 0.02,
    a4: 0.04,
    a5: 0.16,
    a6: 0.36,
  },
};

function radiusAt(theta, { base, a2, a4, a5, a6 }) {
  const c2 = Math.cos(2 * theta);
  const c4 = Math.cos(4 * theta);
  const c5 = Math.cos(5 * theta);
  const c6 = Math.cos(6 * theta);

  return (
    base *
    (1 +
      a2 * c2 * c2 +
      a4 * c4 * c4 +
      a5 * c5 +
      a6 * c6 * c6)
  );
}

export function buildRolePath(params, { cx = 50, cy = 50, scale = 42 } = {}) {
  const coords = [];

  for (let i = 0; i < POINTS; i += 1) {
    const theta = (i / POINTS) * Math.PI * 2 - Math.PI / 2;
    const r = scale * radiusAt(theta, params);
    coords.push([cx + r * Math.cos(theta), cy + r * Math.sin(theta)]);
  }

  const [first, ...rest] = coords;
  const lines = rest.map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`).join(" L ");

  return `M ${first[0].toFixed(2)} ${first[1].toFixed(2)} L ${lines} Z`;
}
