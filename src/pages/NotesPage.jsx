import { useOutletContext } from "react-router-dom";
import NoteItem, { NOTES_PAGE } from "../components/NoteItem";
import PageHeader from "../components/PageHeader";

export default function NotesPage() {
  const { reduced } = useOutletContext();

  return (
    <main id="main" className="page-listing">
      <section
        className="container-site"
        aria-labelledby="notes-page-heading"
      >
        <PageHeader
          title="Notes"
          headingId="notes-page-heading"
          reduced={reduced}
        />
        <ul className="notes-list">
          {NOTES_PAGE.map((note) => (
            <li key={note.id}>
              <NoteItem {...note} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
