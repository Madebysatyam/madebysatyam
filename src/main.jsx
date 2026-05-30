import { LazyMotion, domAnimation } from "framer-motion";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "../styles/global.css";
import "../styles/homepage.css";
import "../styles/aboutpage.css";
import "../styles/notespage.css";
import "../styles/playgroundpage.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LazyMotion features={domAnimation}>
      <App />
    </LazyMotion>
  </StrictMode>
);
