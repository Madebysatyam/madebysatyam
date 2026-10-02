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

    const notePieceSelector =
      ".note-page__title, .note-page__meta, .note-page__dek, .note-ruler, .note-measure, .note-page__prose > p, .note-page__prose > h2";
    const sectionSelector =
      `main > section:not(:first-child), main > article, .about-page__section, ${notePieceSelector}, .page-home > .site-footer`;
    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sections = () => document.querySelectorAll(sectionSelector);
    let targets = new WeakMap();
    let observer = null;
    let cancelled = false;
    let userMoved = false;
    let revealFrame = 0;
    let revealFrame2 = 0;

    const viewHeight = () => window.visualViewport?.height ?? window.innerHeight;

    const collectTargets = (section, limit) => {
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

    const clearSection = (section) => {
      section.classList.remove("is-visible-on-load", "section-reveal", "section-reveal--blur", "is-revealed");
      (targets.get(section) || []).forEach((node) => {
        node.classList.remove("section-reveal", "section-reveal--blur", "is-revealed");
      });
    };

    const reveal = (section) => {
      if (section.classList.contains("is-revealed") || section.classList.contains("is-visible-on-load")) {
        return;
      }
      section.classList.add("is-revealed");
      (targets.get(section) || []).forEach((node) => node.classList.add("is-revealed"));
      observer?.unobserve(section);
    };

    const revealEntered = () => {
      const height = viewHeight();
      const rootBottom = height - 50;
      sections().forEach((section) => {
        if (!section.classList.contains("section-reveal") || section.classList.contains("is-revealed")) {
          return;
        }
        const rect = section.getBoundingClientRect();
        const visible = Math.min(rect.bottom, rootBottom) - Math.max(rect.top, 0);
        if (visible >= rect.height * 0.1) reveal(section);
      });
    };

    const setup = () => {
      if (cancelled || userMoved || window.scrollY > 8) return;
      observer?.disconnect();
      window.cancelAnimationFrame(revealFrame);
      window.cancelAnimationFrame(revealFrame2);
      targets = new WeakMap();
      if (reduceQuery.matches) {
        sections().forEach(clearSection);
        return;
      }

      const height = viewHeight();
      const pending = [];
      const inView = [];

      sections().forEach((section) => {
        if (section.classList.contains("is-revealed")) return;
        clearSection(section);

        const { top, bottom, height: sectionHeight } = section.getBoundingClientRect();
        const onScreen = top < height && bottom > 0;
        const alwaysReveal = section.matches(notePieceSelector);

        if (onScreen && !alwaysReveal) {
          section.classList.add("is-visible-on-load");
          return;
        }

        const limit = height * 1.2;
        const tooTall = !alwaysReveal && sectionHeight > limit;
        const nodes = tooTall ? collectTargets(section, limit) : [];
        targets.set(section, nodes);
        section.classList.add("section-reveal");
        if (tooTall) {
          nodes.forEach((node) => node.classList.add("section-reveal", "section-reveal--blur"));
        } else {
          section.classList.add("section-reveal--blur");
        }

        if (onScreen && alwaysReveal) inView.push(section);
        else pending.push(section);
      });

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) reveal(entry.target);
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
      );

      pending.forEach((section) => observer.observe(section));

      if (inView.length > 0) {
        revealFrame = window.requestAnimationFrame(() => {
          revealFrame2 = window.requestAnimationFrame(() => {
            if (cancelled) return;
            inView.forEach(reveal);
          });
        });
      }
    };

    const onScroll = () => {
      if (window.scrollY > 24) userMoved = true;
      revealEntered();
    };

    const onViewportSettle = () => {
      if (!userMoved && window.scrollY <= 8) setup();
      else revealEntered();
    };

    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(setup);
    });
    const settleTimers = [150, 600].map((delay) => window.setTimeout(setup, delay));
    document.fonts?.ready.then(setup);

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("touchmove", onScroll, { passive: true });
    window.addEventListener("resize", onViewportSettle);
    window.visualViewport?.addEventListener("resize", onViewportSettle);
    window.visualViewport?.addEventListener("scroll", onScroll);
    reduceQuery.addEventListener("change", onViewportSettle);

    return () => {
      cancelled = true;
      observer?.disconnect();
      window.cancelAnimationFrame(revealFrame);
      window.cancelAnimationFrame(revealFrame2);
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      settleTimers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("touchmove", onScroll);
      window.removeEventListener("resize", onViewportSettle);
      window.visualViewport?.removeEventListener("resize", onViewportSettle);
      window.visualViewport?.removeEventListener("scroll", onScroll);
      reduceQuery.removeEventListener("change", onViewportSettle);
      sections().forEach(clearSection);
    };
  }, [pathname]);

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
