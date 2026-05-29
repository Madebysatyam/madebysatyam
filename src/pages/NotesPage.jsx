import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useOutletContext } from "react-router-dom";
import NoteItem, { NOTES_PAGE } from "../components/NoteItem";
import { staggerContainer, staggerItem } from "../motion/presets.js";
import PageHeader from "../components/PageHeader";

export default function NotesPage() {
  const { reduced } = useOutletContext();
  const notesListRef = useRef(null);
  const notesInView = useInView(notesListRef, { once: true, margin: "-8% 0px" });

  return (
    <main id="main" className="page-listing page-listing--with-hero">
      <div
        className="page-listing__hero-media"
        role="img"
        aria-label="Notes page hero image placeholder"
      />
      <section
        className="container-site page-listing__body"
        aria-labelledby="notes-page-heading"
      >
        <PageHeader
          title="Notes"
          headingId="notes-page-heading"
          reduced={reduced}
        />
        <motion.ul
          ref={notesListRef}
          className="notes-list"
          initial="hidden"
          animate={notesInView || reduced ? "visible" : "hidden"}
          variants={staggerContainer(reduced, { stagger: 0.06, delayChildren: 0.04 })}
        >
          {NOTES_PAGE.map((note) => (
            <motion.li key={note.id} variants={staggerItem(reduced, { y: 12 })}>
              <NoteItem {...note} />
            </motion.li>
          ))}
        </motion.ul>
      </section>
    </main>
  );
}
