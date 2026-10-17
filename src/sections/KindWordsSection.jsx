import { motion } from "framer-motion";
import TestimonialTicker from "../components/TestimonialTicker";
import { TESTIMONIAL_TILES } from "../components/TestimonialTile";
import Reveal from "../components/Reveal.jsx";
import SectionHeader from "../components/SectionHeader";
import useCmsResource from "../hooks/useCmsResource.js";
import { fetchTestimonials, mapCmsTestimonials } from "../lib/cms.js";

export default function KindWordsSection({ reduced }) {
  const tiles = useCmsResource(async () => {
    const docs = await fetchTestimonials();
    return mapCmsTestimonials(docs, TESTIMONIAL_TILES);
  }, TESTIMONIAL_TILES);

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
      <TestimonialTicker tiles={tiles} />
    </Reveal>
  );
}
