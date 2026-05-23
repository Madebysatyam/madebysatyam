export default function NoteItem({ title, date, href = "#" }) {
  return (
    <a className="note-item" href={href}>
      <p className="note-item__title text-style-paragraph-large">{title}</p>
      <p className="note-item__date text-style-label-small">{date}</p>
    </a>
  );
}
