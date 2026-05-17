import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { fadeUp } from "../motion/presets.js";

export default function Reveal({
  as: Component = motion.div,
  children,
  className,
  delay = 0,
  y = 20,
  margin = "-6% 0px -6% 0px",
  once = true,
  ...rest
}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once, margin });

  return (
    <Component
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView || reduced ? "visible" : "hidden"}
      variants={fadeUp(reduced, { y, delay })}
      {...rest}
    >
      {children}
    </Component>
  );
}
