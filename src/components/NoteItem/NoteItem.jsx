import NoteCategoryTag from "./NoteCategoryTag.jsx";

export default function NoteItem({ title, date, href = "#", category }) {
  return (
    <a className="note-item" href={href}>
      {category ? <NoteCategoryTag category={category} /> : null}
      <p className="note-item__title text-style-paragraph-large">{title}</p>
      <p className="note-item__date text-style-label-small">{date}</p>
    </a>
  );
}
