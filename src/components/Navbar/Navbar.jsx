import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import logo from "../../../assets/logo.svg";
import useIsMobile from "../../hooks/useIsMobile.js";
import {
  backdropVariants,
  mobileNavPanelVariants,
  navbarBrandMotion,
} from "../../motion/presets.js";
import NavLinksList from "./NavLinksList.jsx";
import useNavbarScroll from "./useNavbarScroll.js";

/**
 * Site-wide primary navigation.
 *
 * Desktop: full header bar; scroll down → centred compact notch (logo + links).
 * Mobile: full header + hamburger; menu opens as viewport-fixed drawer (no compact morph).
 *
 * Mount once in App.jsx — do not duplicate per page.
 */
export default function Navbar() {
  const shellRef = useRef(null);
  const headerRef = useRef(null);
  const expandedHeightRef = useRef(0);
  const [isOpen, setIsOpen] = useState(false);
  const [placeholderHeight, setPlaceholderHeight] = useState(0);
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  const isScrollCompact = useNavbarScroll({ disabled: isOpen || isMobile });
  const isCompact = isScrollCompact && !isOpen && !isMobile;

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

  const closeMenu = useCallback(() => setIsOpen(false), []);

  const toggleMenu = useCallback(() => {
    setIsOpen((open) => !open);
  }, []);

  useLayoutEffect(() => {
    if (!headerRef.current) {
      setPlaceholderHeight(isMobile ? 72 : 88);
      return;
    }

    if (isCompact) {
      setPlaceholderHeight(expandedHeightRef.current);
    } else {
      syncOffsets();
    }
  }, [isCompact, isOpen, isMobile, syncOffsets]);

  useEffect(() => {
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
  }, [syncOffsets]);

  useEffect(() => {
    document.body.classList.toggle("is-nav-menu-open", isOpen && isMobile);
    return () => document.body.classList.remove("is-nav-menu-open");
  }, [isOpen, isMobile]);

  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") closeMenu();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [closeMenu]);

  return (
    <>
      <a className="skip-link text-style-label-small" href="#main">
        Skip to content
      </a>

      <motion.div
        className="site-header-placeholder"
        aria-hidden="true"
        style={{ height: placeholderHeight }}
      />

      <div
        ref={shellRef}
        className={`site-header-shell${isCompact ? " is-compact" : ""}${isMobile ? " is-mobile" : ""}`}
      >
        <header
          ref={headerRef}
          className={[
            "site-header",
            isOpen && isMobile ? "is-nav-open" : "",
            isCompact ? "is-compact" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <motion.div className="site-header__inner" initial={false}>
            <motion.a
              className="site-brand"
              href="/"
              aria-label="Madebysatyam home"
              initial={false}
              animate={navbarBrandMotion(reduced)}
              style={{ display: "inline-flex", originX: 0 }}
            >
              <img
                className="site-brand__logo"
                src={logo}
                alt=""
                width="166"
                height="56"
                decoding="async"
              />
            </motion.a>
            {isMobile && (
              <button
                type="button"
                className="site-nav__toggle"
                aria-expanded={isOpen}
                aria-controls="site-nav-panel"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                onClick={toggleMenu}
              >
                <span className="site-nav__toggle-icon" aria-hidden="true">
                  <span className="site-nav__toggle-line" />
                  <span className="site-nav__toggle-line" />
                  <span className="site-nav__toggle-line" />
                </span>
              </button>
            )}
          </motion.div>

          {!isMobile && (
            <nav className="site-nav" id="site-nav-panel" aria-label="Primary">
              <NavLinksList
                isMobile={false}
                isOpen={false}
                isCompact={isCompact}
                reduced={reduced}
                onNavigate={closeMenu}
              />
            </nav>
          )}
        </header>

        {isMobile && (
          <AnimatePresence>
            {isOpen && (
              <>
                <motion.button
                  type="button"
                  className="site-nav__backdrop site-nav__backdrop--drawer"
                  aria-hidden="true"
                  tabIndex={-1}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={backdropVariants(reduced)}
                  onClick={closeMenu}
                />
                <motion.nav
                  className="site-nav site-nav--drawer"
                  id="site-nav-panel"
                  aria-label="Primary"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={mobileNavPanelVariants(reduced)}
                >
                  <NavLinksList
                    isMobile={isMobile}
                    isOpen={isOpen}
                    isCompact={false}
                    reduced={reduced}
                    onNavigate={closeMenu}
                  />
                </motion.nav>
              </>
            )}
          </AnimatePresence>
        )}
      </div>
    </>
  );
}
