/**
 * Build Payload Lexical editor JSON from plain paragraph / heading sections.
 * Shared by local note fallbacks and CMS seed (via equivalent helpers).
 */

function textNode(text) {
  return {
    type: "text",
    detail: 0,
    format: 0,
    mode: "normal",
    style: "",
    text,
    version: 1,
  };
}

function paragraphNode(text) {
  return {
    type: "paragraph",
    children: text ? [textNode(text)] : [],
    direction: "ltr",
    format: "",
    indent: 0,
    textFormat: 0,
    textStyle: "",
    version: 1,
  };
}

function headingNode(text, tag = "h2") {
  return {
    type: "heading",
    tag,
    children: text ? [textNode(text)] : [],
    direction: "ltr",
    format: "",
    indent: 0,
    version: 1,
  };
}

/** Empty Lexical document (one blank paragraph). */
export function emptyLexicalBody() {
  return {
    root: {
      type: "root",
      children: [paragraphNode("")],
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    },
  };
}

/** True when Lexical JSON has at least one non-empty text or upload node. */
export function lexicalBodyHasContent(body) {
  const children = body?.root?.children;
  if (!Array.isArray(children) || children.length === 0) return false;

  const walk = (nodes) => {
    for (const node of nodes || []) {
      if (!node || typeof node !== "object") continue;
      if (node.type === "upload") return true;
      if (node.type === "text" && String(node.text || "").trim()) return true;
      if (Array.isArray(node.children) && walk(node.children)) return true;
    }
    return false;
  };

  return walk(children);
}

/**
 * @param {{ type: 'p' | 'h2' | 'image', text?: string }[]} sections
 * Image sections are skipped here (seed/local text-only); use the CMS editor for images.
 */
export function sectionsToLexical(sections = []) {
  const children = [];

  for (const section of sections) {
    if (section.type === "h2") {
      children.push(headingNode(section.text || "", "h2"));
    } else if (section.type === "p") {
      children.push(paragraphNode(section.text || ""));
    }
  }

  if (children.length === 0) {
    return emptyLexicalBody();
  }

  return {
    root: {
      type: "root",
      children,
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    },
  };
}
