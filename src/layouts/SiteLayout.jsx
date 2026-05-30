import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { MatIntroProvider } from "../contexts/MatIntroContext.jsx";
import { preloadListingHero } from "../lib/listingHeroes.js";

export default function SiteLayout() {
  const reduced = useReducedMotion();
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [isMatReady, setMatReady] = useState(!isHome);

  useEffect(() => {
    setMatReady(!isHome);
  }, [isHome]);

  useEffect(() => {
    preloadListingHero(pathname);
  }, [pathname]);

  return (
    <MatIntroProvider value={{ isMatReady, setMatReady }}>
      <Navbar />
      <div className="page-home">
        <Outlet context={{ reduced }} />
        <Footer />
      </div>
    </MatIntroProvider>
  );
}
