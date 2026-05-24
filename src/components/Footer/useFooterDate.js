import { useEffect, useState } from "react";

function pad2(value) {
  return String(value).padStart(2, "0");
}

export function formatFooterDateLine(date = new Date()) {
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(date).toUpperCase();
  const day = date.getDate();
  const year = date.getFullYear();

  let hours = date.getHours();
  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  if (hours === 0) hours = 12;

  const time = `${pad2(hours)}:${pad2(date.getMinutes())}:${pad2(date.getSeconds())} ${period}`;

  return `${month} ${day}, ${year} ${time}`;
}

function toDateTimeAttr(date) {
  return date.toISOString();
}

/** Live footer date line — ticks every second. */
export default function useFooterDate() {
  const [state, setState] = useState(() => {
    const now = new Date();
    return { label: formatFooterDateLine(now), dateTime: toDateTimeAttr(now) };
  });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setState({ label: formatFooterDateLine(now), dateTime: toDateTimeAttr(now) });
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return state;
}
