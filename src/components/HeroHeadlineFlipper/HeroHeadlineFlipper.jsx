import { useEffect, useRef, useState } from "react";

const START_DELAY_MS = 550;
const TYPE_INTERVAL_MS = 42;

export default function HeroHeadlineFlipper({ text, className = "" }) {
  const [display, setDisplay] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const timerRef = useRef(null);
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplay(text);
      setIsTyping(false);
      return undefined;
    }

    const startId = window.setTimeout(() => {
      window.clearTimeout(timerRef.current);
      setDisplay("");
      setIsTyping(true);

      let index = 0;

      const step = () => {
        if (index < text.length) {
          setDisplay(text.slice(0, index + 1));
          index += 1;
          timerRef.current = window.setTimeout(step, TYPE_INTERVAL_MS);
          return;
        }

        setIsTyping(false);
      };

      step();
    }, START_DELAY_MS);

    return () => {
      window.clearTimeout(startId);
      window.clearTimeout(timerRef.current);
    };
  }, [text, prefersReducedMotion]);

  return (
    <span
      className={`hero-headline-flipper${isTyping ? " is-typing" : ""} ${className}`.trim()}
      aria-hidden="true"
    >
      <span className="hero-headline-flipper__text">{display}</span>
      <span className="hero-headline-flipper__cursor" aria-hidden="true" />
    </span>
  );
}
