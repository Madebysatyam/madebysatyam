import { LazyMotion, domAnimation } from "framer-motion";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import "../styles/global.css";
import "../styles/homepage.css";

const STORAGE_KEY = "madebysatyam-theme";
const stored = localStorage.getItem(STORAGE_KEY);

if (stored === "light" || stored === "dark") {
  document.documentElement.setAttribute("data-theme", stored);
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LazyMotion features={domAnimation}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </LazyMotion>
  </StrictMode>
);
