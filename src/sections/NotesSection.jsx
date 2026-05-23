import { motion } from "framer-motion";
import NoteItem, { NOTES } from "../components/NoteItem";
import SeeAllButton from "../components/SeeAllButton";
import Reveal from "../components/Reveal.jsx";
import SectionHeader from "../components/SectionHeader";
import { staggerContainer, staggerItem } from "../motion/presets.js";

export default function NotesSection({ reduced }) {
  return (
    <Reveal
      as={motion.section}
      className="notes-section container-site"
      id="notes"
      aria-labelledby="notes-heading"
    >
      <SectionHeader
        title="Notes"
        aside="essays"
        headingId="notes-heading"
        reduced={reduced}
      />
      <motion.ul
        className="notes-list"
        variants={staggerContainer(reduced, { stagger: 0.06 })}
      >
        {NOTES.map((note) => (
          <motion.li key={note.id} variants={staggerItem(reduced, { y: 12 })}>
            <NoteItem {...note} />
          </motion.li>
        ))}
      </motion.ul>
      <div className="section-see-all">
        <SeeAllButton to="/Notes" />
      </div>
    </Reveal>
  );
}
