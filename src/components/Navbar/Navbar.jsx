import { motion, useReducedMotion } from "framer-motion";
import logo from "../../../assets/logo.svg";
import { useMatIntro } from "../../contexts/MatIntroContext.jsx";
import useIsMobile from "../../hooks/useIsMobile.js";
import { desktopNavRevealVariants } from "../../motion/presets.js";
import NavLinksList from "./NavLinksList.jsx";
import MobileNavbarPill from "./MobileNavbarPill.jsx";
import useNavScrollReveal from "./useNavScrollReveal.js";

/**
 * Site-wide primary navigation.
 *
 * Desktop / tablet: compact frosted notch (default); hides while scrolling,
 * returns with blur dissolve after scroll pause.
 * Mobile: sticky bottom pill.
 */
export default function Navbar() {
  const { isMatReady } = useMatIntro();
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  const isNavVisible = useNavScrollReveal({ disabled: isMobile || reduced });

  if (!isMatReady) {
    return null;
  }

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

      <div className="site-header-shell">
        <motion.header
          className="site-header"
          initial={false}
          animate={isNavVisible ? "visible" : "hidden"}
          variants={desktopNavRevealVariants(reduced)}
        >
          <div className="site-header__inner">
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
          </div>

          <nav className="site-nav" id="site-nav-panel" aria-label="Primary">
            <NavLinksList isMobile={false} isOpen={false} reduced={reduced} onNavigate={() => {}} />
          </nav>
        </motion.header>
      </div>
    </>
  );
}
