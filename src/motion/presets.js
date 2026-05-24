/** Shared motion tokens — terminal-adjacent, restrained. */

export const EASE_OUT = [0.4, 0, 0.2, 1];

export const DURATION = {
  fast: 0.12,
  base: 0.28,
  slow: 0.45,
};

export function instant(reduced) {
  return reduced ? { duration: 0 } : undefined;
}

export function fadeUp(reduced, { y = 16, delay = 0 } = {}) {
  if (reduced) {
    return {
      hidden: { opacity: 1, y: 0 },
      visible: { opacity: 1, y: 0 },
    };
  }

  return {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATION.slow, ease: EASE_OUT, delay },
    },
  };
}

export function staggerContainer(reduced, { stagger = 0.06, delayChildren = 0.04 } = {}) {
  if (reduced) {
    return {
      hidden: {},
      visible: { transition: { staggerChildren: 0, delayChildren: 0 } },
    };
  }

  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}

export function staggerItem(reduced, { y = 12 } = {}) {
  return fadeUp(reduced, { y });
}

export const mobileNavPanelVariants = (reduced) => ({
  desktop: { opacity: 1, x: 0, y: 0, transition: { duration: 0 } },
  hidden: reduced
    ? { opacity: 0, x: 0, y: 0 }
    : {
        opacity: 0,
        x: 12,
        y: 0,
        transition: { duration: DURATION.fast, ease: EASE_OUT },
      },
  visible: reduced
    ? { opacity: 1, x: 0, y: 0 }
    : {
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration: DURATION.base, ease: EASE_OUT },
      },
  exit: reduced
    ? { opacity: 0, x: 0, y: 0 }
    : {
        opacity: 0,
        x: 12,
        y: 0,
        transition: { duration: DURATION.fast, ease: EASE_OUT },
      },
  closed: reduced
    ? { opacity: 1, x: 0, y: 0 }
    : { opacity: 0, x: 12, y: 0, transition: { duration: DURATION.base, ease: EASE_OUT } },
  open: reduced
    ? { opacity: 1, x: 0, y: 0 }
    : {
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration: DURATION.base, ease: EASE_OUT },
      },
});

export const mobileNavListVariants = (reduced) => ({
  desktop: { transition: { staggerChildren: 0, delayChildren: 0 } },
  closed: {
    transition: reduced
      ? { staggerChildren: 0 }
      : { staggerChildren: 0.03, staggerDirection: -1 },
  },
  open: {
    transition: reduced
      ? { staggerChildren: 0 }
      : { staggerChildren: 0.05, delayChildren: 0.04 },
  },
});

export const mobileNavItemVariants = (reduced) => ({
  desktop: { opacity: 1, x: 0, y: 0 },
  closed: reduced ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -14, y: 0 },
  open: reduced
    ? { opacity: 1, x: 0, y: 0 }
    : {
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration: DURATION.base, ease: EASE_OUT },
      },
});

export const mobileNavPillItemVariants = (reduced) => ({
  desktop: { opacity: 1, x: 0, y: 0 },
  closed: reduced ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 0, y: 10 },
  open: reduced
    ? { opacity: 1, x: 0, y: 0 }
    : {
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration: DURATION.base, ease: EASE_OUT },
      },
});

export function strokeDraw(reduced, duration = 0.55) {
  if (reduced) {
    return {
      hidden: { pathLength: 1, opacity: 1 },
      visible: { pathLength: 1, opacity: 1 },
    };
  }

  return {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration, ease: EASE_OUT },
    },
  };
}

export function strokeDrawGroup(reduced, { delay = 0, stagger = 0.012 } = {}) {
  if (reduced) {
    return {
      hidden: {},
      visible: { transition: { staggerChildren: 0, delayChildren: 0 } },
    };
  }

  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
}

export const backdropVariants = (reduced) => ({
  hidden: { opacity: 0 },
  visible: reduced
    ? { opacity: 1 }
    : { opacity: 1, transition: { duration: DURATION.base, ease: EASE_OUT } },
  exit: reduced
    ? { opacity: 0 }
    : { opacity: 0, transition: { duration: 0.2, ease: EASE_OUT } },
});

/** Mobile bottom pill — hide while scrolling; opacity fade on pause (no parent filter/transform). */
export const mobileNavPillShellVariants = (reduced) => ({
  visible: reduced
    ? { opacity: 1 }
    : {
        opacity: 1,
        transition: { duration: DURATION.slow, ease: EASE_OUT },
      },
  hidden: reduced
    ? { opacity: 0, pointerEvents: "none" }
    : {
        opacity: 0,
        pointerEvents: "none",
        transition: { duration: DURATION.base, ease: EASE_OUT },
      },
});

