import { renderCaseStudyBlocks } from "./renderCaseStudyBlocks.js";
import { renderCaseStudyMarkdown } from "./renderCaseStudyMarkdown.js";

export default function CaseStudyContent({ markdown, lead, layout }) {
  const hasBlocks = Array.isArray(layout) && layout.length > 0;
  const html = hasBlocks
    ? renderCaseStudyBlocks(layout)
    : renderCaseStudyMarkdown(markdown || "", { lead });

  return (
    <div
      className="case-study__content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
