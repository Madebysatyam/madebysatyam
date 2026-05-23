import { useOutletContext } from "react-router-dom";
import ContactSection from "../sections/ContactSection.jsx";
import HeroSection from "../sections/HeroSection.jsx";
import NotesSection from "../sections/NotesSection.jsx";
import PlaygroundSection from "../sections/PlaygroundSection.jsx";
import WorkSection from "../sections/WorkSection.jsx";

export default function HomePage() {
  const { reduced } = useOutletContext();

  return (
    <main id="main">
      <HeroSection />
      <WorkSection reduced={reduced} />
      <PlaygroundSection reduced={reduced} />
      <NotesSection reduced={reduced} />
      <ContactSection reduced={reduced} />
    </main>
  );
}
