import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  ARC_RADII,
  CUTTING_MAT_HEIGHT,
  CUTTING_MAT_WIDTH,
  CHART_OPACITY,
  RADIAL_ANGLES,
  RADIAL_LENGTH,
  START,
  STROKE_CHART,
  STROKE_CHART_LINE,
  STROKE_MAJOR,
  STROKE_MINOR,
  TIMING,
  arcLength,
  arcPath,
  drawCompleteDelaySec,
  linePath,
  radialPath,
} from "./cuttingMatGeometry.js";

function GridStroke({ reduced, d, stroke, strokeWidth, delay, duration, tier }) {
  const style = reduced
    ? undefined
    : {
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      };

  const className = reduced
    ? `cutting-mat__stroke--${tier}`
    : `cutting-mat__stroke cutting-mat__stroke--${tier}`;

  return (
    <path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      className={className}
      style={style}
    />
  );
}

function ChartStroke({ reduced, d, kind, delay, duration, strokeLength }) {
  const style = reduced
    ? undefined
    : {
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        "--cutting-mat-stroke-length": String(strokeLength),
      };

  const className = reduced
    ? "cutting-mat__stroke--chart cutting-mat__stroke--dashed"
    : `cutting-mat__stroke cutting-mat__stroke--chart cutting-mat__stroke--dashed cutting-mat__stroke--${kind}`;

  return (
    <path
      d={d}
      fill="none"
      stroke={STROKE_CHART_LINE}
      strokeWidth={kind === "arc" ? 0.07 : 0.05}
      strokeOpacity={CHART_OPACITY}
      strokeLinecap="round"
      strokeDasharray={reduced ? "0.32 0.42" : undefined}
      className={className}
      style={style}
    />
  );
}

/**
 * Animated self-healing cutting mat (grid, arcs, radials).
 * Stroke-draw via CSS; fill and stroke colours shift to teal when complete.
 */
export default function CuttingMat({
  onDrawComplete,
  className = "",
  preserveAspectRatio = "xMidYMid slice",
}) {
  const reduced = useReducedMotion();
  const [isDrawComplete, setIsDrawComplete] = useState(reduced);
  const onDrawCompleteRef = useRef(onDrawComplete);
  const hasCompletedRef = useRef(reduced);

  onDrawCompleteRef.current = onDrawComplete;

  useEffect(() => {
    const markComplete = () => {
      if (hasCompletedRef.current) {
        return;
      }

      hasCompletedRef.current = true;
      setIsDrawComplete(true);
      onDrawCompleteRef.current?.();
    };

    if (reduced) {
      markComplete();
      return undefined;
    }

    const timeoutMs = drawCompleteDelaySec() * 1000 + 50;
    const id = window.setTimeout(markComplete, timeoutMs);

    return () => window.clearTimeout(id);
  }, [reduced]);

  const rootClass = [
    "cutting-mat",
    isDrawComplete ? "is-draw-complete" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <svg
      className={rootClass}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${CUTTING_MAT_WIDTH} ${CUTTING_MAT_HEIGHT}`}
      preserveAspectRatio={preserveAspectRatio}
      aria-hidden="true"
    >
      <rect
        className="cutting-mat__fill-base"
        width={CUTTING_MAT_WIDTH}
        height={CUTTING_MAT_HEIGHT}
      />
      <rect
        className="cutting-mat__fill-teal"
        width={CUTTING_MAT_WIDTH}
        height={CUTTING_MAT_HEIGHT}
      />

      <g fill="none" strokeLinecap="square">
        <GridStroke
          reduced={reduced}
          tier="frame"
          d={`M 0 0 H ${CUTTING_MAT_WIDTH} V ${CUTTING_MAT_HEIGHT} H 0 Z`}
          stroke={STROKE_CHART}
          strokeWidth={0.08}
          delay={START.frame}
          duration={TIMING.frame}
        />

        {Array.from({ length: CUTTING_MAT_WIDTH + 1 }, (_, x) => {
          if (x % 5 === 0) return null;
          return (
            <GridStroke
              key={`v-minor-${x}`}
              reduced={reduced}
              tier="minor"
              d={linePath(x, 0, x, CUTTING_MAT_HEIGHT)}
              stroke={STROKE_MINOR}
              strokeWidth={0.03}
              delay={START.verticalMinor + x * TIMING.staggerMinor}
              duration={TIMING.gridMinor}
            />
          );
        })}

        {Array.from({ length: CUTTING_MAT_WIDTH + 1 }, (_, x) => {
          if (x % 5 !== 0) return null;
          return (
            <GridStroke
              key={`v-major-${x}`}
              reduced={reduced}
              tier="major"
              d={linePath(x, 0, x, CUTTING_MAT_HEIGHT)}
              stroke={STROKE_MAJOR}
              strokeWidth={0.06}
              delay={START.verticalMajor + (x / 5) * TIMING.staggerMajor}
              duration={TIMING.gridMajor}
            />
          );
        })}

        {Array.from({ length: CUTTING_MAT_HEIGHT + 1 }, (_, y) => {
          if (y % 5 === 0) return null;
          return (
            <GridStroke
              key={`h-minor-${y}`}
              reduced={reduced}
              tier="minor"
              d={linePath(0, y, CUTTING_MAT_WIDTH, y)}
              stroke={STROKE_MINOR}
              strokeWidth={0.03}
              delay={START.horizontalMinor + y * TIMING.staggerMinor}
              duration={TIMING.gridMinor}
            />
          );
        })}

        {Array.from({ length: CUTTING_MAT_HEIGHT + 1 }, (_, y) => {
          if (y % 5 !== 0) return null;
          return (
            <GridStroke
              key={`h-major-${y}`}
              reduced={reduced}
              tier="major"
              d={linePath(0, y, CUTTING_MAT_WIDTH, y)}
              stroke={STROKE_MAJOR}
              strokeWidth={0.06}
              delay={START.horizontalMajor + (y / 5) * TIMING.staggerMajor}
              duration={TIMING.gridMajor}
            />
          );
        })}

        <g className="cutting-mat__chart">
          {ARC_RADII.map((radius, index) => (
            <ChartStroke
              key={`arc-${radius}`}
              reduced={reduced}
              d={arcPath(radius)}
              kind="arc"
              delay={START.arcs + index * TIMING.staggerChart}
              duration={TIMING.arc}
              strokeLength={arcLength(radius) + 2}
            />
          ))}

          {RADIAL_ANGLES.map((angle, index) => (
            <ChartStroke
              key={`radial-${angle}`}
              reduced={reduced}
              d={radialPath(angle)}
              kind="radial"
              delay={START.radials + index * TIMING.staggerChart}
              duration={TIMING.radial}
              strokeLength={RADIAL_LENGTH + 4}
            />
          ))}
        </g>
      </g>
    </svg>
  );
}
