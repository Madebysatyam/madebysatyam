import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "../motion/presets.js";

function HeroFact({ label, value, reduced }) {
  return (
    <motion.div className="hero__fact" variants={staggerItem(reduced, { y: 10 })}>
      <p className="hero__fact-label text-style-label-small">{label}</p>
      <p className="hero__fact-value text-style-paragraph-medium">{value}</p>
    </motion.div>
  );
}

export default function HeroSection({ reduced }) {
  return (
    <motion.section
      className="hero container-site"
      aria-labelledby="hero-title"
      variants={staggerContainer(reduced, { stagger: 0.07, delayChildren: 0.05 })}
    >
      <motion.div
        className="hero__grid grid-12"
        variants={staggerContainer(reduced, { stagger: 0.07 })}
      >
        <motion.div className="hero__intro" variants={staggerItem(reduced)}>
          <motion.p
            className="hero__status text-style-label-medium"
            variants={staggerItem(reduced, { y: 8 })}
          >
            <span className="hero__status-marker" aria-hidden="true">
              &gt;
            </span>
            available for work — 2026
          </motion.p>
          <motion.h1
            id="hero-title"
            className="hero__title text-style-display-large"
            variants={staggerItem(reduced, { y: 20 })}
          >
            Made by Satyam
          </motion.h1>
          <motion.p
            className="hero__lede text-style-paragraph-large"
            variants={staggerItem(reduced, { y: 14 })}
          >
            Product designer building clear interfaces, design systems, and
            end-to-end experiences — from research and strategy through to
            shipped UI.
          </motion.p>
        </motion.div>
        <motion.div className="hero__meta" variants={staggerItem(reduced)}>
          <motion.div
            className="hero__facts"
            variants={staggerContainer(reduced, { stagger: 0.06, delayChildren: 0.1 })}
          >
            <HeroFact
              reduced={reduced}
              label="Focus"
              value="Product design, design systems, interaction"
            />
            <HeroFact reduced={reduced} label="Based in" value="India" />
            <HeroFact
              reduced={reduced}
              label="Currently"
              value="Open to select collaborations"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
