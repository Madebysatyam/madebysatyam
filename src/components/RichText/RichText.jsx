import ContentFigure from "../ContentFigure";
import { mediaUrl } from "../../lib/mediaUrl.js";

/** Lexical text format bit flags */
const IS_BOLD = 1;
const IS_ITALIC = 2;
const IS_STRIKETHROUGH = 4;
const IS_UNDERLINE = 8;
const IS_CODE = 16;

function renderTextNode(node, key) {
  let content = node.text ?? "";
  if (!content) return null;

  const format = node.format || 0;
  if (format & IS_CODE) content = <code>{content}</code>;
  if (format & IS_BOLD) content = <strong>{content}</strong>;
  if (format & IS_ITALIC) content = <em>{content}</em>;
  if (format & IS_UNDERLINE) content = <u>{content}</u>;
  if (format & IS_STRIKETHROUGH) content = <s>{content}</s>;

  return <span key={key}>{content}</span>;
}

function renderChildren(nodes, keyPrefix) {
  if (!Array.isArray(nodes)) return null;
  return nodes.map((node, index) => renderNode(node, `${keyPrefix}-${index}`));
}

function renderNode(node, key) {
  if (!node || typeof node !== "object") return null;

  switch (node.type) {
    case "paragraph": {
      const kids = renderChildren(node.children, key);
      if (!kids || (Array.isArray(kids) && kids.every((k) => k == null))) {
        return <p key={key} className="text-style-paragraph-large" />;
      }
      return (
        <p key={key} className="text-style-paragraph-large">
          {kids}
        </p>
      );
    }
    case "heading": {
      const tag = node.tag || "h2";
      const className =
        tag === "h2" ? "text-style-heading-4" : "text-style-heading-4";
      const kids = renderChildren(node.children, key);
      if (tag === "h1") return <h1 key={key} className={className}>{kids}</h1>;
      if (tag === "h3") return <h3 key={key} className={className}>{kids}</h3>;
      return <h2 key={key} className={className}>{kids}</h2>;
    }
    case "text":
      return renderTextNode(node, key);
    case "linebreak":
      return <br key={key} />;
    case "link":
    case "autolink": {
      const href = node.fields?.url || node.url || "#";
      const newTab = node.fields?.newTab;
      return (
        <a
          key={key}
          href={href}
          className="note-page__link"
          {...(newTab ? { target: "_blank", rel: "noreferrer" } : {})}
        >
          {renderChildren(node.children, key)}
        </a>
      );
    }
    case "upload": {
      const value = typeof node.value === "object" ? node.value : null;
      const src = mediaUrl(value);
      const caption = node.fields?.caption || "";
      const alt = value?.alt || caption || "";
      return (
        <ContentFigure
          key={key}
          className="note-page__figure"
          src={src}
          alt={alt}
          caption={caption}
        />
      );
    }
    case "quote":
      return (
        <blockquote key={key} className="text-style-paragraph-large">
          {renderChildren(node.children, key)}
        </blockquote>
      );
    case "list": {
      const Tag = node.listType === "number" ? "ol" : "ul";
      return (
        <Tag key={key} className="text-style-paragraph-large">
          {renderChildren(node.children, key)}
        </Tag>
      );
    }
    case "listitem":
      return <li key={key}>{renderChildren(node.children, key)}</li>;
    case "horizontalrule":
      return <hr key={key} />;
    default:
      if (Array.isArray(node.children)) {
        return <div key={key}>{renderChildren(node.children, key)}</div>;
      }
      return null;
  }
}

/**
 * Renders Lexical rich text JSON with site text styles.
 * No wrapper by default so note prose child selectors (scroll reveal) keep working.
 * @param {{ data?: { root?: { children?: unknown[] } }, className?: string }} props
 */
export default function RichText({ data, className = "" }) {
  const children = data?.root?.children;
  if (!Array.isArray(children) || children.length === 0) return null;

  const nodes = children.map((node, index) => renderNode(node, `rt-${index}`));

  if (className) {
    return <div className={["rich-text", className].filter(Boolean).join(" ")}>{nodes}</div>;
  }

  return <>{nodes}</>;
}
