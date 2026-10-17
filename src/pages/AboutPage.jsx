import { useLivePreview } from "@payloadcms/live-preview-react";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import BeliefNotesStack from "../components/BeliefNotesStack";
import AwardCard from "../components/AwardCard/index.js";
import ExperienceTile from "../components/ExperienceTile/ExperienceTile.jsx";
import ListingPageHero from "../components/ListingPageHero/index.js";
import { DEFAULT_ABOUT } from "../data/aboutDefaults.js";
import { fetchAbout, mapCmsAbout } from "../lib/cms.js";
import { getLivePreviewServerURL, LIVE_PREVIEW_DEPTH } from "../lib/livePreview.js";
import { staggerContainer, staggerItem } from "../motion/presets.js";

export default function AboutPage() {
  const reduced = useReducedMotion();
  const [cmsDoc, setCmsDoc] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchAbout()
      .then((doc) => {
        if (!cancelled && doc) setCmsDoc(doc);
      })
      .catch(() => {
        // Keep DEFAULT_ABOUT when CMS is offline.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const { data: liveDoc } = useLivePreview({
    serverURL: getLivePreviewServerURL(),
    depth: LIVE_PREVIEW_DEPTH,
    initialData: cmsDoc || {},
  });

  const about = useMemo(() => {
    const source =
      liveDoc && (liveDoc.story || liveDoc.beliefs || liveDoc.experience || liveDoc.id)
        ? liveDoc
        : cmsDoc;
    return mapCmsAbout(source) || DEFAULT_ABOUT;
  }, [liveDoc, cmsDoc]);

  const story = about.story?.length ? about.story : DEFAULT_ABOUT.story;
  const beliefs = about.beliefs?.length ? about.beliefs : DEFAULT_ABOUT.beliefs;
  const experience = about.experience?.length ? about.experience : DEFAULT_ABOUT.experience;
  const awards = about.awards?.length ? about.awards : DEFAULT_ABOUT.awards;
  const closing = about.closing?.length ? about.closing : DEFAULT_ABOUT.closing;

  return (
    <main id="main" className="page-listing page-listing--with-hero">
      <ListingPageHero
        wrapperClassName="about-page__hero"
        mediaClassName="about-page__hero-media"
        src="/about/hero.webp"
        alt="Voxel art street scene at golden hour, with a figure seated on a bench beside a tree and café sign"
        width={7660}
        height={3284}
        reduced={reduced}
      />
      <section className="container-site page-listing__body" aria-label="About page">
        <div className="about-page__content">
            <motion.section
              className="about-page__section"
              aria-label="Story"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
              variants={staggerItem(reduced, { y: 14 })}
            >
              <div className="about-page__prose">
                {story.map((paragraph) => (
                  <p key={paragraph} className="text-style-paragraph-large">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.section>

            <motion.section
              className="about-page__section about-page__section--split"
              aria-labelledby="beliefs"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
              variants={staggerItem(reduced, { y: 14 })}
            >
              <h2 id="beliefs" className="about-page__section-title text-style-display-small">
                What I Believe
              </h2>
              <BeliefNotesStack beliefs={beliefs} />
            </motion.section>

            <motion.section
              className="about-page__section about-page__section--split"
              aria-labelledby="experience"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
              variants={staggerItem(reduced, { y: 14 })}
            >
              <h2 id="experience" className="about-page__section-title text-style-display-small">
                Experience
              </h2>
              <motion.div
                className="about-page__history-list"
                variants={staggerContainer(reduced, { stagger: 0.06, delayChildren: 0.03 })}
              >
                {experience.map((companyItem) => {
                  return (
                    <motion.article
                      key={companyItem.company}
                      className="about-page__history-company-block"
                      variants={staggerItem(reduced, { y: 10 })}
                    >
                      <div className="about-page__history-company-header">
                        <span className="about-page__history-company-name text-style-heading-medium">
                          <span className="experience-tile__company-row">
                            {companyItem.company}
                            {companyItem.roles.some((role) => role.isCurrent) ? (
                              <span className="experience-tile__current-tag text-style-label-x-small">
                                <span className="experience-tile__current-tag-text">Current</span>
                              </span>
                            ) : null}
                          </span>
                        </span>
                      </div>
                      {companyItem.roles.map((roleItem) => (
                        <ExperienceTile
                          key={`${companyItem.company}-${roleItem.role}-${roleItem.duration}`}
                          company={companyItem.company}
                          role={roleItem.role}
                          duration={roleItem.duration}
                          description={roleItem.note}
                          showCompany={false}
                          collapsible
                        />
                      ))}
                    </motion.article>
                  );
                })}
              </motion.div>
            </motion.section>

            <motion.section
              className="about-page__section about-page__section--split about-page__section--awards"
              aria-labelledby="awards"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
              variants={staggerItem(reduced, { y: 14 })}
            >
              <h2 id="awards" className="about-page__section-title text-style-display-small">
                Awards
              </h2>
              <motion.div
                className="about-page__awards-grid"
                variants={staggerContainer(reduced, { stagger: 0.08, delayChildren: 0.04 })}
              >
                {awards.map((item) => (
                  <motion.div
                    key={`${item.company}-${item.duration}`}
                    className="about-page__awards-item"
                    variants={staggerItem(reduced, { y: 10 })}
                  >
                    <AwardCard company={item.company} duration={item.duration} badge={item.badge} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>

            <motion.section
              className="about-page__section"
              aria-label="What I am looking for"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
              variants={staggerItem(reduced, { y: 14 })}
            >
              <div className="about-page__prose">
                {closing.map((paragraph) => (
                  <p key={paragraph} className="text-style-paragraph-large">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.section>
        </div>
      </section>
    </main>
  );
}
