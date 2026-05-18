import { motion } from "framer-motion";
import Reveal from "../components/Reveal.jsx";
import SectionHeader from "../components/SectionHeader";

export default function AboutSection({ reduced }) {
  return (
    <Reveal
      as={motion.section}
      className="about-section container-narrow"
      id="about"
      aria-labelledby="about-heading"
    >
      <SectionHeader title="About" headingId="about-heading" reduced={reduced} />
      <p className="text-style-paragraph-medium">
        I care about systems that scale, interfaces that stay honest under edge cases,
        and documentation the next designer can actually use. Most of my work sits at
        the intersection of product thinking and visual craft — from early discovery
        through handoff.
      </p>
      <p className="text-style-paragraph-medium">
        Replace this block with your bio, credentials, and the story you want on the
        landing page.
      </p>
    </Reveal>
  );
}
