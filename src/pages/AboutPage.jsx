import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import BeliefNotesStack from "../components/BeliefNotesStack";
import AwardCard from "../components/AwardCard/index.js";
import ExperienceTile from "../components/ExperienceTile/ExperienceTile.jsx";
import { staggerContainer, staggerItem } from "../motion/presets.js";

const EXPERIENCE_COMPANIES = [
  {
    company: "Pocket FM",
    roles: [
      {
        role: "Senior Product Designer",
        duration: "Apr 2025 - Present",
        isCurrent: true,
        note: "Shipped two experiments to full rollout with measurable impact. Pocket Blockbuster for You drove +5% new LDAU shows, +3% activated shows and +2% playtime in the USA. The Unified Streaks experience delivered +10.89% LDAU days and +9.15% playtime in the USA, with +5.11% LDAU days in India and positive ARPU movement in both markets.",
      },
      {
        role: "Product Designer",
        duration: "Dec 2023 - Apr 2025",
        note: "Helped shape the Aural Design System, a 125+ component library that gave the product a distinct identity. Contributed to Pocket Toons, which crossed 10K downloads in three months, and worked on features that drove up to 4% conversion growth and 3% ARPU uplift across India and the US.",
      },
    ],
  },
  {
    company: "Hubilo",
    roles: [
      {
        role: "Product Designer",
        duration: "Jan 2023 - Dec 2023",
        note: "Designed Hubilo Broadcast Studio 3.0 from the ground up, creating seamless experiences for organizers, speakers and attendees in real-time virtual sessions. Drove a 40.49% increase in adoption across webinars, virtual and hybrid events through research-led, user-centered design.",
      },
      {
        role: "Associate Product Designer",
        duration: "Jan 2022 - Jan 2023",
        note: "Improved login and onboarding flows across virtual and hybrid event experiences to drive users toward the pricing page, balancing product-led growth with business impact.",
      },
    ],
  },
];

const AWARDS = [
  {
    company: "Pocket Star",
    duration: "Dec 2025",
    badge: {
      src: "/awards/pocket-star-badge.png",
      alt: "Pocket Star award badge",
    },
  },
  {
    company: "High Achiever",
    duration: "Sept 2024",
    badge: {
      src: "/awards/high-achiever-badge.png",
      alt: "High Achiever award badge",
    },
  },
];

const BELIEFS = [
  {
    id: "earn-your-place",
    title: "Earn your place",
    accent: "orange",
    body: "Every element on a screen has to justify its existence. If it is not doing something real for the person using it, it is decoration. Knowing when to stop is as important as knowing what to add.",
  },
  {
    id: "read-the-gap",
    title: "Read the gap",
    accent: "pink",
    body: "The most useful thing I do is observe the distance between what I designed and what people actually do. That gap is where the real design problem lives. It never fully closes. It just gets more specific.",
  },
  {
    id: "own-the-outcome",
    title: "Own the outcome",
    accent: "teal",
    body: "Design does not end at the handoff. It ends when you know whether the thing you built actually worked. I am not interested in delivering screens. I am interested in whether the problem got solved.",
  },
  {
    id: "meaning-over-mechanics",
    title: "Meaning over mechanics",
    accent: "purple",
    body: "People do not return to a product for what it gives them. They return for what it means to them. I design for that deeper reason, not the surface one.",
  },
];

export default function AboutPage() {
  const reduced = useReducedMotion();

  return (
    <main id="main" className="page-listing page-listing--with-hero">
      <div className="about-page__hero">
        <img
          className="page-listing__hero-media about-page__hero-media"
          src="/about/hero.png"
          srcSet="/about/hero.png 1024w, /about/hero@2x.png 2048w"
          sizes="100vw"
          alt="Voxel art street scene at golden hour, with a figure seated on a bench beside a tree and café sign"
          width={1024}
          height={439}
          loading="eager"
          decoding="sync"
          fetchPriority="high"
        />
      </div>
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
                <p className="text-style-paragraph-large">I started with my hands.</p>
                <p className="text-style-paragraph-large">
                  Sketching, painting, illustrations. Making things before I understood why making
                  things mattered. Freelance work came next, pitch decks and marketing assets,
                  digital work that paid but did not yet ask the most interesting question: what
                  does the person on the other end actually do with this?
                </p>
                <p className="text-style-paragraph-large">
                  Product design answered that question. Not perfectly, but honestly. It put me in
                  the same room as the people I was designing for and showed me the gap between
                  what I intended and what they actually did. That gap never gets smaller. It just
                  gets more interesting.
                </p>
                <p className="text-style-paragraph-large">
                  I have designed features that shipped cleanly and got used in ways I never
                  anticipated. I have watched people navigate screens I spent weeks on and find
                  paths I did not know existed. Observation is still the sharpest tool I have. Not
                  research as a phase in a process. Observation as a permanent condition of paying
                  attention.
                </p>
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
              <BeliefNotesStack beliefs={BELIEFS} />
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
                {EXPERIENCE_COMPANIES.map((companyItem) => {
                  return (
                    <motion.article
                      key={companyItem.company}
                      className="about-page__history-company-block"
                      variants={staggerItem(reduced, { y: 10 })}
                    >
                      {companyItem.roles.map((roleItem) => (
                        <ExperienceTile
                          key={`${companyItem.company}-${roleItem.role}-${roleItem.duration}`}
                          company={companyItem.company}
                          role={roleItem.role}
                          duration={roleItem.duration}
                          description={roleItem.note}
                          isCurrent={roleItem.isCurrent}
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
                {AWARDS.map((item) => (
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
                <p className="text-style-paragraph-large">
                  A team that believes designers are not the execution layer. A problem that is
                  genuinely hard. An environment where the question is never “did design deliver the
                  screens” but always “did we build the right thing.”
                </p>
                <p className="text-style-paragraph-large">
                  If that sounds like where you are, let&apos;s talk.
                </p>
              </div>
            </motion.section>
        </div>
      </section>
    </main>
  );
}
