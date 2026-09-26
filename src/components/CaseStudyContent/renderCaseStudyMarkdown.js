import { marked } from "marked";

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function preprocessFigurePlaceholders(markdown) {
  const lines = markdown.split("\n");
  const output = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];

    if (!line.includes("📷") || !line.includes("IMAGE PLACEHOLDER")) {
      output.push(line);
      continue;
    }

    const captionLines = [];
    index += 1;

    while (index < lines.length && lines[index].startsWith(">")) {
      const captionLine = lines[index]
        .replace(/^>\s*/, "")
        .replace(/^\*(.*)\*$/, "$1")
        .trim();
      if (captionLine) captionLines.push(captionLine);
      index += 1;
    }

    index -= 1;

    const caption = captionLines.join(" ");
    const safeCaption = escapeHtml(caption);

    output.push(
      `<figure class="case-study__figure">` +
        `<div class="case-study__figure-placeholder" role="img" aria-label="Image placeholder: ${safeCaption}">` +
        `<span class="case-study__figure-label text-style-label-small">Image</span>` +
        `</div>` +
        (caption
          ? `<figcaption class="case-study__figure-caption text-style-label-small">${safeCaption}</figcaption>`
          : "") +
        `</figure>`
    );
  }

  return output.join("\n");
}

function buildInsightCardGrid(items) {
  const cards = items
    .map(({ title, copy }) => {
      const safeTitle = escapeHtml(title.trim());
      const safeCopy = escapeHtml(copy.trim());
      return (
        `<article class="case-study__insight-card">` +
        `<div class="case-study__insight-card-media" role="img" aria-label="${safeTitle} illustration placeholder">` +
        `<span class="case-study__insight-card-media-label text-style-label-small">Image</span>` +
        `</div>` +
        `<div class="case-study__insight-card-body">` +
        `<h4 class="case-study__insight-card-title text-style-label-small">${safeTitle}</h4>` +
        `<p class="case-study__insight-card-copy text-style-paragraph-medium">${safeCopy}</p>` +
        `</div>` +
        `</article>`
      );
    })
    .join("");

  return `<div class="case-study__insight-grid">${cards}</div>`;
}

function preprocessInsightCardGrids(markdown) {
  const heading = "### Four patterns that kept surfacing\n\n";
  const start = markdown.indexOf(heading);
  if (start === -1) return markdown;

  const bodyStart = start + heading.length;
  const rest = markdown.slice(bodyStart);
  const endIndex = rest.search(/\n---\n\n### /);
  const sectionBody = endIndex === -1 ? rest : rest.slice(0, endIndex);

  const itemPattern = /\*\*(.+?)\*\*\n([\s\S]*?)(?=\n\n\*\*|\s*$)/g;
  const items = [...sectionBody.matchAll(itemPattern)].map((match) => ({
    title: match[1],
    copy: match[2].trim(),
  }));

  if (items.length < 2) return markdown;

  const gridHtml = buildInsightCardGrid(items);
  const tail = endIndex === -1 ? "" : rest.slice(endIndex);
  return markdown.slice(0, bodyStart) + gridHtml + "\n\n" + tail;
}

function stripPartLabels(markdown) {
  return markdown
    .replace(/^#{1,6}\s*Part\s+\d+\s*[—–-]\s*/gim, (match) => match.replace(/Part\s+\d+\s*[—–-]\s*/i, ""))
    .replace(/\*\*(\d{2})\s*[—–-]\s*/g, "**");
}

export function getCaseStudyBody(markdown, { lead } = {}) {
  const overviewIndex = markdown.indexOf("## Overview");
  let body = overviewIndex === -1 ? markdown : markdown.slice(overviewIndex);

  if (lead && body.startsWith("## Overview")) {
    body = body.replace(/^## Overview\n\n[\s\S]*?\n\n/, "");
  }

  return preprocessFigurePlaceholders(
    preprocessInsightCardGrids(stripPartLabels(body))
  );
}

marked.setOptions({
  gfm: true,
  breaks: false,
});

marked.use({
  renderer: {
    heading(token) {
      let text = this.parser.parseInline(token.tokens);
      text = text.replace(/^Part\s+\d+\s*[—–-]\s*/i, "");
      if (token.depth === 2) {
        return `<h2 class="case-study__section-title text-style-display-small">${text}</h2>`;
      }
      if (token.depth === 3) {
        return `<h3 class="case-study__subsection-title text-style-heading-large">${text}</h3>`;
      }
      return `<h${token.depth}>${text}</h${token.depth}>`;
    },
    paragraph(token) {
      const text = this.parser.parseInline(token.tokens);
      return `<p class="case-study__paragraph text-style-paragraph-medium">${text}</p>`;
    },
    blockquote(token) {
      const text = this.parser.parse(token.tokens);
      return `<blockquote class="case-study__pull-quote">${text}</blockquote>`;
    },
    strong(token) {
      let text = this.parser.parseInline(token.tokens);
      text = text.replace(/^(\d{2})\s*[—–-]\s*/, "");
      return `<strong class="case-study__strong">${text}</strong>`;
    },
    list(token) {
      const body = token.items.map((item) => this.listitem(item)).join("");
      const tag = token.ordered ? "ol" : "ul";
      return `<${tag} class="case-study__list">${body}</${tag}>`;
    },
    listitem(token) {
      const text = this.parser.parse(token.tokens);
      return `<li class="case-study__list-item text-style-paragraph-medium">${text}</li>`;
    },
    hr() {
      return `<hr class="case-study__divider" />`;
    },
  },
});

export function renderCaseStudyMarkdown(markdown, options = {}) {
  return marked.parse(getCaseStudyBody(markdown, options));
}
