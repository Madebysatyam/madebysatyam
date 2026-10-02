import { useLayoutEffect } from "react";

const SCROLL_FADE_THRESHOLD = 8;

export default function useHorizontalRowFade(ref) {
  useLayoutEffect(() => {
    const row = ref.current;
    if (!row) {
      return undefined;
    }

    const update = () => {
      row.classList.toggle("is-scrolled-x", row.scrollLeft > SCROLL_FADE_THRESHOLD);
    };

    update();
    row.addEventListener("scroll", update, { passive: true });
    return () => row.removeEventListener("scroll", update);
  }, [ref]);
}
