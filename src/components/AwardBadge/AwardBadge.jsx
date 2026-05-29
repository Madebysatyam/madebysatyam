import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import usePrefersTouchTilt from "../../hooks/usePrefersTouchTilt.js";

const MAX_TILT_DEG = 14;
const GYRO_GAIN = 0.7;
const SPRING = { stiffness: 260, damping: 28, mass: 0.85 };

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function needsOrientationPermission() {
  return (
    typeof DeviceOrientationEvent !== "undefined" &&
    typeof DeviceOrientationEvent.requestPermission === "function"
  );
}

function requestOrientationAccess() {
  if (needsOrientationPermission()) {
    return DeviceOrientationEvent.requestPermission();
  }
  return Promise.resolve("granted");
}

export default function AwardBadge({ src, alt, className = "" }) {
  const reduced = useReducedMotion();
  const prefersTouchTilt = usePrefersTouchTilt();
  const shellRef = useRef(null);
  const gyroBaseRef = useRef(null);
  const listenersAttachedRef = useRef(false);

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

  const onOrientation = useCallback(
    (event) => {
      const { beta, gamma } = event;
      if (beta == null || gamma == null) return;

      if (!gyroBaseRef.current) {
        gyroBaseRef.current = { beta, gamma };
        return;
      }

      const deltaGamma = gamma - gyroBaseRef.current.gamma;
      const deltaBeta = beta - gyroBaseRef.current.beta;

      rotateY.set(clamp(deltaGamma * GYRO_GAIN, -MAX_TILT_DEG, MAX_TILT_DEG));
      rotateX.set(clamp(-deltaBeta * GYRO_GAIN, -MAX_TILT_DEG, MAX_TILT_DEG));
    },
    [rotateX, rotateY],
  );

  const attachGyroListeners = useCallback(() => {
    if (listenersAttachedRef.current) return;
    listenersAttachedRef.current = true;
    gyroBaseRef.current = null;
    window.addEventListener("deviceorientation", onOrientation);
    window.addEventListener("deviceorientationabsolute", onOrientation);
  }, [onOrientation]);

  const detachGyroListeners = useCallback(() => {
    if (!listenersAttachedRef.current) return;
    listenersAttachedRef.current = false;
    window.removeEventListener("deviceorientation", onOrientation);
    window.removeEventListener("deviceorientationabsolute", onOrientation);
    resetTilt();
  }, [onOrientation, resetTilt]);

  const activateGyro = useCallback(() => {
    if (!prefersTouchTilt || reduced) return;

    if (listenersAttachedRef.current) return;

    requestOrientationAccess()
      .then((state) => {
        if (state === "granted") {
          attachGyroListeners();
        }
      })
      .catch(() => {});
  }, [attachGyroListeners, prefersTouchTilt, reduced]);

  useEffect(() => {
    if (!prefersTouchTilt || reduced || needsOrientationPermission()) {
      return undefined;
    }

    attachGyroListeners();
    return detachGyroListeners;
  }, [attachGyroListeners, detachGyroListeners, prefersTouchTilt, reduced]);

  useEffect(() => {
    if (prefersTouchTilt || reduced) return undefined;

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
  }, [applyPointerTilt, prefersTouchTilt, reduced, resetTilt]);

  useEffect(
    () => () => {
      detachGyroListeners();
    },
    [detachGyroListeners],
  );

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
      onTouchStart={prefersTouchTilt ? activateGyro : undefined}
      onClick={prefersTouchTilt ? activateGyro : undefined}
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
