import { motion } from "framer-motion";
import Reveal from "../components/Reveal.jsx";
import { staggerContainer, staggerItem } from "../motion/presets.js";

export default function SiteFooter({ reduced }) {
  return (
    <Reveal as={motion.footer} className="site-footer container-site" y={12}>
      <motion.div
        className="site-footer__inner grid-12"
        variants={staggerContainer(reduced, { stagger: 0.04 })}
      >
        <motion.p
          className="site-footer__copy text-style-label-small"
          variants={staggerItem(reduced, { y: 8 })}
        >
          © 2026 Madebysatyam
        </motion.p>
        <motion.p
          className="site-footer__note text-style-label-small"
          variants={staggerItem(reduced, { y: 8 })}
        >
          Built with the locked Space Grey system
        </motion.p>
      </motion.div>
    </Reveal>
  );
}
