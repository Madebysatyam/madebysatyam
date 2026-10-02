import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import NoteItem, { NOTES_PAGE } from "../components/NoteItem";
import Reveal from "../components/Reveal.jsx";
import SectionHeader from "../components/SectionHeader";
import { staggerContainer, staggerItem } from "../motion/presets.js";

const NOTES_ROW_LIMIT = 8;

export default function NotesSection({ reduced }) {
  const notes = NOTES_PAGE.slice(0, NOTES_ROW_LIMIT);

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
        className="notes-list notes-list--row"
        variants={staggerContainer(reduced, { stagger: 0.06 })}
      >
        {notes.map((note) => (
          <motion.li key={note.id} className="notes-list__item" variants={staggerItem(reduced, { y: 12 })}>
            <NoteItem {...note} />
          </motion.li>
        ))}
        <motion.li className="notes-list__item" variants={staggerItem(reduced, { y: 12 })}>
          <Link to="/Notes" className="notes-see-all">
            <span className="notes-see-all__label text-style-label-medium">See all</span>
          </Link>
        </motion.li>
      </motion.ul>
    </Reveal>
  );
}
