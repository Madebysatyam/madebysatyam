import { useEffect, useState } from "react";

/** Touch-primary devices (gyro), including phones in landscape where width exceeds mobile breakpoint. */
const TOUCH_TILT_QUERY = "(hover: none) and (pointer: coarse)";

export default function usePrefersTouchTilt() {
  const [prefersTouchTilt, setPrefersTouchTilt] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia(TOUCH_TILT_QUERY).matches
      : false,
  );

  useEffect(() => {
    const query = window.matchMedia(TOUCH_TILT_QUERY);
    const onChange = (event) => setPrefersTouchTilt(event.matches);

    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return prefersTouchTilt;
}
