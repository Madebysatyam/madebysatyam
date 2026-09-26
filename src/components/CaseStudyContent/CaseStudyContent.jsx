import { renderCaseStudyMarkdown } from "./renderCaseStudyMarkdown.js";

export default function CaseStudyContent({ markdown, lead }) {
  const html = renderCaseStudyMarkdown(markdown, { lead });

  return (
    <div
      className="case-study__content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
