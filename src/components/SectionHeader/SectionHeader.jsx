import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { staggerContainer, staggerItem } from "../../motion/presets.js";

const DEFAULT_EYEBROW = "MADEBYSATYAM/";

/** Shared label styles for eyebrow + aside (tertiary meta). */
const META_LABEL_CLASS = "text-style-label-small";

export default function SectionHeader({
  eyebrow = DEFAULT_EYEBROW,
  title,
  aside,
  headingId,
  className = "",
  reduced: reducedProp,
  animate = true,
}) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const reduced = reducedProp ?? reducedMotion;
  const inView = useInView(ref, { once: true, margin: "-6% 0px -6% 0px" });
  const Root = animate ? motion.header : "header";
  const Eyebrow = animate ? motion.p : "p";
  const Row = animate ? motion.div : "div";
  const Title = animate ? motion.h2 : "h2";
  const Aside = animate ? motion.p : "p";

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

  const eyebrowMotion = animate
    ? { variants: staggerItem(reduced, { y: 10 }) }
    : {};
  const rowMotion = animate
    ? {
        variants: staggerContainer(reduced, {
          stagger: 0.05,
          delayChildren: 0.02,
        }),
      }
    : {};
  const titleMotion = animate ? { variants: staggerItem(reduced, { y: 14 }) } : {};
  const asideMotion = animate ? { variants: staggerItem(reduced, { y: 12 }) } : {};

  return (
    <Root
      className={`section-header${className ? ` ${className}` : ""}`}
      {...rootMotion}
    >
      <Eyebrow
        className={`section-header__eyebrow ${META_LABEL_CLASS}`}
        {...eyebrowMotion}
      >
        {eyebrow}
      </Eyebrow>
      <Row className="section-header__title-row" {...rowMotion}>
        <Title
          id={headingId}
          className="section-header__title text-style-display-large"
          {...titleMotion}
        >
          {title}
        </Title>
        {aside ? (
          <Aside
            className={`section-header__aside ${META_LABEL_CLASS}`}
            {...asideMotion}
          >
            {aside}
          </Aside>
        ) : null}
      </Row>
    </Root>
  );
}
