import { getProjectCard } from "../../data/projects/index.js";
import { AURAL_PROJECT } from "../../data/projects/aural.js";

/** Landing-page case study entries — linked projects first, then placeholders. */
export const CASE_STUDY_CARDS = [
  getProjectCard(AURAL_PROJECT),
  {
    id: "project-002",
    href: "#",
    tag: "Product design",
    role: "Lead designer",
    title: "Placeholder title for the second case study card",
    metricValue: "+18%",
    metricLabel: "Conversion uplift",
    readTime: "12min read",
    shipped: "Shipped 2024",
  },
  {
    id: "project-003",
    href: "#",
    tag: "Systems",
    role: "Design + research",
    title: "Placeholder title for the third case study card",
    metricValue: "2×",
    metricLabel: "Faster workflow",
    readTime: "8min read",
    shipped: "Shipped 2024",
  },
  {
    id: "project-004",
    href: "#",
    tag: "Motion",
    role: "Individual contributor",
    title: "Placeholder title for the fourth case study card",
    metricValue: "+24%",
    metricLabel: "Engagement lift",
    readTime: "6min read",
    shipped: "Shipped 2025",
  },
];
