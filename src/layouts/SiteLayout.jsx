import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { MatIntroProvider } from "../contexts/MatIntroContext.jsx";
import { preloadListingHero } from "../lib/listingHeroes.js";

function PageEdgeBlur({ edge }) {
  return (
    <div className={`page-edge-blur page-edge-blur--${edge}`} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}

export default function SiteLayout() {
  const reduced = useReducedMotion();
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [isMatReady, setMatReady] = useState(!isHome);

  useEffect(() => {
    setMatReady(!isHome);
  }, [isHome]);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    const sectionSelector =
      "main > section:not(:first-child), main > article, .about-page__section, .page-home > .site-footer";

    const viewHeight = () => window.visualViewport?.height ?? window.innerHeight;

    const sections = () => document.querySelectorAll(sectionSelector);

    const markVisibleOnOpen = () => {
      const height = viewHeight();
      sections().forEach((section) => {
        const { top, bottom } = section.getBoundingClientRect();
        section.classList.toggle("is-visible-on-load", top < height && bottom > 0);
      });
    };

    const updateBlur = () => {
      if (reduced) return;

      const height = viewHeight();
      sections().forEach((section) => {
        if (section.classList.contains("is-visible-on-load")) {
          section.style.removeProperty("--section-blur");
          return;
        }

        const { top, height: sectionHeight } = section.getBoundingClientRect();
        const travel = Math.max(sectionHeight * 0.66, 1);
        const progress = Math.min(1, Math.max(0, (height - top) / travel));
        const blur = 16 * (1 - progress);
        section.style.setProperty("--section-blur", blur < 0.2 ? "0px" : `${blur.toFixed(2)}px`);
      });
    };

    let frame = 0;
    let stillOpening = true;

    const measure = () => {
      if (stillOpening) markVisibleOnOpen();
      updateBlur();
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        measure();
      });
    };

    const onScroll = () => {
      if (window.scrollY > 0) stillOpening = false;
      schedule();
    };

    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(measure);
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", schedule);
    window.visualViewport?.addEventListener("resize", schedule);
    window.visualViewport?.addEventListener("scroll", onScroll);

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", schedule);
      window.visualViewport?.removeEventListener("resize", schedule);
      window.visualViewport?.removeEventListener("scroll", onScroll);
      sections().forEach((section) => {
        section.classList.remove("is-visible-on-load");
        section.style.removeProperty("--section-blur");
      });
    };
  }, [pathname, reduced]);

  useEffect(() => {
    preloadListingHero(pathname);
  }, [pathname]);

  return (
    <MatIntroProvider value={{ isMatReady, setMatReady }}>
      <Navbar />
      <PageEdgeBlur edge="top" />
      <PageEdgeBlur edge="bottom" />
      <div className="page-home">
        <Outlet context={{ reduced }} />
        <Footer />
      </div>
    </MatIntroProvider>
  );
}
