import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import useIsMobile from "../../hooks/useIsMobile.js";
import { getStickerPlacement, MAT_STICKERS } from "./matStickers.js";

/** Width multipliers — mobile unchanged; desktop boosted only at 810px+. */
const MOBILE_STICKER_SCALE = 0.72;
const DESKTOP_STICKER_SCALE = 1.2;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function MatSticker({
  sticker,
  anchorX,
  anchorY,
  rotateDeg,
  containerRef,
  ready,
  sizeRem,
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPlaced, setIsPlaced] = useState(false);
  const reduced = useReducedMotion();

  const getStickerBounds = () => {
    const container = containerRef.current;
    if (!container) {
      return null;
    }

    const rect = container.getBoundingClientRect();
    const remPx = Number.parseFloat(
      getComputedStyle(document.documentElement).fontSize,
    );
    const width = sizeRem * remPx;
    const height = width * 1.05;

    return { rect, width, height };
  };

  useLayoutEffect(() => {
    if (!ready) {
      return;
    }

    const bounds = getStickerBounds();
    if (!bounds) {
      return;
    }

    const { rect, width, height } = bounds;
    const centerX = (anchorX / 100) * rect.width;
    const centerY = (anchorY / 100) * rect.height;

    x.set(clamp(centerX - width / 2, 0, rect.width - width));
    y.set(clamp(centerY - height / 2, 0, rect.height - height));
    setIsPlaced(true);
  }, [ready, anchorX, anchorY, sizeRem, containerRef, x, y]);

  useLayoutEffect(() => {
    if (!ready || !isPlaced) {
      return;
    }

    const bounds = getStickerBounds();
    if (!bounds) {
      return;
    }

    const { rect, width, height } = bounds;
    x.set(clamp(x.get(), 0, rect.width - width));
    y.set(clamp(y.get(), 0, rect.height - height));
  }, [ready, isPlaced, sizeRem, containerRef, x, y]);

  const clampToMat = () => {
    const bounds = getStickerBounds();
    if (!bounds) {
      return;
    }

    const { rect, width, height } = bounds;
    x.set(clamp(x.get(), 0, rect.width - width));
    y.set(clamp(y.get(), 0, rect.height - height));
  };

  return (
    <motion.div
      className={`hero-mat-sticker${isDragging ? " is-dragging" : ""}`}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        x,
        y,
        width: `${sizeRem}rem`,
        rotate: rotateDeg,
        opacity: isPlaced ? 1 : 0,
        "--sticker-mask": `url("${sticker.src}")`,
      }}
      drag={ready && !reduced}
      dragConstraints={containerRef}
      dragElastic={0}
      dragMomentum={false}
      whileDrag={{
        scale: 1.06,
        zIndex: 20,
      }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => {
        clampToMat();
        setIsDragging(false);
      }}
    >
      <span className="hero-mat-sticker__shimmer" aria-hidden="true" />
      <img
        className="hero-mat-sticker__art"
        src={sticker.src}
        alt={sticker.alt}
        draggable={false}
      />
    </motion.div>
  );
}

export default function HeroMatStickers() {
  const containerRef = useRef(null);
  const [ready, setReady] = useState(false);
  const isMobile = useIsMobile();
  const sizeScale = isMobile ? MOBILE_STICKER_SCALE : DESKTOP_STICKER_SCALE;

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return undefined;
    }

    const markReady = () => setReady(true);

    markReady();

    const observer = new ResizeObserver(markReady);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="hero-mat-stickers"
      aria-label="Draggable stickers on cutting mat"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, delay: 0.55 }}
    >
      {MAT_STICKERS.map((sticker) => {
        const { x, y, rotateDeg } = getStickerPlacement(sticker, isMobile);

        return (
          <MatSticker
            key={sticker.id}
            sticker={sticker}
            anchorX={x}
            anchorY={y}
            rotateDeg={rotateDeg}
            containerRef={containerRef}
            ready={ready}
            sizeRem={sticker.sizeRem * sizeScale}
          />
        );
      })}
    </motion.div>
  );
}
