import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { staggerContainer, staggerItem } from "../../motion/presets.js";

const META_LABEL_CLASS = "text-style-label-small";

export default function PageHeader({
  title,
  headingId,
  lastUpdated = "00.00.0000",
  className = "",
  reduced: reducedProp,
  animate = true,
}) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const reduced = reducedProp ?? reducedMotion;
  const inView = useInView(ref, { once: true, margin: "-6% 0px -6% 0px" });
  const Root = animate ? motion.header : "header";
  const Row = animate ? motion.div : "div";
  const Title = animate ? motion.h1 : "h1";
  const Updated = animate ? motion.p : "p";

  const motionState =
    animate && (inView || reduced)
      ? { initial: "hidden", animate: "visible" }
      : animate
        ? { initial: "hidden", animate: "hidden" }
        : {};

  const rootMotion = animate
    ? {
        ref,
        variants: staggerContainer(reduced, { stagger: 0.05 }),
        ...motionState,
      }
    : { ref };

  const rowMotion = animate
    ? { variants: staggerContainer(reduced, { stagger: 0.05 }) }
    : {};
  const titleMotion = animate ? { variants: staggerItem(reduced, { y: 14 }) } : {};
  const updatedMotion = animate ? { variants: staggerItem(reduced, { y: 12 }) } : {};

  return (
    <Root
      className={`page-header${className ? ` ${className}` : ""}`}
      {...rootMotion}
    >
      <Row className="page-header__row" {...rowMotion}>
        <Title
          id={headingId}
          className="page-header__title text-style-display-large"
          {...titleMotion}
        >
          {title}
        </Title>
        <Updated
          className={`page-header__updated ${META_LABEL_CLASS}`}
          {...updatedMotion}
        >
          Last updated {lastUpdated}
        </Updated>
      </Row>
    </Root>
  );
}
