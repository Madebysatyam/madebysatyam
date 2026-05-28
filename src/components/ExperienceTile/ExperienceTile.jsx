export default function ExperienceTile({
  company,
  role,
  duration,
  description,
  isCurrent = false,
}) {
  return (
    <article className="experience-tile">
      <div className="experience-tile__head">
        <div className="experience-tile__primary">
          <p className="experience-tile__company text-style-heading-medium">
            <span className="experience-tile__company-row">
              {company}
              {isCurrent ? (
                <span className="experience-tile__current-tag text-style-label-x-small">
                  Current
                </span>
              ) : null}
            </span>
          </p>
        {role ? <p className="experience-tile__role text-style-label-medium">{role}</p> : null}
        </div>

        <p className="experience-tile__duration text-style-label-small">{duration}</p>
      </div>

      <p className="experience-tile__description text-style-paragraph-medium">{description}</p>
    </article>
  );
}
