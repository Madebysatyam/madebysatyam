import { useCallback, useEffect, useRef, useState } from "react";

const TYPE_INTERVAL_MS = 48;

export default function useTerminalTyping(label) {
  const [text, setText] = useState(label);
  const [isTyping, setIsTyping] = useState(false);
  const timerRef = useRef(null);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    setText(label);
  }, [label]);

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
        timerRef.current = window.setTimeout(step, TYPE_INTERVAL_MS);
        return;
      }

      setIsTyping(false);
    };

    step();
  }, [label, prefersReducedMotion]);

  useEffect(() => {
    return () => window.clearTimeout(timerRef.current);
  }, []);

  return { text, isTyping, runType };
}
