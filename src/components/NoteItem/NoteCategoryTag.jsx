import { NOTE_CATEGORIES } from "./noteCategories.js";

export default function NoteCategoryTag({ category }) {
  const meta = NOTE_CATEGORIES[category];

  if (!meta) return null;

  return (
    <span className={`note-tag note-tag--${meta.id}`}>
      <span className="note-tag__swatch" aria-hidden="true" />
      <span className="note-tag__label text-style-label-small">{meta.label}</span>
    </span>
  );
}
