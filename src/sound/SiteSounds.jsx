import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { playUiSound, primeUiSound } from "./uiSounds.js";

const INTERACTIVE = "a, button, .note-ruler";
const SCROLL_STEP = 72;
const SCROLL_TICK = 0.34;
const DRAG_CLICK = 8;

function interactiveTarget(event) {
  const node = event.target;
  if (!(node instanceof Element)) return null;
  if (node.closest("input, textarea, select, [contenteditable='true']")) return null;
  return node.closest(INTERACTIVE);
}

function leavesThisPage(target) {
  const link = target.closest("a");
  if (!link || link.target === "_blank") return false;
  let url;
  try {
    url = new URL(link.href, window.location.href);
  } catch {
    return false;
  }
  return url.origin === window.location.origin && url.pathname !== window.location.pathname;
}

export default function SiteSounds() {
  const { pathname } = useLocation();
  const skipArrive = useRef(true);

  useEffect(() => {
    if (skipArrive.current) {
      skipArrive.current = false;
      return undefined;
    }

    playUiSound("arrive", 0.85);
    return undefined;
  }, [pathname]);

  useEffect(() => {
    let alive = true;
    let pointer = null;
    const elementAt = new WeakMap();
    const elementCarry = new WeakMap();
    const rulerAt = new WeakMap();
    const meterAt = new WeakMap();
    const meterCarry = new WeakMap();
    let scrollQueued = false;
    const scrollTargets = new Set();

    const onPointerDown = (event) => {
      if (event.button !== 0) return;
      primeUiSound();
      const meter = event.target instanceof Element ? event.target.closest(".note-measure") : null;
      if (meter) {
        meterAt.set(meter, event.clientX);
        meterCarry.set(meter, 0);
      }
      const target = interactiveTarget(event);
      if (!target) return;
      pointer = { x: event.clientX, y: event.clientY, target };
      playUiSound("tap", target.classList.contains("note-ruler") ? 0.45 : 0.8);
    };

    const onPointerUp = (event) => {
      const start = pointer;
      pointer = null;
      if (!start) return;
      const moved = Math.hypot(event.clientX - start.x, event.clientY - start.y);
      if (moved > DRAG_CLICK) return;
      if (!start.target.isConnected) return;
      if (leavesThisPage(start.target)) return;
      playUiSound("lift", 0.7);
    };

    const onPointerMove = (event) => {
      if (event.buttons !== 1) return;
      const node = event.target instanceof Element ? event.target : null;
      const meter = node?.closest(".note-measure");
      if (meter) {
        const last = meterAt.get(meter);
        meterAt.set(meter, event.clientX);
        if (last == null) return;
        const step = takeStep(meterCarry.get(meter) ?? 0, Math.abs(event.clientX - last));
        meterCarry.set(meter, step.carry);
        if (step.play) playUiSound("tick", SCROLL_TICK);
        return;
      }

      const ruler = node?.closest(".note-ruler");
      if (!ruler) return;
      const last = rulerAt.get(ruler) ?? event.clientX;
      const next = event.clientX;
      if (Math.abs(next - last) < 14) return;
      rulerAt.set(ruler, next);
      playUiSound("tick", 0.4);
    };

    const onKeyDown = (event) => {
      if (event.repeat) return;
      if (event.key !== "Enter" && event.key !== " ") return;
      const target = interactiveTarget(event);
      if (!target) return;
      primeUiSound();
      playUiSound("tap", 0.75);
    };

    const takeStep = (carry, delta) => {
      const next = carry + delta;
      if (next < SCROLL_STEP) return { carry: next, play: false };
      return { carry: next % SCROLL_STEP, play: true };
    };

    const flushScroll = () => {
      scrollQueued = false;
      if (!alive) return;
      const targets = [...scrollTargets];
      scrollTargets.clear();

      targets.forEach((target) => {
        if (!(target instanceof Element)) return;
        if (target === document.documentElement || target === document.body) return;

        const position = target.scrollLeft;
        const previous = elementAt.get(target);
        elementAt.set(target, position);
        if (previous == null) return;

        const step = takeStep(elementCarry.get(target) ?? 0, Math.abs(position - previous));
        elementCarry.set(target, step.carry);
        if (step.play) playUiSound("tick", SCROLL_TICK);
      });
    };

    const onScroll = (event) => {
      scrollTargets.add(event.target);
      if (scrollQueued) return;
      scrollQueued = true;
      window.requestAnimationFrame(flushScroll);
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("pointerup", onPointerUp, true);
    document.addEventListener("pointermove", onPointerMove, true);
    document.addEventListener("keydown", onKeyDown, true);
    document.addEventListener("scroll", onScroll, { capture: true, passive: true });

    return () => {
      alive = false;
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("pointerup", onPointerUp, true);
      document.removeEventListener("pointermove", onPointerMove, true);
      document.removeEventListener("keydown", onKeyDown, true);
      document.removeEventListener("scroll", onScroll, { capture: true });
    };
  }, []);

  return null;
}
