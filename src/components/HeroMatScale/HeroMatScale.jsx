import { useEffect, useLayoutEffect, useRef, useState } from "react";

const STEP = 100;

function marksUpTo(length) {
  const count = Math.floor(length / STEP);
  return Array.from({ length: count + 1 }, (_, index) => index * STEP);
}

export default function HeroMatScale() {
  const rootRef = useRef(null);
  const xValueRef = useRef(null);
  const yValueRef = useRef(null);
  const [xMarks, setXMarks] = useState([0]);
  const [yMarks, setYMarks] = useState([0]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    root.querySelectorAll("[data-at]").forEach((label) => {
      const at = `${label.dataset.at}px`;
      if (label.classList.contains("hero-mat-scale__label--x")) {
        label.style.left = at;
      } else {
        label.style.top = at;
      }
    });
  }, [xMarks, yMarks]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const hero = root.closest(".hero");
    if (!hero) return undefined;

    const measure = () => {
      const rect = hero.getBoundingClientRect();
      setXMarks((current) => {
        const next = marksUpTo(rect.width);
        return current.length === next.length ? current : next;
      });
      setYMarks((current) => {
        const next = marksUpTo(rect.height);
        return current.length === next.length ? current : next;
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(hero);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    let frame = 0;
    let clientX = 0;
    let clientY = 0;

    const paint = () => {
      frame = 0;
      const rect = root.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;

      root.style.setProperty("--on", inside ? "1" : "0");
      root.style.setProperty("--x", `${Math.max(0, Math.min(rect.width, x))}px`);
      root.style.setProperty("--y", `${Math.max(0, Math.min(rect.height, y))}px`);

      if (xValueRef.current) xValueRef.current.textContent = String(Math.round(x));
      if (yValueRef.current) yValueRef.current.textContent = String(Math.round(y));
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(paint);
    };

    const onPointer = (event) => {
      clientX = event.clientX;
      clientY = event.clientY;
      schedule();
    };

    const onLeave = (event) => {
      if (event.relatedTarget) return;
      root.style.setProperty("--on", "0");
    };

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true });
    document.addEventListener("pointerout", onLeave);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", schedule);
      document.removeEventListener("pointerout", onLeave);
    };
  }, []);

  return (
    <div ref={rootRef} className="hero-mat-scale" aria-hidden="true">
      <div className="hero-mat-scale__x">
        <i className="hero-mat-scale__ticks" />
        {xMarks.map((mark) => (
          <span
            key={mark}
            className="hero-mat-scale__label hero-mat-scale__label--x text-style-label-x-small"
            data-at={mark}
          >
            {mark}
          </span>
        ))}
        <i className="hero-mat-scale__mark" />
        <span ref={xValueRef} className="hero-mat-scale__value hero-mat-scale__value--x text-style-label-x-small">
          0
        </span>
      </div>
      <div className="hero-mat-scale__y">
        <i className="hero-mat-scale__ticks" />
        {yMarks.map((mark) => (
          <span
            key={mark}
            className="hero-mat-scale__label hero-mat-scale__label--y text-style-label-x-small"
            data-at={mark}
          >
            {mark}
          </span>
        ))}
        <i className="hero-mat-scale__mark" />
        <span ref={yValueRef} className="hero-mat-scale__value hero-mat-scale__value--y text-style-label-x-small">
          0
        </span>
      </div>
      <i className="hero-mat-scale__corner" />
    </div>
  );
}
