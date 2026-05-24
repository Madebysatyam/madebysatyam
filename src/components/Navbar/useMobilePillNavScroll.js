import { useEffect, useRef, useState } from "react";

const SCROLL_PAUSE_MS = 180;

/**
 * Hides the mobile bottom pill while the user is scrolling; shows it again
 * after scroll pauses (blur + opacity settle).
 */
export default function useMobilePillNavScroll({ disabled = false } = {}) {
  const [isVisible, setIsVisible] = useState(true);
  const pauseTimerRef = useRef(null);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    if (disabled) {
      setIsVisible(true);
      return undefined;
    }

    const scheduleReveal = () => {
      clearTimeout(pauseTimerRef.current);
      pauseTimerRef.current = setTimeout(() => {
        setIsVisible(true);
      }, SCROLL_PAUSE_MS);
    };

    const onScroll = () => {
      const y = window.scrollY;

      if (Math.abs(y - lastScrollYRef.current) > 1) {
        setIsVisible(false);
      }

      lastScrollYRef.current = y;
      scheduleReveal();
    };

    lastScrollYRef.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(pauseTimerRef.current);
    };
  }, [disabled]);

  return isVisible;
}
