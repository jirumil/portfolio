import { Variants, Transition } from "motion/react";

/**
 * Shared motion tokens.
 * The "physics-defying" hero reveal uses a spring with low damping + high mass
 * so characters overshoot slightly before settling — reads as "snap into place"
 * rather than a linear fade.
 */

export const springSnap: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 20,
  mass: 1.1,
};

export const springSoft: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 18,
};

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

// Word-by-word hero reveal: each word rises out of a blur with a slight
// rotation, staggered by the parent container.
export const heroWordContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.15,
    },
  },
};

export const heroWord: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    rotateX: -40,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: springSnap,
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

export const staggerParent: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

// Card hover: a small lift + glow-ready scale. Paired with a CSS
// box-shadow transition (kept in Tailwind, not Motion, since color
// interpolation of multi-layer shadows is cheaper in CSS).
export const cardHover = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -8,
    scale: 1.015,
    transition: springSoft,
  },
};

// Infinite float used on project cards. Takes a small delay offset so
// multiple floating cards don't move in lockstep with each other —
// fixes the earlier bug where only one card had motion applied at all.
export function infiniteFloat(delay = 0): Variants {
  return {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      },
    },
  };
}

// Modal / drawer backdrop — simple opacity fade.
export const modalBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: easeOutExpo } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: easeOutExpo } },
};

// Modal / drawer panel — rises in with the same spring used for card hover,
// exits quickly and linearly so closing never feels sluggish.
export const modalPanel: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: springSoft },
  exit: {
    opacity: 0,
    y: 16,
    scale: 0.98,
    transition: { duration: 0.18, ease: easeOutExpo },
  },
};