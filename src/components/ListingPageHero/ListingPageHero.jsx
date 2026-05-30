import { motion, useReducedMotion } from "framer-motion";
import { listingHeroReveal } from "../../motion/presets.js";

export default function ListingPageHero({
  wrapperClassName,
  mediaClassName,
  src,
  sizes = "100vw",
  alt,
  width,
  height,
  reduced: reducedProp,
}) {
  const reducedMotion = useReducedMotion();
  const reduced = reducedProp ?? reducedMotion;

  return (
    <motion.div
      className={wrapperClassName}
      initial="hidden"
      animate="visible"
      variants={listingHeroReveal(reduced)}
    >
      <img
        className={`page-listing__hero-media ${mediaClassName}`}
        src={src}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
    </motion.div>
  );
}
