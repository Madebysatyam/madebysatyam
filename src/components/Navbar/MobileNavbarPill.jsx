import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import logo from "../../../assets/logo.svg";
import NavLinksList from "./NavLinksList.jsx";
import useMobilePillNavScroll from "./useMobilePillNavScroll.js";

export default function MobileNavbarPill() {
  const [isOpen, setIsOpen] = useState(false);
  const reduced = useReducedMotion();
  const isPillVisible = useMobilePillNavScroll({ disabled: isOpen });

  const closeMenu = useCallback(() => setIsOpen(false), []);

  const toggleMenu = useCallback(() => {
    setIsOpen((open) => !open);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("is-mobile-nav-open", isOpen);
    return () => document.body.classList.remove("is-mobile-nav-open");
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") closeMenu();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [closeMenu]);

  const shellClass = [
    "mobile-nav-shell",
    isPillVisible ? "" : "is-shell-hidden",
    reduced ? "is-reduced-motion" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const pillClass = ["mobile-nav-pill", isOpen ? "is-open" : ""].filter(Boolean).join(" ");

  return (
    <div className={shellClass}>
      <div className={pillClass}>
        <div className="mobile-nav-pill__menu-wrap" aria-hidden={!isOpen} inert={!isOpen}>
          <nav
            id="mobile-nav-pill-menu"
            className="mobile-nav-pill__menu site-nav"
            aria-label="Primary"
          >
            <NavLinksList
              isMobile
              isOpen={isOpen}
              reduced={reduced}
              layout="pill"
              onNavigate={closeMenu}
            />
          </nav>
        </div>

        <div className="mobile-nav-pill__bar" onClick={toggleMenu}>
          <a
            className="mobile-nav-pill__brand"
            href="/"
            aria-label="Madebysatyam home"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              className="mobile-nav-pill__logo"
              src={logo}
              alt=""
              width="166"
              height="56"
              decoding="async"
            />
          </a>

          <button
            type="button"
            className={`mobile-nav-pill__toggle site-nav__toggle${isOpen ? " is-open" : ""}`}
            aria-expanded={isOpen}
            aria-controls="mobile-nav-pill-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={(event) => {
              event.stopPropagation();
              toggleMenu();
            }}
          >
            <span className="site-nav__toggle-icon" aria-hidden="true">
              <span className="site-nav__toggle-line" />
              <span className="site-nav__toggle-line" />
              <span className="site-nav__toggle-line" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
