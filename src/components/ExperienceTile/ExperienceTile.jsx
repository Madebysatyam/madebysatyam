import { motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
import { DURATION, EASE_OUT } from "../../motion/presets.js";

function experiencePanelVariants(reduced) {
  if (reduced) {
    return {
      open: { height: "auto", opacity: 1 },
      closed: { height: 0, opacity: 0 },
    };
  }

  return {
    open: {
      height: "auto",
      opacity: 1,
      transition: { duration: DURATION.base, ease: EASE_OUT },
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: { duration: DURATION.fast, ease: EASE_OUT },
    },
  };
}

export default function ExperienceTile({
  company,
  role,
  duration,
  description,
  isCurrent = false,
  collapsible = false,
  defaultExpanded = false,
}) {
  const reduced = useReducedMotion();
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const panelId = useId();
  const hasDescription = Boolean(description?.trim());
  const isCollapsible = collapsible && hasDescription;

  const headContent = (
    <>
      <span className="experience-tile__primary">
        <span className="experience-tile__company text-style-heading-medium">
          <span className="experience-tile__company-row">
            {company}
            {isCurrent ? (
              <span className="experience-tile__current-tag text-style-label-x-small">
                <span className="experience-tile__current-tag-text">Current</span>
              </span>
            ) : null}
          </span>
        </span>
        {role ? <span className="experience-tile__role text-style-label-medium">{role}</span> : null}
      </span>

      <span className="experience-tile__duration text-style-label-small">{duration}</span>

      {isCollapsible ? <span className="experience-tile__chevron" aria-hidden="true" /> : null}
    </>
  );

  return (
    <article className={`experience-tile${isExpanded ? " is-expanded" : ""}`}>
      <div className="experience-tile__bar">
        {isCollapsible ? (
          <button
            type="button"
            className="experience-tile__trigger"
            aria-expanded={isExpanded}
            aria-controls={panelId}
            onClick={() => setIsExpanded((open) => !open)}
          >
            <span className="experience-tile__trigger-inner">{headContent}</span>
          </button>
        ) : (
          <div className="experience-tile__trigger-inner experience-tile__trigger-inner--static">
            {headContent}
          </div>
        )}
      </div>

      {hasDescription && isCollapsible ? (
        <motion.div
          id={panelId}
          className="experience-tile__panel-wrap"
          initial={false}
          animate={isExpanded ? "open" : "closed"}
          variants={experiencePanelVariants(reduced)}
        >
          <div className="experience-tile__panel">
            <p className="experience-tile__description text-style-paragraph-medium">{description}</p>
          </div>
        </motion.div>
      ) : null}

      {hasDescription && !isCollapsible ? (
        <div className="experience-tile__panel">
          <p className="experience-tile__description text-style-paragraph-medium">{description}</p>
        </div>
      ) : null}
    </article>
  );
}
