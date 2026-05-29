import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useOutletContext } from "react-router-dom";
import { staggerContainer, staggerItem } from "../motion/presets.js";
import PageHeader from "../components/PageHeader";
import PlaygroundTile, { PLAYGROUND_TILES_PAGE } from "../components/PlaygroundTile";

export default function PlaygroundPage() {
  const { reduced } = useOutletContext();
  const playgroundListRef = useRef(null);
  const playgroundInView = useInView(playgroundListRef, { once: true, margin: "-8% 0px" });

  return (
    <main id="main" className="page-listing page-listing--with-hero">
      <div
        className="page-listing__hero-media"
        role="img"
        aria-label="Playground page hero image placeholder"
      />
      <section
        className="container-site page-listing__body"
        aria-labelledby="playground-page-heading"
      >
        <PageHeader
          title="Playground"
          headingId="playground-page-heading"
          reduced={reduced}
        />
        <motion.ul
          ref={playgroundListRef}
          className="playground-list grid-12"
          initial="hidden"
          animate={playgroundInView || reduced ? "visible" : "hidden"}
          variants={staggerContainer(reduced, { stagger: 0.06, delayChildren: 0.04 })}
        >
          {PLAYGROUND_TILES_PAGE.map((tile) => (
            <motion.li
              key={tile.id}
              className="playground-list__item"
              variants={staggerItem(reduced, { y: 12 })}
            >
              <PlaygroundTile {...tile} />
            </motion.li>
          ))}
        </motion.ul>
      </section>
    </main>
  );
}
