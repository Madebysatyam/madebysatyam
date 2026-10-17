import { useEffect, useState } from "react";

/**
 * Load CMS content once and keep a local fallback while offline / empty.
 * @param {() => Promise<unknown>} load - async loader that returns mapped data (or null/[] to keep fallback)
 * @param {unknown} fallback
 */
export default function useCmsResource(load, fallback) {
  const [data, setData] = useState(fallback);

  useEffect(() => {
    let cancelled = false;

    load()
      .then((mapped) => {
        if (cancelled) return;
        const emptyArray = Array.isArray(mapped) && mapped.length === 0;
        if (mapped == null || emptyArray) return;
        setData(mapped);
      })
      .catch(() => {
        // Keep local fallback when CMS is offline.
      });

    return () => {
      cancelled = true;
    };
    // Intentionally once on mount — callers pass stable fallback defaults.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return data;
}
