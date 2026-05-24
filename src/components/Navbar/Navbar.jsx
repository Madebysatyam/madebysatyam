import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import logo from "../../../assets/logo.svg";
import useIsMobile from "../../hooks/useIsMobile.js";
import NavLinksList from "./NavLinksList.jsx";
import MobileNavbarPill from "./MobileNavbarPill.jsx";
import useNavbarScroll from "./useNavbarScroll.js";

/**
 * Site-wide primary navigation.
 *
 * Desktop: full header bar; scroll down → centred compact notch (logo + links).
 * Mobile: sticky bottom pill (logo + menu); expands vertically in place.
 *
 * Mount once in App.jsx — do not duplicate per page.
 */
export default function Navbar() {
  const shellRef = useRef(null);
  const headerRef = useRef(null);
  const expandedHeightRef = useRef(0);
  const [placeholderHeight, setPlaceholderHeight] = useState(0);
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  const isScrollCompact = useNavbarScroll({ disabled: isMobile });
  const isCompact = isScrollCompact && !isMobile;

  const syncOffsets = useCallback(() => {
    if (!headerRef.current) return;

    const height = headerRef.current.offsetHeight;
    const offset = `${height}px`;

    headerRef.current.style.setProperty("--site-header-offset", offset);
    shellRef.current?.style.setProperty("--site-header-offset", offset);

    if (!isCompact) {
      expandedHeightRef.current = height;
      setPlaceholderHeight(height);
    }
  }, [isCompact]);

  useLayoutEffect(() => {
    if (isMobile) {
      setPlaceholderHeight(0);
      return;
    }

    if (!headerRef.current) {
      setPlaceholderHeight(88);
      return;
    }

    if (isCompact) {
      setPlaceholderHeight(expandedHeightRef.current);
    } else {
      syncOffsets();
    }
  }, [isCompact, isMobile, syncOffsets]);

  useEffect(() => {
    if (isMobile) return undefined;

    syncOffsets();
    window.addEventListener("resize", syncOffsets);

    let observer;
    if (typeof ResizeObserver !== "undefined" && headerRef.current) {
      observer = new ResizeObserver(syncOffsets);
      observer.observe(headerRef.current);
    }

    return () => {
      window.removeEventListener("resize", syncOffsets);
      observer?.disconnect();
    };
  }, [isMobile, syncOffsets]);

  if (isMobile) {
    return (
      <>
        <a className="skip-link text-style-label-small" href="#main">
          Skip to content
        </a>
        <MobileNavbarPill />
      </>
    );
  }

  return (
    <>
      <a className="skip-link text-style-label-small" href="#main">
        Skip to content
      </a>

      <motion.div
        className="site-header-placeholder"
        aria-hidden="true"
        animate={{ height: placeholderHeight }}
        transition={{ duration: reduced ? 0 : 0.45, ease: [0.4, 0, 0.2, 1] }}
      />

      <motion.div
        ref={shellRef}
        className={`site-header-shell${isCompact ? " is-compact" : ""}`}
      >
        <header
          ref={headerRef}
          className={["site-header", isCompact ? "is-compact" : ""].filter(Boolean).join(" ")}
        >
          <motion.div className="site-header__inner" layout="position">
            <a className="site-brand" href="/" aria-label="Madebysatyam home">
              <img
                className="site-brand__logo"
                src={logo}
                alt=""
                width="166"
                height="56"
                decoding="async"
              />
            </a>
          </motion.div>

          <nav className="site-nav" id="site-nav-panel" aria-label="Primary">
            <NavLinksList isMobile={false} isOpen={false} reduced={reduced} onNavigate={() => {}} />
          </nav>
        </header>
      </motion.div>
    </>
  );
}
