import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CaseStudyCard from "../components/CaseStudyCard";
import { CASE_STUDY_CARDS } from "../components/CaseStudyCard/caseStudyCards.js";
import SectionHeader from "../components/SectionHeader";
import useCmsResource from "../hooks/useCmsResource.js";
import { fetchProjects, mapCmsProjectCards } from "../lib/cms.js";
import useHorizontalRowFade from "../lib/useHorizontalRowFade.js";
import { staggerContainer, staggerItem } from "../motion/presets.js";

export default function WorkSection({ reduced }) {
  const workListRef = useRef(null);
  const workInView = useInView(workListRef, { once: true, margin: "-8% 0px" });
  useHorizontalRowFade(workListRef);

  const cards = useCmsResource(async () => {
    const docs = await fetchProjects();
    const cmsCards = mapCmsProjectCards(docs);
    if (!cmsCards.length) return null;
    const cmsIds = new Set(cmsCards.map((card) => card.id));
    const placeholders = CASE_STUDY_CARDS.filter(
      (card) => !cmsIds.has(card.id) && card.href === "#",
    );
    return [...cmsCards, ...placeholders];
  }, CASE_STUDY_CARDS);

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
        className="work-list work-list--row"
        initial="hidden"
        animate={workInView || reduced ? "visible" : "hidden"}
        variants={staggerContainer(reduced, { stagger: 0.07, delayChildren: 0.04 })}
      >
        {cards.map((card) => (
          <motion.li
            key={card.id}
            className="work-card"
            variants={staggerItem(reduced, { y: 16 })}
          >
            <CaseStudyCard {...card} />
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
