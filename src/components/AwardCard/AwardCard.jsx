import AwardBadge from "../AwardBadge/index.js";

export default function AwardCard({ company, duration, badge }) {
  if (!badge?.src) return null;

  return (
    <article className="award-card">
      <AwardBadge src={badge.src} alt={badge.alt} className="award-card__badge" />
      <div className="award-card__meta">
        <h3 className="award-card__name text-style-heading-medium">{company}</h3>
        <p className="award-card__date text-style-label-small">{duration}</p>
      </div>
    </article>
  );
}
