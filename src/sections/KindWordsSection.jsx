import { motion } from "framer-motion";
import TestimonialTicker from "../components/TestimonialTicker";
import { TESTIMONIAL_TILES } from "../components/TestimonialTile";
import Reveal from "../components/Reveal.jsx";
import SectionHeader from "../components/SectionHeader";

export default function KindWordsSection({ reduced }) {
  return (
    <Reveal
      as={motion.section}
      className="kind-words-section"
      id="kind-words"
      aria-labelledby="kind-words-heading"
    >
      <div className="container-site">
        <SectionHeader
          title="Kind words"
          aside="testimonials"
          headingId="kind-words-heading"
          reduced={reduced}
        />
      </div>
      <TestimonialTicker tiles={TESTIMONIAL_TILES} />
    </Reveal>
  );
}
