export default function PlaygroundTile({
  title,
  date,
  mediaLabel = "Image or video placeholder",
  imageSrc,
}) {
  return (
    <article className="playground-tile">
      {imageSrc ? (
        <img
          className="playground-tile__media playground-tile__media--image"
          src={imageSrc}
          alt={mediaLabel}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="playground-tile__media" role="img" aria-label={mediaLabel} />
      )}
      <div className="playground-tile__copy">
        <p className="playground-tile__title text-style-paragraph-medium">{title}</p>
        <p className="playground-tile__date text-style-label-small">{date}</p>
      </div>
    </article>
  );
}
