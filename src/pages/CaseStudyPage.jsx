import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import CaseStudyContent from "../components/CaseStudyContent";
import { getProjectBySlug } from "../data/projects/index.js";
import { staggerContainer, staggerItem } from "../motion/presets.js";

export default function CaseStudyPage() {
  const { reduced } = useOutletContext();
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  useEffect(() => {
    if (project) {
      document.title = `${project.page.shortTitle} — Madebysatyam`;
    }
    return () => {
      document.title = "Madebysatyam";
    };
  }, [project]);

  if (!project) {
    return (
      <main id="main" className="page-case-study">
        <article className="case-study-page container-site grid-12">
          <div className="case-study-page__inner case-study-page__body--missing">
            <p className="case-study-page__missing text-style-paragraph-large">
              Project not found.
            </p>
            <Link className="case-study-page__back text-style-label-medium" to="/#work">
              Back to projects
            </Link>
          </div>
        </article>
      </main>
    );
  }

  const { page, markdown, card } = project;

  return (
    <main id="main" className="page-case-study">
      <article className="case-study-page container-site grid-12" aria-labelledby="case-study-heading">
        <div className="case-study-page__inner">
        <motion.header
          className="case-study-page__hero"
          initial="hidden"
          animate="visible"
          variants={staggerContainer(reduced, { stagger: 0.05, delayChildren: 0.02 })}
        >
          <motion.p className="case-study-page__date text-style-label-small" variants={staggerItem(reduced, { y: 8 })}>
            <span>{page.timeline}</span>
            <span className="case-study-page__date-sep" aria-hidden="true">
              ·
            </span>
            <span>{card.readTime}</span>
          </motion.p>

          <motion.h1
            id="case-study-heading"
            className="case-study-page__title text-style-display-medium"
            variants={staggerItem(reduced, { y: 14 })}
          >
            {page.dek}
          </motion.h1>

          <motion.div className="case-study-page__byline" variants={staggerItem(reduced, { y: 10 })}>
            <p className="case-study-page__byline-primary text-style-label-small">
              <span>{page.role}</span>
              <span className="case-study-page__byline-sep" aria-hidden="true">
                ·
              </span>
              <span>{page.company}</span>
            </p>
            {page.scope ? (
              <p className="case-study-page__byline-secondary text-style-label-small">{page.scope}</p>
            ) : null}
          </motion.div>

          {page.lead ? (
            <motion.p className="case-study-page__lead text-style-paragraph-large" variants={staggerItem(reduced, { y: 12 })}>
              {page.lead}
            </motion.p>
          ) : null}
        </motion.header>

        <motion.div
          className="case-study-page__article"
          initial="hidden"
          animate="visible"
          variants={staggerItem(reduced, { y: 16 })}
        >
          <CaseStudyContent markdown={markdown} lead={page.lead} />
        </motion.div>
        </div>
      </article>
    </main>
  );
}
