import { motion } from "framer-motion";
import Reveal from "../components/Reveal.jsx";
import { staggerContainer, staggerItem } from "../motion/presets.js";

const CONTACT_CHANNELS = [
  { href: "mailto:hello@madebysatyam.com", label: "hello@madebysatyam.com" },
  {
    href: "https://www.linkedin.com/",
    label: "LinkedIn",
    rel: "noopener noreferrer",
  },
  {
    href: "https://medium.com/@Madebysatyam",
    label: "Medium",
    rel: "noopener noreferrer",
  },
];

export default function ContactSection({ reduced }) {
  return (
    <Reveal
      as={motion.section}
      className="contact-section container-site"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <motion.div
        className="contact-section__inner grid-12"
        variants={staggerContainer(reduced, { stagger: 0.06, delayChildren: 0.06 })}
      >
        <motion.div
          className="contact-section__primary"
          variants={staggerItem(reduced, { y: 12 })}
        >
          <p className="text-style-label-large">04 / Contact</p>
          <h2 id="contact-heading" className="text-style-heading-2">
            Start a conversation
          </h2>
          <p className="text-style-paragraph-large">
            For freelance, full-time, or collaboration — send a note with context,
            timeline, and what success looks like.
          </p>
        </motion.div>
        <motion.div
          className="contact-section__channels"
          variants={staggerContainer(reduced, { stagger: 0.05, delayChildren: 0.04 })}
        >
          {CONTACT_CHANNELS.map((channel) => (
            <motion.a
              key={channel.href}
              className="contact-channel text-style-label-medium"
              href={channel.href}
              rel={channel.rel}
              variants={staggerItem(reduced, { y: 10 })}
              whileHover={reduced ? undefined : { x: 4 }}
              transition={{ duration: 0.18 }}
            >
              {channel.label}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </Reveal>
  );
}
