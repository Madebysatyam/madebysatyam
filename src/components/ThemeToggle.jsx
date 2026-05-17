import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTheme } from "../context/ThemeContext.jsx";
import { themeIconTransition, themeIconVariants } from "../motion/presets.js";

function SunIcon({ reduced }) {
  return (
    <motion.svg
      className="theme-toggle__svg"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial="enter"
      animate="center"
      exit="exit"
      variants={themeIconVariants(reduced)}
      transition={themeIconTransition(reduced)}
    >
      <motion.circle
        cx="12"
        cy="12"
        r="3.25"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <motion.g
        style={{ transformOrigin: "12px 12px" }}
        initial={reduced ? false : { rotate: -72, scale: 0.6 }}
        animate={{ rotate: 0, scale: 1 }}
        exit={reduced ? undefined : { rotate: 90, scale: 0.6 }}
        transition={themeIconTransition(reduced)}
      >
        <line x1="12" y1="3.5" x2="12" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="12" y1="18" x2="12" y2="20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="3.5" y1="12" x2="6" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="18" y1="12" x2="20.5" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="5.8" y1="5.8" x2="7.6" y2="7.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="16.4" y1="16.4" x2="18.2" y2="18.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="16.4" y1="7.6" x2="18.2" y2="5.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="5.8" y1="18.2" x2="7.6" y2="16.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </motion.g>
    </motion.svg>
  );
}

function MoonIcon({ reduced }) {
  return (
    <motion.svg
      className="theme-toggle__svg"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial="enter"
      animate="center"
      exit="exit"
      variants={themeIconVariants(reduced)}
      transition={themeIconTransition(reduced)}
    >
      <motion.path
        fill="none"
        d="M14.2 4.2a7.8 7.8 0 1 0 0 15.6 6.4 6.4 0 0 1 0-15.6z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const reduced = useReducedMotion();
  const isDark = theme === "dark";

  return (
    <motion.button
      type="button"
      className="theme-toggle"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={!isDark}
      data-theme-state={theme}
      onClick={() => toggleTheme()}
      whileTap={reduced ? undefined : { scale: 0.94 }}
      transition={{ duration: 0.12 }}
    >
      <span className="theme-toggle__icon" aria-hidden="true">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <MoonIcon key="moon" reduced={reduced} />
          ) : (
            <SunIcon key="sun" reduced={reduced} />
          )}
        </AnimatePresence>
      </span>
    </motion.button>
  );
}
