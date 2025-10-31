/**
 * Text Highlighting Animation System
 *
 * Scroll-triggered character-level text highlighting for long-form case study content.
 * Integrates Splitting.js (text → characters) + Motion One (Egyptian-themed animations).
 *
 * Architecture:
 * - Splitting.js handles DOM surgery (wraps characters in <span class="char">)
 * - Motion One's inView() triggers animations on scroll (uses IntersectionObserver)
 * - View Transitions lifecycle (astro:page-load, astro:before-swap) ensures cleanup
 *
 * Accessibility:
 * - prefersReducedMotion() guard (instant final state if preferred)
 * - Semantic <mark> for meaningful highlights (screen readers announce)
 * - No keyboard nav interference (animations don't trap focus)
 */

import { inView, animate, stagger } from "motion";
import Splitting from "splitting";
import "splitting/dist/splitting.css"; // Splitting.js base styles
import { egyptianEasing, prefersReducedMotion } from "./animations";

// Track cleanup functions for memory management
let cleanupFunctions: Array<() => void> = [];

/**
 * Initialize text highlighting with View Transitions support
 *
 * Lifecycle:
 * 1. astro:page-load → Split text + attach scroll observers
 * 2. IntersectionObserver → Trigger animations when 30% visible
 * 3. astro:before-swap → Cleanup all observers (prevent memory leaks)
 */
export function initTextHighlights() {
  // Initialize on page load (handles both initial load + View Transitions)
  document.addEventListener("astro:page-load", () => {
    // Split .text-highlight elements into words (not characters - less overwhelming)
    const results = Splitting({
      target: ".text-highlight",
      by: "words",
    });

    // Only proceed if we found elements to split
    if (!results || results.length === 0) return;

    // Animate each text-highlight element on scroll
    document.querySelectorAll<HTMLElement>(".text-highlight").forEach((el) => {
      // Accessibility: Skip animation if user prefers reduced motion
      if (prefersReducedMotion()) {
        // Apply final state instantly (gold color, full opacity)
        el.querySelectorAll<HTMLElement>(".word").forEach((word) => {
          word.style.opacity = "1";
        });
        return;
      }

      // Determine animation type from variant class
      const isFadeIn = el.classList.contains("text-highlight--fade-in");
      const isGold =
        el.classList.contains("text-highlight--subtle-gold") ||
        el.classList.contains("text-highlight--emphasis");
      const isBlue = el.classList.contains("text-highlight--subtle-blue");

      const targetColor = isGold
        ? "var(--color-highlight-gold)"
        : isBlue
          ? "var(--color-highlight-blue)"
          : "var(--color-highlight-gold)";

      // Calculate reading-based delay: average 250ms per word (240 WPM reading speed)
      const readingDelay = 250; // milliseconds per word at 240 WPM

      // inView returns cleanup function for stopping detection
      const stop = inView(
        el,
        (element, enterInfo) => {
          // Animate words with reading-speed timing (not all at once)
          if (isFadeIn) {
            // Subtle variant: opacity + slight scale only (no color change)
            animate(
              element.querySelectorAll(".word"),
              {
                opacity: [0, 1],
                scale: [0.95, 1],
              },
              {
                duration: 0.4,
                ease: egyptianEasing.water,
                delay: stagger(readingDelay / 1000),
              },
            );
          } else {
            // Color variants: opacity + color transition
            animate(
              element.querySelectorAll(".word"),
              {
                opacity: [0, 1],
                color: ["var(--color-highlight-start)", targetColor],
              },
              {
                duration: 0.4,
                ease: egyptianEasing.water,
                delay: stagger(readingDelay / 1000),
              },
            );
          }

          // Optional: Return leave callback (fires when element leaves viewport)
          // Currently unused - we keep text highlighted after first reveal
          return (leaveInfo) => {
            // Could fade out on leave, but we preserve highlight for reading
          };
        },
        {
          amount: 0.3, // Trigger when 30% of element is visible
        },
      );

      // Store cleanup function for astro:before-swap
      cleanupFunctions.push(stop);
    });
  });

  // Cleanup before page swap (prevent memory leaks from duplicate observers)
  document.addEventListener("astro:before-swap", () => {
    cleanupFunctions.forEach((cleanup) => cleanup());
    cleanupFunctions = [];
  });
}
