import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import logoDark from "../../assets/logo.svg";
import logoLight from "../../assets/logo-light.svg";
import useIsMobile from "../hooks/useIsMobile.js";
import {
  backdropVariants,
  mobileNavItemVariants,
  mobileNavListVariants,
  mobileNavPanelVariants,
} from "../motion/presets.js";
import NavLink from "./NavLink.jsx";

const NAV_LINKS = [
  {
    href: "#work",
    label: "Projects",
    className: "site-nav__link--projects",
  },
  {
    href: "#playground",
    label: "Playground",
    className: "site-nav__link--playground",
  },
  {
    href: "#about",
    label: "About",
    className: "site-nav__link--about",
  },
  {
    href: "#contact",
    label: "Contact",
    className: "site-nav__link--contact",
  },
];

export default function Navbar() {
  const headerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  const syncHeaderOffset = useCallback(() => {
    if (!headerRef.current) return;
    headerRef.current.style.setProperty(
      "--site-header-offset",
      `${headerRef.current.offsetHeight}px`
    );
  }, []);

  const closeMenu = useCallback(() => setIsOpen(false), []);

  const toggleMenu = useCallback(() => {
    setIsOpen((open) => !open);
  }, []);

  useEffect(() => {
    syncHeaderOffset();
    window.addEventListener("resize", syncHeaderOffset);

    let observer;
    if (typeof ResizeObserver !== "undefined" && headerRef.current) {
      observer = new ResizeObserver(syncHeaderOffset);
      observer.observe(headerRef.current);
    }

    return () => {
      window.removeEventListener("resize", syncHeaderOffset);
      observer?.disconnect();
    };
  }, [syncHeaderOffset]);

  useEffect(() => {
    syncHeaderOffset();
  }, [isOpen, syncHeaderOffset]);

  useEffect(() => {
    document.body.classList.toggle("is-nav-menu-open", isOpen);
    return () => document.body.classList.remove("is-nav-menu-open");
  }, [isOpen]);

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

  const navState = !isMobile ? "desktop" : isOpen ? "open" : "closed";

  return (
    <>
      <a className="skip-link text-style-label-small" href="#main">
        Skip to content
      </a>

      <header
        ref={headerRef}
        className={`site-header${isOpen ? " is-nav-open" : ""}`}
      >
        <motion.div
          className="site-header__inner"
          layout={!reduced && isMobile}
          transition={{ duration: reduced ? 0 : 0.2 }}
        >
          <a className="site-brand" href="/" aria-label="Madebysatyam home">
            <img
              className="site-brand__logo site-brand__logo--dark"
              src={logoDark}
              alt=""
              width="166"
              height="56"
              decoding="async"
            />
            <img
              className="site-brand__logo site-brand__logo--light"
              src={logoLight}
              alt=""
              width="166"
              height="56"
              decoding="async"
            />
          </a>
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
        </motion.div>

        <motion.nav
          className="site-nav"
          id="site-nav-panel"
          aria-label="Primary"
          aria-hidden={isMobile && !isOpen}
          initial={false}
          animate={navState}
          variants={mobileNavPanelVariants(reduced)}
        >
          <motion.ul
            className="site-nav__list"
            initial={false}
            animate={navState}
            variants={mobileNavListVariants(reduced)}
          >
            {NAV_LINKS.map((link) => (
              <motion.li
                key={link.href}
                variants={mobileNavItemVariants(reduced)}
              >
                <NavLink
                  href={link.href}
                  label={link.label}
                  className={link.className}
                  onNavigate={closeMenu}
                />
              </motion.li>
            ))}
          </motion.ul>
        </motion.nav>

        <AnimatePresence>
          {isOpen && isMobile && (
            <motion.button
              type="button"
              className="site-nav__backdrop"
              aria-hidden="true"
              tabIndex={-1}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={backdropVariants(reduced)}
              onClick={closeMenu}
            />
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
