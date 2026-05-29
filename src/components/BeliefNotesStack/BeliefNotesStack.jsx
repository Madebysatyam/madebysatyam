import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import useIsMobile from "../../hooks/useIsMobile.js";
import { DURATION, EASE_OUT } from "../../motion/presets.js";

/** Visual depth in stack — index 0 is front / interactive */
const STACK_LAYOUT_DESKTOP = [
  { x: 0, y: 0, rotate: -1.5, scale: 1 },
  { x: 32, y: 28, rotate: 2.5, scale: 0.98 },
  { x: -22, y: 52, rotate: -3.5, scale: 0.96 },
  { x: 18, y: 72, rotate: 2, scale: 0.94 },
];

const STACK_LAYOUT_MOBILE = [
  { x: 0, y: 0, rotate: -1.5, scale: 1 },
  { x: 14, y: 22, rotate: 2.5, scale: 0.98 },
  { x: -10, y: 44, rotate: -3.5, scale: 0.96 },
  { x: 8, y: 64, rotate: 2, scale: 0.94 },
];

const BACK_STACK_LAYOUT_DESKTOP = STACK_LAYOUT_DESKTOP[STACK_LAYOUT_DESKTOP.length - 1];
const BACK_STACK_LAYOUT_MOBILE = STACK_LAYOUT_MOBILE[STACK_LAYOUT_MOBILE.length - 1];

function pickTallestBelief(beliefs) {
  return beliefs.reduce((tallest, belief) =>
    belief.body.length > tallest.body.length ? belief : tallest,
  );
}

export default function BeliefNotesStack({ beliefs }) {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const stackLayout = isMobile ? STACK_LAYOUT_MOBILE : STACK_LAYOUT_DESKTOP;
  const backStackLayout = isMobile ? BACK_STACK_LAYOUT_MOBILE : BACK_STACK_LAYOUT_DESKTOP;
  const [order, setOrder] = useState(() => beliefs.map((belief) => belief.id));

  const orderedBeliefs = useMemo(
    () => order.map((id) => beliefs.find((belief) => belief.id === id)).filter(Boolean),
    [beliefs, order],
  );

  const tallestBelief = useMemo(() => pickTallestBelief(beliefs), [beliefs]);

  const cycle = useCallback(() => {
    setOrder((current) => [...current.slice(1), current[0]]);
  }, []);

  return (
    <div className="belief-notes-stack" aria-label="Belief notes stack">
      <p className="belief-notes-stack__hint text-style-label-small">
        Tap the top note to read the next
      </p>
      <div className="belief-notes-stack__pile">
        <div
          className="belief-notes-stack__bounds"
          aria-hidden="true"
          style={{ "--belief-stack-tail": `${backStackLayout.y}px` }}
        >
          <div className={`belief-note belief-note--sizer belief-note--${tallestBelief.accent}`}>
            <div className="belief-note__inner">
              <h3 className="belief-note__title">{tallestBelief.title}</h3>
              <p className="belief-note__body">{tallestBelief.body}</p>
            </div>
          </div>
          <div className="belief-notes-stack__stack-tail" />
        </div>
        {orderedBeliefs.map((belief, stackIndex) => {
          const layout = stackLayout[stackIndex] ?? stackLayout[stackLayout.length - 1];
          const isTop = stackIndex === 0;
          const zIndex = orderedBeliefs.length - stackIndex;

          return (
            <motion.button
              key={belief.id}
              type="button"
              className={`belief-note belief-note--${belief.accent} belief-note--${belief.id}${isTop ? " is-top" : ""}`}
              style={{ zIndex }}
              initial={false}
              animate={{
                x: layout.x,
                y: layout.y,
                rotate: layout.rotate,
                scale: layout.scale,
              }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { duration: DURATION.base, ease: EASE_OUT }
              }
              onClick={isTop ? cycle : undefined}
              tabIndex={isTop ? 0 : -1}
              aria-hidden={!isTop}
              aria-label={
                isTop
                  ? `${belief.title}. ${belief.body} Tap to show the next belief.`
                  : undefined
              }
              disabled={!isTop}
            >
              <div className="belief-note__inner">
                <h3 className="belief-note__title">{belief.title}</h3>
                <p className="belief-note__body">{belief.body}</p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
