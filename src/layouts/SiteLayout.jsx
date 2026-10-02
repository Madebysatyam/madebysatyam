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
    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sections = () => document.querySelectorAll(sectionSelector);
    const touched = new Set();
    let targets = new WeakMap();
    let cancelled = false;

    const atTop = () => window.scrollY <= 1;

    const viewHeight = () => window.visualViewport?.height ?? window.innerHeight;

    const clearBlur = (nodes) => {
      nodes.forEach((node) => {
        node.style.removeProperty("filter");
        touched.delete(node);
      });
    };

    const collectTargets = (section) => {
      const limit = viewHeight() * 1.2;
      const found = [];

      const visit = (node) => {
        const children = node.children;
        if (node.getBoundingClientRect().height > limit && children.length > 0) {
          Array.from(children).forEach(visit);
          return;
        }
        found.push(node);
      };

      if (section.children.length === 0) return [section];
      Array.from(section.children).forEach(visit);
      return found.length > 0 ? found : [section];
    };

    const targetsFor = (section) => {
      const cached = targets.get(section);
      if (cached) return cached;
      const next = collectTargets(section);
      targets.set(section, next);
      return next;
    };

    const markVisibleOnOpen = () => {
      if (!atTop()) return;

      const bottomEdge = viewHeight();
      sections().forEach((section) => {
        const { top, bottom } = section.getBoundingClientRect();
        const onScreen = top < bottomEdge && bottom > 0;
        section.classList.toggle("is-visible-on-load", onScreen);
        if (onScreen) clearBlur(targetsFor(section));
      });
    };

    const updateBlur = () => {
      if (reduced || reduceQuery.matches) {
        sections().forEach((section) => clearBlur(targetsFor(section)));
        return;
      }

      const height = viewHeight();
      sections().forEach((section) => {
        const nodes = targetsFor(section);
        if (section.classList.contains("is-visible-on-load")) {
          clearBlur(nodes);
          return;
        }

        const { top, height: sectionHeight } = section.getBoundingClientRect();
        const travel = Math.max(sectionHeight * 0.66, 1);
        const progress = Math.min(1, Math.max(0, (height - top) / travel));
        const blur = 16 * (1 - progress);

        if (blur < 0.25) {
          clearBlur(nodes);
          return;
        }

        const value = `blur(${blur.toFixed(2)}px)`;
        nodes.forEach((node) => {
          touched.add(node);
          if (node.style.filter !== value) node.style.filter = value;
        });
      });
    };

    const onScroll = () => {
      if (atTop()) markVisibleOnOpen();
      updateBlur();
    };

    const onResize = () => {
      targets = new WeakMap();
      markVisibleOnOpen();
      updateBlur();
    };

    const settle = () => {
      if (cancelled) return;
      targets = new WeakMap();
      markVisibleOnOpen();
      updateBlur();
    };

    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(settle);
    });

    const settleTimers = [150, 600].map((delay) => window.setTimeout(settle, delay));
    document.fonts?.ready.then(settle);

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("touchmove", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.visualViewport?.addEventListener("resize", onResize);
    window.visualViewport?.addEventListener("scroll", onScroll);
    reduceQuery.addEventListener("change", onResize);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      settleTimers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("touchmove", onScroll);
      window.removeEventListener("resize", onResize);
      window.visualViewport?.removeEventListener("resize", onResize);
      window.visualViewport?.removeEventListener("scroll", onScroll);
      reduceQuery.removeEventListener("change", onResize);
      sections().forEach((section) => section.classList.remove("is-visible-on-load"));
      touched.forEach((node) => node.style.removeProperty("filter"));
      touched.clear();
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
