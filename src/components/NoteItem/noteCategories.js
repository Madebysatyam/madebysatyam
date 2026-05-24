/** Note category tags — content accents only (see noteCategories + color-tokens). */

export const NOTE_CATEGORIES = {
  essay: {
    id: "essay",
    label: "Essay",
    colorVar: "--color-lime-500",
  },
  systems: {
    id: "systems",
    label: "Systems",
    colorVar: "--color-teal-500",
  },
  process: {
    id: "process",
    label: "Process",
    colorVar: "--color-pink-500",
  },
  research: {
    id: "research",
    label: "Research",
    colorVar: "--color-purple-500",
  },
  product: {
    id: "product",
    label: "Product",
    colorVar: "--color-orange-500",
  },
};

export const NOTE_CATEGORY_IDS = Object.keys(NOTE_CATEGORIES);
