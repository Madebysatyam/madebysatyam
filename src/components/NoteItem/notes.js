export const DUMMY_NOTE = {
  id: "the-measure-of-a-line",
  title: "The measure of a line",
  summary: "How many characters a line can hold before the eye loses its way back, and a meter for setting that width by hand.",
  date: "03.10.2026",
  category: "essay",
  href: "/notes/the-measure-of-a-line",
};

export const NOTE_ARTICLES = {
  [DUMMY_NOTE.id]: {
    ...DUMMY_NOTE,
    sections: [
      {
        type: "p",
        text: "A line is a length, not a decoration. Too long and the eye drops to the next row in the wrong place. Too short and the rhythm breaks into a stack of fragments. This note is a dummy, written so the page has something to reflow while the meter moves.",
      },
      {
        type: "p",
        text: "The useful range sits somewhere near sixty-six characters. That is a habit from print, not a law. On a phone the column is already narrow, and the same sentence takes more lines. The meter is here so you can feel that change instead of only reading about it.",
      },
      {
        type: "h2",
        text: "What the meter does",
      },
      {
        type: "p",
        text: "Drag the mark at the right edge of the column, or the ruler above the text. The number is the width in characters of the zero in this face. The words stay where they are. Only the line endings move.",
      },
      {
        type: "p",
        text: "Set it wide and the note reads like a page. Set it narrow and it reads like a margin note. Either way the sentences are the same ones, already on the page.",
      },
      {
        type: "h2",
        text: "What it leaves alone",
      },
      {
        type: "p",
        text: "Nothing arrives late. The paragraph is already written. Changing the measure does not introduce the text, hide it, or send it down the page word by word. It only decides how far each line is allowed to run.",
      },
      {
        type: "p",
        text: "A blog page is mostly this: a title, a date, and a column of type. The rest of the site can stay sharp and quiet. This page is the place where the column itself is the control.",
      },
    ],
  },
};

export function getNoteArticle(slug) {
  return NOTE_ARTICLES[slug] ?? null;
}

export const NOTES = [
  {
    id: "habit-loops",
    title: "On habit loops and listener rituals",
    summary: "How repeated listening turns a product into a daily ritual, and what the interface should get out of the way.",
    date: "00.00.0000",
    category: "essay",
  },
  {
    id: "design-systems",
    title: "What a design system owes the next designer",
    summary: "The parts a system has to leave behind so the next person can extend it without starting over.",
    date: "00.00.0000",
    category: "systems",
  },
  {
    id: "motion-restraint",
    title: "Motion with restraint on product surfaces",
    summary: "Where motion earns its place on a product surface, and where a still frame is the clearer choice.",
    date: "00.00.0000",
    category: "process",
  },
  {
    id: "handoff",
    title: "Handoff notes that survive the first sprint",
    summary: "Notes written so engineering can ship the first sprint without guessing what the design meant.",
    date: "00.00.0000",
    category: "product",
  },
];

export const NOTES_PAGE = [
  DUMMY_NOTE,
  ...NOTES,
  {
    id: "placeholder-05",
    title: "Placeholder essay — listening at scale",
    summary: "What changes when a listening product has to hold for millions of sessions a day.",
    date: "00.00.0000",
    category: "essay",
  },
  {
    id: "placeholder-06",
    title: "Placeholder essay — tokens before components",
    summary: "Why the tokens have to settle before the component library starts to grow.",
    date: "00.00.0000",
    category: "systems",
  },
  {
    id: "placeholder-07",
    title: "Placeholder essay — critique without a deck",
    summary: "A way to review the work in the file itself, without building a presentation around it.",
    date: "00.00.0000",
    category: "research",
  },
  {
    id: "placeholder-08",
    title: "Placeholder essay — shipping the boring fix",
    summary: "The unglamorous fix that clears the path for the work people actually notice.",
    date: "00.00.0000",
    category: "product",
  },
  {
    id: "placeholder-09",
    title: "Placeholder essay — rhythm in editorial UI",
    summary: "How spacing and type size set a reading rhythm before any decoration is added.",
    date: "00.00.0000",
    category: "process",
  },
  {
    id: "placeholder-10",
    title: "Placeholder essay — what we leave out",
    summary: "The features and words that make a product clearer by not being there.",
    date: "00.00.0000",
    category: "research",
  },
];
