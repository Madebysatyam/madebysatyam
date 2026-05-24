import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import TestimonialTile from "../TestimonialTile";

const SCROLL_DURATION_S = 55;

export default function TestimonialTicker({ tiles }) {
  const reduced = useReducedMotion();
  const loopTiles = [...tiles, ...tiles];

  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const halfWidthRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);

  const applyTransform = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
  }, []);

  const normalizeOffset = useCallback(() => {
    const half = halfWidthRef.current;
    if (half <= 0) return;

    while (offsetRef.current <= -half) {
      offsetRef.current += half;
    }

    while (offsetRef.current > 0) {
      offsetRef.current -= half;
    }
  }, []);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    halfWidthRef.current = track.scrollWidth / 2;
  }, []);

  const tick = useCallback(
    (timestamp) => {
      if (lastTimeRef.current == null) {
        lastTimeRef.current = timestamp;
      }

      const dt = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      const half = halfWidthRef.current;

      if (half > 0 && !isDraggingRef.current) {
        const speed = half / SCROLL_DURATION_S;
        offsetRef.current -= speed * dt;
        normalizeOffset();
        applyTransform();
      }

      rafRef.current = requestAnimationFrame(tick);
    },
    [applyTransform, normalizeOffset]
  );

  useEffect(() => {
    if (reduced) return undefined;

    measure();

    const onResize = () => measure();
    window.addEventListener("resize", onResize);

    let resizeObserver;
    if (typeof ResizeObserver !== "undefined" && trackRef.current) {
      resizeObserver = new ResizeObserver(measure);
      resizeObserver.observe(trackRef.current);
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", onResize);
      resizeObserver?.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduced, measure, tick]);

  const onPointerDown = useCallback(
    (event) => {
      if (reduced) return;
      if (event.button !== 0) return;

      event.preventDefault();
      isDraggingRef.current = true;
      setIsDragging(true);
      dragStartXRef.current = event.clientX;
      dragStartOffsetRef.current = offsetRef.current;
      viewportRef.current?.setPointerCapture(event.pointerId);
    },
    [reduced]
  );

  const onPointerMove = useCallback((event) => {
    if (!isDraggingRef.current) return;

    offsetRef.current = dragStartOffsetRef.current + (event.clientX - dragStartXRef.current);
    applyTransform();
  }, [applyTransform]);

  const endDrag = useCallback(() => {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;
    setIsDragging(false);
    normalizeOffset();
    applyTransform();
    lastTimeRef.current = null;
  }, [applyTransform, normalizeOffset]);

  const onPointerUp = useCallback(() => {
    endDrag();
  }, [endDrag]);

  const trackClass = ["kind-words-ticker__track", reduced ? "" : "is-js-driven"]
    .filter(Boolean)
    .join(" ");

  const viewportClass = ["kind-words-ticker__viewport", isDragging ? "is-dragging" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="kind-words-ticker" aria-label="Testimonials">
      <div
        ref={viewportRef}
        className={viewportClass}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onLostPointerCapture={onPointerUp}
      >
        <ul ref={trackRef} className={trackClass}>
          {loopTiles.map((item, index) => (
            <li
              key={`${item.id}-${index}`}
              className="kind-words-ticker__item"
              aria-hidden={index >= tiles.length ? true : undefined}
            >
              <TestimonialTile {...item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
