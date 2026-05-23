import Tooltip from "../Tooltip";

export default function TestimonialTile({ name, role, quote, roleLogo }) {
  return (
    <article className="testimonial-tile">
      <div className="testimonial-tile__meta">
        <p className="testimonial-tile__name text-style-heading-2">{name}</p>
        <p className="testimonial-tile__role-row text-style-label-large">
          <span className="testimonial-tile__role">{role}</span>
          {roleLogo ? (
            <Tooltip label={roleLogo.alt}>
              {roleLogo.src ? (
                <img
                  className={[
                    "testimonial-tile__role-logo",
                    roleLogo.layout === "wordmark"
                      ? "testimonial-tile__role-logo--wordmark"
                      : "",
                    roleLogo.logoClass,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  src={roleLogo.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <span
                  className="testimonial-tile__role-logo testimonial-tile__role-logo--placeholder"
                  role="img"
                  aria-hidden="true"
                />
              )}
            </Tooltip>
          ) : null}
        </p>
      </div>
      <blockquote className="testimonial-tile__quote text-style-paragraph-large">
        {quote}
      </blockquote>
    </article>
  );
}
