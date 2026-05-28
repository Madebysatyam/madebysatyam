import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
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
    note: "Recognised org-wide for shaping the Aural Design System, setting new quality benchmarks through scalable frameworks and leading key Pocket Toons design efforts. Mentored junior designers into core contributors and elevated the overall design standard across the team.",
  },
  {
    company: "High Achiever",
    duration: "Sept 2024",
    note: "Recognised for outstanding contributions to the design system, proactive collaboration with developers to resolve issues and independently driving higher design quality standards across the team.",
  },
];

const EDUCATION = [
  {
    company: "National Institute of Fashion Technology",
    role: "B.Des - Fashion Communication",
    duration: "Jan 2018 - Dec 2022",
    note: "Led the design team for Spectrum, the college annual fest, for three consecutive years.",
  },
];

const BELIEFS = [
  {
    title: "Earn your place",
    body: "Every element on a screen has to justify its existence. If it is not doing something real for the person using it, it is decoration. Knowing when to stop is as important as knowing what to add.",
  },
  {
    title: "Read the gap",
    body: "The most useful thing I do is observe the distance between what I designed and what people actually do. That gap is where the real design problem lives. It never fully closes. It just gets more specific.",
  },
  {
    title: "Own the outcome",
    body: "Design does not end at the handoff. It ends when you know whether the thing you built actually worked. I am not interested in delivering screens. I am interested in whether the problem got solved.",
  },
  {
    title: "Meaning over mechanics",
    body: "People do not return to a product for what it gives them. They return for what it means to them. I design for that deeper reason, not the surface one.",
  },
];

const FEEDING_THINKING = [
  { label: "Reading", value: "Designing Data-Intensive Applications (re-read notes)" },
  { label: "Listening", value: "Lenny's Podcast - product and craft conversations" },
  { label: "Watching", value: "Character-led long-form dramas on Netflix" },
  { label: "Playing", value: "Badminton and football on weekends" },
  { label: "Thinking", value: "How design systems can scale without flattening product identity" },
];

export default function AboutPage() {
  const reduced = useReducedMotion();

  return (
    <main id="main" className="page-listing page-listing--nav-offset">
      <section className="container-site" aria-label="About page">
        <div className="about-page__layout">
          <aside className="about-page__left-rail" aria-label="Portrait panel">
            <div className="about-page__portrait" role="img" aria-label="Portrait placeholder">
              <span className="text-style-label-small">Portrait</span>
            </div>
          </aside>

          <div className="about-page__right-content">
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
              className="about-page__section"
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
                        />
                      ))}
                    </motion.article>
                  );
                })}
              </motion.div>
            </motion.section>

            <motion.section
              className="about-page__section"
              aria-labelledby="beliefs"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
              variants={staggerItem(reduced, { y: 14 })}
            >
              <h2 id="beliefs" className="about-page__section-title text-style-display-small">
                What I Believe
              </h2>
              <ol className="about-page__beliefs-list">
                {BELIEFS.map((belief, index) => (
                  <li key={belief.title} className="about-page__belief-item">
                    <h3 className="text-style-heading-medium">
                      <span className="about-page__belief-index text-style-label-medium">
                        {String(index + 1).padStart(2, "0")}.
                      </span>{" "}
                      {belief.title}
                    </h3>
                    <p className="text-style-paragraph-large">{belief.body}</p>
                  </li>
                ))}
              </ol>
            </motion.section>

            <motion.section
              className="about-page__section"
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
                className="about-page__history-list"
                variants={staggerContainer(reduced, { stagger: 0.06, delayChildren: 0.03 })}
              >
                {AWARDS.map((item) => (
                  <motion.div key={`${item.company}-${item.duration}`} variants={staggerItem(reduced, { y: 10 })}>
                    <ExperienceTile
                      company={item.company}
                      duration={item.duration}
                      description={item.note}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>

            <motion.section
              className="about-page__section"
              aria-labelledby="education"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
              variants={staggerItem(reduced, { y: 14 })}
            >
              <h2 id="education" className="about-page__section-title text-style-display-small">
                Education
              </h2>
              <motion.div
                className="about-page__history-list"
                variants={staggerContainer(reduced, { stagger: 0.06, delayChildren: 0.03 })}
              >
                {EDUCATION.map((item) => (
                  <motion.div key={`${item.company}-${item.duration}`} variants={staggerItem(reduced, { y: 10 })}>
                    <ExperienceTile
                      company={item.company}
                      role={item.role}
                      duration={item.duration}
                      description={item.note}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>

            <motion.section
              className="about-page__section"
              aria-labelledby="outside-work"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
              variants={staggerItem(reduced, { y: 14 })}
            >
              <h2 id="outside-work" className="about-page__section-title text-style-display-small">
                What I Read, Watch, Think About
              </h2>
              <dl className="about-page__kv-list">
                {FEEDING_THINKING.map((item) => (
                  <div key={item.label} className="about-page__kv-item">
                    <dt className="text-style-label-medium">{item.label}</dt>
                    <dd className="text-style-paragraph-medium">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </motion.section>

            <motion.section
              className="about-page__section"
              aria-labelledby="looking-for"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
              variants={staggerItem(reduced, { y: 14 })}
            >
              <h2 id="looking-for" className="about-page__section-title text-style-display-small">
                What I am Looking For
              </h2>
              <div className="about-page__prose">
                <p className="text-style-paragraph-large">
                  A team that believes designers are not the execution layer. A problem that is
                  genuinely hard. An environment where the question is never "did design deliver
                  the screens" but always "did we build the right thing."
                </p>
                <p className="text-style-paragraph-large">
                  If that sounds like where you are, let&apos;s talk.
                </p>
                <p className="about-page__cta text-style-label-medium">
                  <a href="mailto:shekharsinha.satyam61@gmail.com">shekharsinha.satyam61@gmail.com</a>
                </p>
                <p className="text-style-label-small">LinkedIn - available on request</p>
              </div>
            </motion.section>
          </div>
        </div>
      </section>
    </main>
  );
}
