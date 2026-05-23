import { BrowserRouter, Route, Routes } from "react-router-dom";
import SiteLayout from "./layouts/SiteLayout.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import NotesPage from "./pages/NotesPage.jsx";
import PlaygroundPage from "./pages/PlaygroundPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/playground" element={<PlaygroundPage />} />
          <Route path="/Notes" element={<NotesPage />} />
          <Route path="/About" element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
