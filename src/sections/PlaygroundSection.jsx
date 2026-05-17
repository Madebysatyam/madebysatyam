import { motion } from "framer-motion";
import Reveal from "../components/Reveal.jsx";
import { staggerContainer, staggerItem } from "../motion/presets.js";

export default function PlaygroundSection({ reduced }) {
  return (
    <Reveal
      as={motion.section}
      className="strip-section container-site"
      id="playground"
      aria-labelledby="playground-heading"
    >
      <motion.div
        className="strip-section__inner grid-12"
        variants={staggerContainer(reduced, { stagger: 0.06 })}
      >
        <motion.div className="strip-section__primary" variants={staggerItem(reduced)}>
          <p className="text-style-label-large">02 / Playground</p>
          <h2 id="playground-heading" className="text-style-heading-3">
            Experiments &amp; side projects
          </h2>
        </motion.div>
        <motion.div
          className="strip-section__secondary"
          variants={staggerItem(reduced, { y: 14 })}
        >
          <p className="text-style-paragraph-medium">
            Typography tests, motion studies, and tools that do not fit a case study
            folder — collected here as they ship.
          </p>
          <a className="strip-section__link text-style-label-medium" href="#">
            Enter playground →
          </a>
        </motion.div>
      </motion.div>
    </Reveal>
  );
}
