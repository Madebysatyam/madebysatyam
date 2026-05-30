import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  listingHeroDefaultSrc,
  listingHeroSrcSet,
} from "../../lib/listingHeroes.js";
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
  const imgRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const shouldReveal = reduced || isLoaded;

  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [src]);

  return (
    <motion.div
      className={wrapperClassName}
      initial="hidden"
      animate={shouldReveal ? "visible" : "hidden"}
      variants={listingHeroReveal(reduced)}
    >
      <img
        ref={imgRef}
        className={`page-listing__hero-media ${mediaClassName}`}
        src={listingHeroDefaultSrc(src)}
        srcSet={listingHeroSrcSet(src)}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading="eager"
        decoding="sync"
        fetchPriority="high"
        onLoad={() => setIsLoaded(true)}
      />
    </motion.div>
  );
}
