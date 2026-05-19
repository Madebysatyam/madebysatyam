import { useLayoutEffect, useRef, useState } from "react";

const LINE_Y_TOLERANCE = 4;

/** Merge getClientRects() fragments that belong on the same typographic line. */
function groupRectsByLine(rects) {
  const lines = [];

  for (const rect of rects) {
    const match = lines.find(
      (line) => Math.abs(line.bottom - rect.bottom) <= LINE_Y_TOLERANCE,
    );

    if (match) {
      match.left = Math.min(match.left, rect.left);
      match.right = Math.max(match.right, rect.right);
      match.top = Math.min(match.top, rect.top);
      match.bottom = Math.max(match.bottom, rect.bottom);
    } else {
      lines.push({
        left: rect.left,
        right: rect.right,
        top: rect.top,
        bottom: rect.bottom,
      });
    }
  }

  return lines.sort((a, b) => a.top - b.top);
}

function measureUnderline(textEl, wrapEl) {
  const range = document.createRange();
  range.selectNodeContents(textEl);

  const rects = [...range.getClientRects()].filter((rect) => rect.width > 0);
  if (!rects.length) {
    return null;
  }

  const wrap = wrapEl.getBoundingClientRect();
  const wrapWidth = wrap.width;
  const wrapHeight = wrap.height;

  if (wrapWidth <= 0 || wrapHeight <= 0) {
    return null;
  }

  const lines = groupRectsByLine(rects);
  const pathParts = [];

  for (const line of lines) {
    const left = Math.max(0, line.left - wrap.left);
    const right = Math.min(wrapWidth, line.right - wrap.left);
    const baseline = Math.min(wrapHeight - 1, line.bottom - wrap.top - 2);

    if (right > left) {
      pathParts.push(`M ${left} ${baseline} H ${right}`);
    }
  }

  if (!pathParts.length) {
    return null;
  }

  return {
    wrapWidth,
    wrapHeight,
    pathD: pathParts.join(" "),
  };
}

export default function HeroBodyHighlight({ children }) {
  const wrapRef = useRef(null);
  const textRef = useRef(null);
  const [underline, setUnderline] = useState(null);

  useLayoutEffect(() => {
    const wrapEl = wrapRef.current;
    const textEl = textRef.current;
    if (!wrapEl || !textEl) {
      return undefined;
    }

    const update = () => {
      setUnderline(measureUnderline(textEl, wrapEl));
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(wrapEl);

    if (document.fonts?.ready) {
      document.fonts.ready.then(update);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <span ref={wrapRef} className="hero__body-highlight">
      <span ref={textRef} className="hero__body-highlight__text">
        {children}
      </span>
      {underline ? (
        <svg
          className="hero__body-highlight__underline"
          width={underline.wrapWidth}
          height={underline.wrapHeight}
          viewBox={`0 0 ${underline.wrapWidth} ${underline.wrapHeight}`}
          aria-hidden="true"
        >
          <path
            className="hero__body-highlight__path"
            d={underline.pathD}
            pathLength={1}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      ) : null}
    </span>
  );
}
