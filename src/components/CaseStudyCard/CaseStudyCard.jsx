import { Link } from "react-router-dom";

function isClientRoute(href) {
  return href.startsWith("/") && !href.includes("#");
}

export default function CaseStudyCard({
  href,
  tag,
  title,
  metricValue,
  metricLabel,
  readTime,
  shipped,
  imageSrc,
  imageAlt = "",
}) {
  const cardClassName = "case-study-card";
  const cardBody = (
    <>
      <div className="case-study-card__visual">
        {imageSrc ? (
          <img
            className="case-study-card__image"
            src={imageSrc}
            alt={imageAlt}
            loading="lazy"
          />
        ) : null}
      </div>

      <div className="case-study-card__body">
        {tag ? (
          <div className="case-study-card__row case-study-card__meta">
            <span className="case-study-card__tag text-style-label-x-small">{tag}</span>
          </div>
        ) : null}

        <div className="case-study-card__row">
          <h3 className="case-study-card__title text-style-heading-3">{title}</h3>
        </div>

        {(metricValue || metricLabel) && (
          <div className="case-study-card__row case-study-card__metric">
            {metricValue ? (
              <span className="case-study-card__metric-value text-style-label-medium text-teal-500">
                {metricValue}
              </span>
            ) : null}
            {metricLabel ? (
              <span className="case-study-card__metric-label text-style-label-small">
                {metricLabel}
              </span>
            ) : null}
          </div>
        )}

        <footer className="case-study-card__row case-study-card__footer">
          {readTime ? (
            <span className="case-study-card__read-time text-style-label-x-small">
              {readTime}
            </span>
          ) : null}
          {shipped ? (
            <span className="case-study-card__shipped text-style-label-x-small">{shipped}</span>
          ) : null}
        </footer>
      </div>
    </>
  );

  if (isClientRoute(href)) {
    return (
      <Link className={cardClassName} to={href}>
        {cardBody}
      </Link>
    );
  }

  return (
    <a className={cardClassName} href={href}>
      {cardBody}
    </a>
  );
}
