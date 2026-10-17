import { cmsMediaUrl } from "../../lib/cms.js";

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function paragraphHtml(text) {
  return `<p class="case-study__paragraph text-style-paragraph-medium">${escapeHtml(text)}</p>`;
}

function renderFigure(block) {
  const image = typeof block.image === "object" ? block.image : null;
  const src = cmsMediaUrl(image);
  const alt = escapeHtml(image?.alt || block.caption || "Case study image");
  const caption = block.caption ? escapeHtml(block.caption) : "";

  if (!src) {
    return (
      `<figure class="case-study__figure content-figure">` +
      `<div class="case-study__figure-placeholder content-figure__placeholder" role="img" aria-label="${alt}">` +
      `<span class="case-study__figure-label content-figure__label text-style-label-small">Image</span>` +
      `</div>` +
      (caption
        ? `<figcaption class="case-study__figure-caption content-figure__caption text-style-label-small">${caption}</figcaption>`
        : "") +
      `</figure>`
    );
  }

  return (
    `<figure class="case-study__figure content-figure">` +
    `<img class="case-study__figure-image content-figure__image" src="${escapeHtml(src)}" alt="${alt}" loading="lazy" />` +
    (caption
      ? `<figcaption class="case-study__figure-caption content-figure__caption text-style-label-small">${caption}</figcaption>`
      : "") +
    `</figure>`
  );
}

function renderInsightCards(block) {
  const items = Array.isArray(block.items) ? block.items : [];
  const cards = items
    .map((item) => {
      const title = escapeHtml(item.title || "");
      const copy = escapeHtml(item.copy || "");
      const image = typeof item.image === "object" ? item.image : null;
      const src = cmsMediaUrl(image);
      const caption = item.caption ? escapeHtml(item.caption) : "";
      const mediaAlt = escapeHtml(image?.alt || item.caption || `${item.title || "Insight"} illustration`);

      const media = src
        ? `<img class="case-study__insight-card-image" src="${escapeHtml(src)}" alt="${mediaAlt}" loading="lazy" />`
        : `<div class="case-study__insight-card-media" role="img" aria-label="${mediaAlt}">` +
          `<span class="case-study__insight-card-media-label text-style-label-small">Image</span>` +
          `</div>`;

      return (
        `<article class="case-study__insight-card">` +
        media +
        (caption
          ? `<p class="case-study__insight-card-caption content-figure__caption text-style-label-small">${caption}</p>`
          : "") +
        `<div class="case-study__insight-card-body">` +
        `<h4 class="case-study__insight-card-title text-style-label-small">${title}</h4>` +
        `<p class="case-study__insight-card-copy text-style-paragraph-medium">${copy}</p>` +
        `</div>` +
        `</article>`
      );
    })
    .join("");

  return `<div class="case-study__insight-grid">${cards}</div>`;
}

export function renderCaseStudyBlocks(blocks = []) {
  return blocks
    .map((block) => {
      switch (block.blockType) {
        case "sectionHeading":
          return `<h2 class="case-study__section-title text-style-display-small">${escapeHtml(block.text)}</h2>`;
        case "subheading":
          return `<h3 class="case-study__subsection-title text-style-heading-large">${escapeHtml(block.text)}</h3>`;
        case "body":
          return paragraphHtml(block.text);
        case "pullQuote":
          return (
            `<blockquote class="case-study__pull-quote">` +
            `<p class="case-study__paragraph text-style-paragraph-medium"><strong class="case-study__strong">${escapeHtml(block.text)}</strong></p>` +
            `</blockquote>`
          );
        case "figure":
          return renderFigure(block);
        case "insightCards":
          return renderInsightCards(block);
        case "divider":
          return `<hr class="case-study__divider" />`;
        default:
          return "";
      }
    })
    .filter(Boolean)
    .join("\n");
}
