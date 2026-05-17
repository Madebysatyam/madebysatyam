(function () {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".site-nav__toggle");
  const nav = document.getElementById("site-nav-panel");
  const backdrop = document.querySelector(".site-nav__backdrop");

  if (!header || !toggle || !nav) return;

  function setOpen(isOpen) {
    header.classList.toggle("is-nav-open", isOpen);
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");

    if (backdrop) {
      backdrop.hidden = !isOpen;
      backdrop.setAttribute("aria-hidden", isOpen ? "false" : "true");
    }

    if (isOpen) {
      document.body.classList.add("is-nav-menu-open");
    } else {
      document.body.classList.remove("is-nav-menu-open");
    }
  }

  toggle.addEventListener("click", () => {
    setOpen(!header.classList.contains("is-nav-open"));
  });

  if (backdrop) {
    backdrop.addEventListener("click", () => setOpen(false));
  }

  nav.querySelectorAll(".site-nav__link").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setOpen(false);
    }
  });

  window
    .matchMedia("(min-width: 810px)")
    .addEventListener("change", (event) => {
      if (event.matches) {
        setOpen(false);
      }
    });
})();
