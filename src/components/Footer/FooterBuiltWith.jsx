import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import cursorLogoMp4 from "../../../assets/cursor-logo-dark.mp4";
import cursorLogoWebm from "../../../assets/cursor-logo-dark.webm";
import cursorLogoPoster from "../../../assets/cursor-logo-poster.png";

const BUILT_WITH_LINE_ONE = "Built with intent, not templates.";
const BUILT_WITH_LINE_TWO = "Made in Cursor.";
const REPLAY_DELAY_MS = 750;

function BuiltWithShimmerLine({ text }) {
  return (
    <span className="site-footer__built-shimmer-wrap">
      <span className="site-footer__built-text">{text}</span>
      <span className="site-footer__built-shimmer" aria-hidden="true">
        {text}
      </span>
    </span>
  );
}

function CursorLogo() {
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const hoveringRef = useRef(false);
  const playedInViewRef = useRef(false);
  const replayTimerRef = useRef(0);
  const reducedMotion = useReducedMotion();

  const isVisible = () => {
    const element = rootRef.current;
    return Boolean(element && element.getClientRects().length > 0);
  };

  const play = () => {
    const video = videoRef.current;
    if (!video || reducedMotion !== false || !isVisible()) {
      return;
    }

    video.playbackRate = 1;
    if (!video.paused && !video.ended) {
      return;
    }

    video.currentTime = 0;
    const pending = video.play();
    pending?.catch(() => {});
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return undefined;
    }

    const clearReplay = () => {
      if (replayTimerRef.current) {
        window.clearTimeout(replayTimerRef.current);
        replayTimerRef.current = 0;
      }
    };

    const onEnded = () => {
      clearReplay();
      if (!hoveringRef.current || reducedMotion !== false) {
        return;
      }

      replayTimerRef.current = window.setTimeout(() => {
        replayTimerRef.current = 0;
        if (hoveringRef.current) {
          play();
        }
      }, REPLAY_DELAY_MS);
    };

    video.addEventListener("ended", onEnded);
    return () => {
      clearReplay();
      video.removeEventListener("ended", onEnded);
    };
  }, [reducedMotion]);

  useEffect(() => {
    const element = rootRef.current;
    if (!element || reducedMotion !== false) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || playedInViewRef.current) {
          return;
        }

        playedInViewRef.current = true;
        play();
      },
      { threshold: 0.8 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const onMouseEnter = () => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    hoveringRef.current = true;
    play();
  };

  const onMouseLeave = () => {
    hoveringRef.current = false;
  };

  return (
    <span
      ref={rootRef}
      className="site-footer__built-cursor-logo"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <video
        ref={videoRef}
        className="site-footer__built-cursor-video"
        muted
        playsInline
        preload="auto"
        poster={cursorLogoPoster}
        aria-hidden="true"
      >
        <source src={cursorLogoWebm} type="video/webm" />
        <source src={cursorLogoMp4} type="video/mp4" />
      </video>
    </span>
  );
}

export default function FooterBuiltWith() {
  return (
    <p className="site-footer__built text-style-label-small">
      <svg className="site-footer__built-cursor-filter" aria-hidden="true" focusable="false">
        <filter id="site-footer-cursor-key" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  2.2 2.2 2.2 0 -0.5"
          />
        </filter>
      </svg>
      <span className="site-footer__built-inner">
        <span className="site-footer__built-desktop-line">
          <BuiltWithShimmerLine text={`${BUILT_WITH_LINE_ONE} ${BUILT_WITH_LINE_TWO}`} />
          <CursorLogo />
        </span>

        <span className="site-footer__built-line">
          <BuiltWithShimmerLine text={BUILT_WITH_LINE_ONE} />
        </span>
        <span className="site-footer__built-line site-footer__built-line--cursor">
          <BuiltWithShimmerLine text={BUILT_WITH_LINE_TWO} />
          <CursorLogo />
        </span>
      </span>
    </p>
  );
}
