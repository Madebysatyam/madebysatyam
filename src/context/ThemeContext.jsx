import { createContext, useCallback, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "madebysatyam-theme";
const ThemeContext = createContext(null);

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function readTheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : getSystemTheme();
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

let audioContext = null;

function getAudioContext() {
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return null;

  if (!audioContext) {
    audioContext = new Ctx();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  return audioContext;
}

function playSwitchSound() {
  if (prefersReducedMotion()) return;

  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const duration = 0.07;
  const sampleCount = Math.ceil(ctx.sampleRate * duration);
  const noiseBuffer = ctx.createBuffer(1, sampleCount, ctx.sampleRate);
  const samples = noiseBuffer.getChannelData(0);

  for (let i = 0; i < sampleCount; i += 1) {
    const decay = 1 - i / sampleCount;
    samples[i] = (Math.random() * 2 - 1) * decay * decay;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(1400, now);
  filter.Q.setValueAtTime(0.6, now);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.1, now + 0.002);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  noise.start(now);
  noise.stop(now + duration);
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(readTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(({ playSound = true } = {}) => {
    if (playSound) {
      playSwitchSound();
    }

    setThemeState((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
