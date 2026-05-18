import { motion, useReducedMotion } from "framer-motion";
import Navbar from "./components/Navbar";
import AboutSection from "./sections/AboutSection.jsx";
import ContactSection from "./sections/ContactSection.jsx";
import HeroSection from "./sections/HeroSection.jsx";
import PlaygroundSection from "./sections/PlaygroundSection.jsx";
import SiteFooter from "./sections/SiteFooter.jsx";
import WorkSection from "./sections/WorkSection.jsx";

export default function App() {
  const reduced = useReducedMotion();

  return (
    <motion.div className="page-home" initial={false}>
      <Navbar />

      <main id="main">
        <HeroSection />
        <WorkSection reduced={reduced} />
        <PlaygroundSection reduced={reduced} />
        <AboutSection reduced={reduced} />
        <ContactSection reduced={reduced} />
      </main>

      <SiteFooter reduced={reduced} />
    </motion.div>
  );
}
