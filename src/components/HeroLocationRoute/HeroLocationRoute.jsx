import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "../../motion/presets.js";

const ARC_PATH = "M 2 15 Q 28 3 54 15";
const ARC_VIEWBOX = "0 4 56 14";
const ARC_DRAW = {
  duration: 1.1,
  ease: EASE_OUT,
  delay: 0.35,
  repeat: Infinity,
  repeatType: "loop",
  repeatDelay: 5,
};

export default function HeroLocationRoute() {
  const reduced = useReducedMotion();

  return (
    <p className="hero__location text-style-label-medium">
      <span className="hero__location-line" aria-label="Based in Delhi to Bangalore">
        <span className="hero__location-prefix">Based in</span>
        <span className="hero__location-code">DEL</span>
        <svg
          className="hero__location-arc"
          viewBox={ARC_VIEWBOX}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {reduced ? (
            <path
              d={ARC_PATH}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          ) : (
            <motion.path
              d={ARC_PATH}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={ARC_DRAW}
            />
          )}
        </svg>
        <span className="hero__location-code">BLR</span>
      </span>
    </p>
  );
}
