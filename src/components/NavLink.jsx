import { useCallback, useEffect, useRef, useState } from "react";

export default function NavLink({ href, label, className, onNavigate }) {
  const [text, setText] = useState(label);
  const [isTyping, setIsTyping] = useState(false);
  const timerRef = useRef(null);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const runType = useCallback(() => {
    if (prefersReducedMotion) {
      setText(label);
      return;
    }

    window.clearTimeout(timerRef.current);
    setIsTyping(true);
    setText("");

    let index = 0;

    const step = () => {
      if (index < label.length) {
        setText(label.slice(0, index + 1));
        index += 1;
        timerRef.current = window.setTimeout(step, 48);
        return;
      }

      setIsTyping(false);
    };

    step();
  }, [label, prefersReducedMotion]);

  useEffect(() => {
    return () => window.clearTimeout(timerRef.current);
  }, []);

  return (
    <a
      className={`site-nav__link ${className} text-style-label-medium${isTyping ? " is-typing" : ""}`}
      href={href}
      onMouseEnter={runType}
      onFocus={runType}
      onClick={onNavigate}
    >
      <span className="site-nav__terminal-text">{text}</span>
      <span className="site-nav__cursor" aria-hidden="true" />
    </a>
  );
}
