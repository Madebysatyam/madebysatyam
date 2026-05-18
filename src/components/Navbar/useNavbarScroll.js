import { useEffect, useRef, useState } from "react";

const COMPACT_ENTER_Y = 96;

/**
 * Scroll down past threshold → compact. Any scroll up → expanded. Near top → expanded.
 * Desktop only — disabled by Navbar when mobile or menu is open.
 */
export default function useNavbarScroll({ disabled = false } = {}) {
  const [isCompact, setIsCompact] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (disabled) {
      setIsCompact(false);
      return undefined;
    }

    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastScrollY.current;
      lastScrollY.current = y;

      if (y < 48) {
        setIsCompact(false);
        return;
      }

      if (!goingDown) {
        setIsCompact(false);
        return;
      }

      if (goingDown && y > COMPACT_ENTER_Y) {
        setIsCompact(true);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [disabled]);

  return isCompact;
}