/** Expanded link stack inside the bottom pill. */
export const mobileNavPillMenuVariants = (reduced) => ({
  hidden: reduced
    ? { opacity: 0, height: 0 }
    : {
        opacity: 0,
        height: 0,
        transition: { duration: DURATION.fast, ease: EASE_OUT },
      },
  visible: reduced
    ? { opacity: 1, height: "auto" }
    : {
        opacity: 1,
        height: "auto",
        transition: { duration: DURATION.slow, ease: EASE_OUT },
      },
  exit: reduced
    ? { opacity: 0, height: 0 }
    : {
        opacity: 0,
        height: 0,
        transition: { duration: DURATION.fast, ease: EASE_OUT },
      },
});

/** Navbar morph — ease only (no spring). */
export const NAVBAR_MORPH_LAYOUT = {
  duration: DURATION.slow,
  ease: EASE_OUT,
};

const NAVBAR_MORPH = {
  duration: DURATION.slow,
  ease: EASE_OUT,
};

export function navbarShellLayoutTransition(reduced) {
  if (reduced) {
    return { layout: { duration: 0 } };
  }

  return { layout: NAVBAR_MORPH_LAYOUT };
}

export const navbarBrandVariants = (reduced) => ({
  visible: reduced
    ? { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }
    : {
        opacity: 1,
        x: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: DURATION.slow, ease: EASE_OUT },
      },
  hidden: reduced
    ? { opacity: 0, transition: { duration: 0 } }
    : {
        opacity: 0,
        x: -16,
        scale: 0.94,
        filter: "blur(6px)",
        transition: { duration: DURATION.fast, ease: EASE_OUT },
      },
});

export const navbarInnerVariants = (reduced) => ({
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: DURATION.base, ease: EASE_OUT },
  },
  hidden: reduced
    ? { opacity: 0, height: 0, transition: { duration: 0 } }
    : {
        opacity: 0,
        height: 0,
        transition: { duration: DURATION.fast, ease: EASE_OUT },
      },
});

export const navbarLinksContainerVariants = (reduced) => ({
  default: {
    transition: reduced
      ? { staggerChildren: 0, delayChildren: 0 }
      : { staggerChildren: 0.04, delayChildren: 0.02 },
  },
  compact: {
    transition: reduced
      ? { staggerChildren: 0, delayChildren: 0 }
      : { staggerChildren: 0.05, delayChildren: 0.06 },
  },
});

export const navbarHeaderShellVariants = (reduced) => ({
  default: {
    y: 0,
    opacity: 1,
  },
  compact: reduced
    ? { y: 0, opacity: 1 }
    : {
        y: 0,
        opacity: 1,
        transition: NAVBAR_MORPH_LAYOUT,
      },
});

export const navbarLinkItemVariants = (reduced) => ({
  default: { opacity: 1, y: 0 },
  hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 },
  compact: reduced
    ? { opacity: 1, y: 0 }
    : {
        opacity: 1,
        y: 0,
        transition: { duration: DURATION.base, ease: EASE_OUT },
      },
});

export function navbarMorphTransition(reduced) {
  if (reduced) {
    return { duration: 0 };
  }

  return {
    layout: NAVBAR_MORPH_LAYOUT,
    default: NAVBAR_MORPH_LAYOUT,
  };
}

/** Logo — blur only; Y locked, no layout shift. */
export function navbarBrandMotion(reduced) {
  if (reduced) {
    return { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" };
  }

  return {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    filter: ["blur(0px)", "blur(4px)", "blur(0px)"],
    transition: {
      ...NAVBAR_MORPH,
      times: [0, 0.42, 1],
    },
  };
}

/** Desktop nav row — horizontal settle only (Y locked). */
export function navbarDesktopNavMotion(reduced) {
  if (reduced) {
    return { opacity: 1, x: 0, y: 0 };
  }

  return {
    opacity: 1,
    x: 0,
    y: 0,
    transition: NAVBAR_MORPH,
  };
}

/** Desktop link items — slight X stagger when notch morphs. */
export function navbarDesktopLinkMotion(reduced, isCompact) {
  if (reduced) {
    return { opacity: 1, x: 0, y: 0 };
  }

  return {
    opacity: 1,
    x: isCompact ? 0 : 0,
    y: 0,
    transition: NAVBAR_MORPH,
  };
}
