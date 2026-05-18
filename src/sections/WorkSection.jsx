import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeader from "../components/SectionHeader";
import { staggerContainer, staggerItem } from "../motion/presets.js";

const WORK_CARDS = ["001", "002", "003", "004"];

export default function WorkSection({ reduced }) {
  const workListRef = useRef(null);
  const workInView = useInView(workListRef, { once: true, margin: "-8% 0px" });

  return (
    <section
      id="work"
      className="work-section container-site"
      aria-labelledby="work-heading"
    >
      <SectionHeader
        title="Projects"
        aside="Best of 24–25"
        headingId="work-heading"
        reduced={reduced}
      />

      <motion.ul
        ref={workListRef}
        className="work-list grid-12"
        initial="hidden"
        animate={workInView || reduced ? "visible" : "hidden"}
        variants={staggerContainer(reduced, { stagger: 0.07, delayChildren: 0.04 })}
      >
        {WORK_CARDS.map((index) => (
          <motion.li
            key={index}
            className="work-card"
            variants={staggerItem(reduced, { y: 16 })}
            whileHover={reduced ? undefined : { y: -3 }}
            transition={{ duration: 0.2 }}
          >
            <a className="work-card__link" href="#">
              <span className="work-card__index text-style-label-small">{index}</span>
              <h3 className="work-card__title text-style-heading-4">Project title</h3>
              <p className="work-card__desc text-style-paragraph-small">
                One-line summary of the problem, your role, and the outcome.
              </p>
              <span className="work-card__cta text-style-label-small">
                View case study →
              </span>
            </a>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
