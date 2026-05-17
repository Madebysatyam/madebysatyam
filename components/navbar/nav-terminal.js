(function () {
  const links = document.querySelectorAll(".site-nav__link[data-terminal-label]");

  if (!links.length) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  function typeLink(link) {
    const textEl = link.querySelector(".site-nav__terminal-text");
    const label = link.dataset.terminalLabel;

    if (!textEl || !label) return;

    if (prefersReducedMotion) {
      textEl.textContent = label;
      return;
    }

    window.clearTimeout(link._typeTimer);
    link.classList.add("is-typing");
    textEl.textContent = "";

    let index = 0;

    function step() {
      if (index < label.length) {
        textEl.textContent += label.charAt(index);
        index += 1;
        link._typeTimer = window.setTimeout(step, 48);
        return;
      }

      link.classList.remove("is-typing");
    }

    step();
  }

  links.forEach((link) => {
    const textEl = link.querySelector(".site-nav__terminal-text");
    const label = link.dataset.terminalLabel;

    if (textEl && label) {
      textEl.textContent = label;
    }

    link.addEventListener("mouseenter", () => typeLink(link));
    link.addEventListener("focus", () => typeLink(link));
  });
})();
