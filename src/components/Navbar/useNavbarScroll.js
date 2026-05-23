import { useEffect, useState } from "react";

const COMPACT_ENTER_Y = 96;
const COMPACT_EXIT_Y = 48;

/**
 * Scroll down past threshold → compact. Returns to expanded only at page top.
 * Desktop only — disabled by Navbar when mobile or menu is open.
 */
export default function useNavbarScroll({ disabled = false } = {}) {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    if (disabled) {
      setIsCompact(false);
      return undefined;
    }

    const onScroll = () => {
      const y = window.scrollY;

      if (y < COMPACT_EXIT_Y) {
        setIsCompact(false);
        return;
      }

      if (y > COMPACT_ENTER_Y) {
        setIsCompact(true);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [disabled]);

  return isCompact;
}
