import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import cursorLogoMp4 from "../../../assets/cursor-logo-dark.mp4";
import cursorLogoPoster from "../../../assets/cursor-logo-poster.png";

const BUILT_WITH_LINE_ONE = "Built with intent, not templates.";
const BUILT_WITH_LINE_TWO = "Made in Cursor.";
const DESKTOP_BUILT_LINE = "(min-width: 810px)";

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
  const inViewRef = useRef(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    const element = rootRef.current;
    if (!video || !element || reducedMotion === true) {
      return undefined;
    }

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.loop = true;

    const isShown = () => element.getClientRects().length > 0;

    const play = () => {
      if (!inViewRef.current || !isShown()) {
        return;
      }

      const pending = video.play();
      pending?.catch(() => {});
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = Boolean(entry?.isIntersecting) && isShown();
        if (inViewRef.current) {
          play();
          return;
        }

        video.pause();
      },
      { threshold: 0 },
    );

    const resume = () => play();

    observer.observe(element);
    video.addEventListener("loadeddata", play);
    video.addEventListener("canplay", play);
    window.addEventListener("touchstart", resume, { passive: true });
    window.addEventListener("pageshow", resume);

    return () => {
      observer.disconnect();
      video.removeEventListener("loadeddata", play);
      video.removeEventListener("canplay", play);
      window.removeEventListener("touchstart", resume);
      window.removeEventListener("pageshow", resume);
      video.pause();
    };
  }, [reducedMotion]);

  return (
    <span ref={rootRef} className="site-footer__built-cursor-logo">
      <video
        ref={videoRef}
        className="site-footer__built-cursor-video"
        src={cursorLogoMp4}
        muted
        loop
        playsInline
        preload="auto"
        poster={cursorLogoPoster}
        aria-hidden="true"
      />
    </span>
  );
}

function useDesktopBuiltLine() {
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia(DESKTOP_BUILT_LINE).matches);

  useEffect(() => {
    const query = window.matchMedia(DESKTOP_BUILT_LINE);
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

export default function FooterBuiltWith() {
  const isDesktop = useDesktopBuiltLine();

  return (
    <p className="site-footer__built text-style-label-small">
      <span className="site-footer__built-inner">
        {isDesktop ? (
          <span className="site-footer__built-desktop-line">
            <BuiltWithShimmerLine text={`${BUILT_WITH_LINE_ONE} ${BUILT_WITH_LINE_TWO}`} />
            <CursorLogo />
          </span>
        ) : (
          <>
            <span className="site-footer__built-line">
              <BuiltWithShimmerLine text={BUILT_WITH_LINE_ONE} />
            </span>
            <span className="site-footer__built-line site-footer__built-line--cursor">
              <BuiltWithShimmerLine text={BUILT_WITH_LINE_TWO} />
              <CursorLogo />
            </span>
          </>
        )}
      </span>
    </p>
  );
}
