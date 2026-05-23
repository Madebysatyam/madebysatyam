import { useOutletContext } from "react-router-dom";
import HeroSection from "../sections/HeroSection.jsx";
import KindWordsSection from "../sections/KindWordsSection.jsx";
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
      <KindWordsSection reduced={reduced} />
    </main>
  );
}
