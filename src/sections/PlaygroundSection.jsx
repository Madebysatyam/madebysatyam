import { motion } from "framer-motion";
import PlaygroundTile, { PLAYGROUND_TILES } from "../components/PlaygroundTile";
import SeeAllButton from "../components/SeeAllButton";
import Reveal from "../components/Reveal.jsx";
import SectionHeader from "../components/SectionHeader";
import { staggerContainer, staggerItem } from "../motion/presets.js";

export default function PlaygroundSection({ reduced }) {
  return (
    <Reveal
      as={motion.section}
      className="strip-section container-site"
      id="playground"
      aria-labelledby="playground-heading"
    >
      <SectionHeader
        title="Playground"
        aside="fun"
        headingId="playground-heading"
        reduced={reduced}
      />
      <motion.ul
        className="playground-list strip-section__body grid-12"
        variants={staggerContainer(reduced, { stagger: 0.06 })}
      >
        {PLAYGROUND_TILES.map((tile) => (
          <motion.li
            key={tile.id}
            className="playground-list__item"
            variants={staggerItem(reduced, { y: 14 })}
          >
            <PlaygroundTile {...tile} />
          </motion.li>
        ))}
      </motion.ul>
      <div className="section-see-all">
        <SeeAllButton to="/playground" />
      </div>
    </Reveal>
  );
}
