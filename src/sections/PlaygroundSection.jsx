import { motion } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import PlaygroundTile, { PLAYGROUND_TILES_PAGE } from "../components/PlaygroundTile";
import Reveal from "../components/Reveal.jsx";
import SectionHeader from "../components/SectionHeader";
import useHorizontalRowFade from "../lib/useHorizontalRowFade.js";
import { staggerContainer, staggerItem } from "../motion/presets.js";

const PLAYGROUND_ROW_LIMIT = 8;

export default function PlaygroundSection({ reduced }) {
  const rowRef = useRef(null);
  const tiles = PLAYGROUND_TILES_PAGE.slice(0, PLAYGROUND_ROW_LIMIT);
  useHorizontalRowFade(rowRef);

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
        ref={rowRef}
        className="playground-list playground-list--row strip-section__body"
        variants={staggerContainer(reduced, { stagger: 0.06 })}
      >
        {tiles.map((tile) => (
          <motion.li
            key={tile.id}
            className="playground-list__item"
            variants={staggerItem(reduced, { y: 14 })}
          >
            <PlaygroundTile {...tile} />
          </motion.li>
        ))}
        <motion.li className="playground-list__item" variants={staggerItem(reduced, { y: 14 })}>
          <Link to="/playground" className="playground-see-all">
            <span className="playground-see-all__label text-style-label-medium">See all</span>
          </Link>
        </motion.li>
      </motion.ul>
    </Reveal>
  );
}
