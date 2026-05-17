(function () {
  const STORAGE_KEY = "madebysatyam-theme";
  const SWITCH_CLASS = "theme-toggle--switching";
  const root = document.documentElement;
  const toggle = document.querySelector(".theme-toggle");

  if (!toggle) return;

  let audioContext = null;

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }

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
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(0.14, now + 0.004);
    master.gain.exponentialRampToValueAtTime(0.0001, now + 0.11);
    master.connect(ctx.destination);

    const click = ctx.createOscillator();
    const clickGain = ctx.createGain();
    click.type = "square";
    click.frequency.setValueAtTime(920, now);
    click.frequency.exponentialRampToValueAtTime(520, now + 0.05);
    clickGain.gain.setValueAtTime(0.35, now);
    clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
    click.connect(clickGain);
    clickGain.connect(master);
    click.start(now);
    click.stop(now + 0.07);

    const thump = ctx.createOscillator();
    const thumpGain = ctx.createGain();
    thump.type = "sine";
    thump.frequency.setValueAtTime(180, now + 0.01);
    thump.frequency.exponentialRampToValueAtTime(90, now + 0.09);
    thumpGain.gain.setValueAtTime(0.22, now + 0.01);
    thumpGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
    thump.connect(thumpGain);
    thumpGain.connect(master);
    thump.start(now + 0.01);
    thump.stop(now + 0.11);
  }

  function pulseSwitchAnimation() {
    if (prefersReducedMotion()) return;

    toggle.classList.add(SWITCH_CLASS);

    window.setTimeout(() => {
      toggle.classList.remove(SWITCH_CLASS);
    }, 480);
  }

  function applyTheme(theme, options = {}) {
    const { animate = true, playSound = true } = options;
    const nextTheme = theme === "light" ? "light" : "dark";

    if (animate) {
      pulseSwitchAnimation();
    }

    if (playSound) {
      playSwitchSound();
    }

    root.setAttribute("data-theme", nextTheme);
    localStorage.setItem(STORAGE_KEY, nextTheme);
    updateToggle(nextTheme);
  }

  function updateToggle(theme) {
    const isDark = theme === "dark";
    toggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light theme" : "Switch to dark theme"
    );
    toggle.setAttribute("aria-pressed", isDark ? "false" : "true");
    toggle.dataset.themeState = theme;
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") {
    applyTheme(stored, { animate: false, playSound: false });
  } else {
    const current = root.getAttribute("data-theme") || getSystemTheme();
    applyTheme(current === "light" ? "light" : "dark", {
      animate: false,
      playSound: false,
    });
  }

  toggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    applyTheme(current === "dark" ? "light" : "dark");
  });
})();
