import { Link } from "react-router-dom";
import NoteCategoryTag from "./NoteCategoryTag.jsx";

function isClientRoute(href) {
  return href.startsWith("/") && !href.includes("#");
}

export default function NoteItem({ title, summary, date, href = "#", category }) {
  const body = (
    <>
      {category ? (
        <span className="note-item__header">
          <NoteCategoryTag category={category} />
        </span>
      ) : null}
      <span className="note-item__body">
        <h3 className="note-item__title text-style-paragraph-large">{title}</h3>
        {summary ? <p className="note-item__summary text-style-paragraph-small">{summary}</p> : null}
        {date ? <p className="note-item__date text-style-label-small">{date}</p> : null}
      </span>
    </>
  );

  if (isClientRoute(href)) {
    return (
      <Link className="note-item" to={href}>
        {body}
      </Link>
    );
  }

  return (
    <a className="note-item" href={href}>
      {body}
    </a>
  );
}
