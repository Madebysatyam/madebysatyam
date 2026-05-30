import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useOutletContext } from "react-router-dom";
import NoteItem, { NOTES_PAGE } from "../components/NoteItem";
import { staggerContainer, staggerItem } from "../motion/presets.js";
import ListingPageHero from "../components/ListingPageHero/index.js";
import PageHeader from "../components/PageHeader";

export default function NotesPage() {
  const { reduced } = useOutletContext();
  const notesListRef = useRef(null);
  const notesInView = useInView(notesListRef, { once: true, margin: "-8% 0px" });

  return (
    <main id="main" className="page-listing page-listing--with-hero">
      <ListingPageHero
        wrapperClassName="notes-page__hero"
        mediaClassName="notes-page__hero-media"
        src="/notes/hero.png"
        srcSet="/notes/hero.png 1024w, /notes/hero@2x.png 2048w"
        alt="Voxel art desk scene with a typewriter, lamp, coffee, books, and scattered notes"
        width={1024}
        height={439}
        reduced={reduced}
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
