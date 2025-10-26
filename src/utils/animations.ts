import { animate } from "motion";

/**
 * Egyptian Design System - Golden Ratio Timing
 * All animations use golden ratio intervals for natural rhythm
 */
export const goldenTiming = {
  fast: 0.382, // 382ms - Quick interactions
  medium: 0.618, // 618ms - Standard transitions
  slow: 1.0, // 1000ms - Deliberate reveals
  extraSlow: 1.618, // 1618ms - Hero entrances
};

/**
 * Egyptian-Inspired Easing Curves
 * Metaphors: pyramid (sharp ascent), water (flowing), monument (powerful)
 */
export const egyptianEasing = {
  pyramid: [0.34, 1.56, 0.64, 1] as [number, number, number, number], // Sharp ascent like pyramid sides
  water: [0.65, 0, 0.35, 1] as [number, number, number, number], // Flowing ease like Nile water
  monument: [0.76, 0, 0.24, 1] as [number, number, number, number], // Powerful ease-in-out
};

/**
 * Check if user prefers reduced motion
 * Respects system accessibility settings
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Conditionally animate based on motion preferences
 * If reduced motion is preferred, applies final state instantly
 * Otherwise, animates normally
 */
export function conditionalAnimate(
  target: Element | Element[],
  keyframes: any,
  options: any,
) {
  if (prefersReducedMotion()) {
    // Apply final state instantly without animation
    const finalState = Array.isArray(keyframes)
      ? keyframes[keyframes.length - 1]
      : keyframes;

    const elements = Array.isArray(target) ? target : [target];
    elements.forEach((el) => {
      Object.assign((el as HTMLElement).style, finalState);
    });
  } else {
    // Animate normally
    animate(target, keyframes, options);
  }
}

/**
 * Check if device is mobile based on screen width
 */
export function isMobile(): boolean {
  return window.matchMedia("(max-width: 768px)").matches;
}

/**
 * Egyptian color palette for programmatic animations
 */
export const egyptianColors = {
  primary: "#F4C430", // Bright Egyptian gold
  secondary: "#0EA5E9", // Red Sea blue
  accent: "#06B6D4", // Vibrant cyan
  background: "#F5F1E8", // Limestone cream
};
