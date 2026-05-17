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

export const themeIconTransition = (reduced) =>
  reduced
    ? { duration: 0 }
    : { duration: DURATION.slow, ease: EASE_OUT };

export const themeIconVariants = (reduced) => ({
  enter: reduced
    ? { opacity: 1, scale: 1, rotate: 0 }
    : { opacity: 0, scale: 0.55, rotate: -72 },
  center: { opacity: 1, scale: 1, rotate: 0 },
  exit: reduced
    ? { opacity: 1, scale: 1, rotate: 0 }
    : { opacity: 0, scale: 0.55, rotate: 72 },
});

export const mobileNavPanelVariants = (reduced) => ({
  desktop: { opacity: 1, y: 0, transition: { duration: 0 } },
  closed: reduced
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: -12, transition: { duration: DURATION.base, ease: EASE_OUT } },
  open: reduced
    ? { opacity: 1, y: 0 }
    : { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE_OUT } },
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
  desktop: { opacity: 1, x: 0 },
  closed: reduced ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 },
  open: reduced
    ? { opacity: 1, x: 0 }
    : {
        opacity: 1,
        x: 0,
        transition: { duration: DURATION.base, ease: EASE_OUT },
      },
});

export const backdropVariants = (reduced) => ({
  hidden: { opacity: 0 },
  visible: reduced
    ? { opacity: 1 }
    : { opacity: 1, transition: { duration: DURATION.base, ease: EASE_OUT } },
  exit: reduced
    ? { opacity: 0 }
    : { opacity: 0, transition: { duration: 0.2, ease: EASE_OUT } },
});
