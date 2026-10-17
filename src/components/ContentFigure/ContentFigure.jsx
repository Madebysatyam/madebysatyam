/**
 * Shared image + caption for notes and project case studies.
 * Caption uses label-small (design system), same on every surface.
 */
export default function ContentFigure({
  src,
  alt = "",
  caption,
  className = "",
}) {
  const label = alt || caption || "Image";

  return (
    <figure className={["content-figure", className].filter(Boolean).join(" ")}>
      {src ? (
        <img
          className="content-figure__image"
          src={src}
          alt={alt || caption || ""}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="content-figure__placeholder" role="img" aria-label={label}>
          <span className="content-figure__label text-style-label-small">Image</span>
        </div>
      )}
      {caption ? (
        <figcaption className="content-figure__caption text-style-label-small">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
