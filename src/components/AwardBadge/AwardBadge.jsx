import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import useIsMobile from "../../hooks/useIsMobile.js";

const MAX_TILT_DEG = 14;
const SPRING = { stiffness: 260, damping: 28, mass: 0.85 };

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export default function AwardBadge({ src, alt, className = "" }) {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const shellRef = useRef(null);
  const gyroBaseRef = useRef(null);
  const [gyroEnabled, setGyroEnabled] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, SPRING);
  const springRotateY = useSpring(rotateY, SPRING);

  const resetTilt = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    gyroBaseRef.current = null;
  }, [rotateX, rotateY]);

  const applyPointerTilt = useCallback(
    (clientX, clientY) => {
      const shell = shellRef.current;
      if (!shell) return;

      const rect = shell.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const px = (clientX - rect.left) / rect.width - 0.5;
      const py = (clientY - rect.top) / rect.height - 0.5;

      rotateY.set(clamp(px * MAX_TILT_DEG * 2.2, -MAX_TILT_DEG, MAX_TILT_DEG));
      rotateX.set(clamp(-py * MAX_TILT_DEG * 2.2, -MAX_TILT_DEG, MAX_TILT_DEG));
    },
    [rotateX, rotateY],
  );

  const startGyro = useCallback(async () => {
    if (gyroEnabled || reduced) return true;

    if (typeof DeviceOrientationEvent?.requestPermission === "function") {
      try {
        const permission = await DeviceOrientationEvent.requestPermission();
        if (permission !== "granted") return false;
      } catch {
        return false;
      }
    }

    setGyroEnabled(true);
    return true;
  }, [gyroEnabled, reduced]);

  useEffect(() => {
    if (!isMobile || reduced) return undefined;
    if (typeof DeviceOrientationEvent?.requestPermission === "function") return undefined;

    setGyroEnabled(true);
    return () => setGyroEnabled(false);
  }, [isMobile, reduced]);

  useEffect(() => {
    if (reduced || !isMobile || !gyroEnabled) return undefined;

    const onOrientation = (event) => {
      const { beta, gamma } = event;
      if (beta == null || gamma == null) return;

      if (!gyroBaseRef.current) {
        gyroBaseRef.current = { beta, gamma };
        return;
      }

      const deltaGamma = gamma - gyroBaseRef.current.gamma;
      const deltaBeta = beta - gyroBaseRef.current.beta;

      rotateY.set(clamp(deltaGamma * 0.55, -MAX_TILT_DEG, MAX_TILT_DEG));
      rotateX.set(clamp(-deltaBeta * 0.55, -MAX_TILT_DEG, MAX_TILT_DEG));
    };

    window.addEventListener("deviceorientation", onOrientation, true);
    return () => window.removeEventListener("deviceorientation", onOrientation, true);
  }, [gyroEnabled, isMobile, reduced, rotateX, rotateY]);

  useEffect(() => {
    if (reduced || isMobile) return undefined;

    const shell = shellRef.current;
    if (!shell) return undefined;

    const onMove = (event) => applyPointerTilt(event.clientX, event.clientY);
    const onLeave = () => resetTilt();

    shell.addEventListener("mousemove", onMove);
    shell.addEventListener("mouseleave", onLeave);

    return () => {
      shell.removeEventListener("mousemove", onMove);
      shell.removeEventListener("mouseleave", onLeave);
    };
  }, [applyPointerTilt, isMobile, reduced, resetTilt]);

  useEffect(() => {
    if (!isMobile) {
      setGyroEnabled(false);
      resetTilt();
    }
  }, [isMobile, resetTilt]);

  const onMobilePointerDown = useCallback(async () => {
    if (!isMobile || reduced) return;
    await startGyro();
  }, [isMobile, reduced, startGyro]);

  const shellClassName = ["experience-tile__badge-shell", className].filter(Boolean).join(" ");

  const badgeImage = (
    <img className="experience-tile__badge" src={src} alt={alt} loading="lazy" decoding="async" />
  );

  if (reduced) {
    return (
      <div ref={shellRef} className={shellClassName}>
        {badgeImage}
      </div>
    );
  }

  return (
    <div
      ref={shellRef}
      className={shellClassName}
      onPointerDown={isMobile ? onMobilePointerDown : undefined}
    >
      <motion.div
        className="experience-tile__badge-tilt"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformPerspective: 900,
        }}
      >
        {badgeImage}
      </motion.div>
    </div>
  );
}
