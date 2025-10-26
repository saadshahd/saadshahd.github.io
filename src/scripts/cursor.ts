/**
 * Custom Cursor - Mouse tracking with two-element architecture
 *
 * Wrapper: Updates left/top position instantly (no transition)
 * Circle: Scales via CSS on hover (smooth transition)
 *
 * This separation prevents lag by avoiding transform conflicts.
 *
 * View Transitions Pattern:
 * - AbortController cleans up old listeners on page navigation
 * - Fresh DOM references on each astro:page-load
 * - No manual duplicate prevention needed (signal handles it)
 */

let controller: AbortController | null = null;

function setupCustomCursor() {
  // Clean up previous page's listeners
  if (controller) {
    controller.abort();
  }

  // Create new controller for this page
  controller = new AbortController();
  const { signal } = controller;

  // Always get fresh reference to cursor wrapper
  const cursorWrapper = document.querySelector(".custom-cursor-wrapper");

  if (!cursorWrapper || !(cursorWrapper instanceof HTMLElement)) {
    // Cursor element not found (likely on mobile or reduced motion)
    return;
  }

  // Page-scoped cursor state
  let hasMovedOnce = false;

  // Track mouse position and update cursor instantly via left/top
  document.addEventListener(
    "mousemove",
    (e) => {
      const x = e.clientX;
      const y = e.clientY;

      // Update position instantly (no transform, no transition)
      cursorWrapper.style.left = `${x}px`;
      cursorWrapper.style.top = `${y}px`;

      // Show cursor on first mouse movement
      if (!hasMovedOnce) {
        cursorWrapper.classList.add("visible");
        hasMovedOnce = true;
      }
    },
    { signal },
  );

  // Hide cursor when mouse leaves window
  document.addEventListener(
    "mouseleave",
    () => {
      cursorWrapper.classList.remove("visible");
    },
    { signal },
  );

  // Show cursor when mouse enters window (if it had moved before)
  document.addEventListener(
    "mouseenter",
    () => {
      if (hasMovedOnce) {
        cursorWrapper.classList.add("visible");
      }
    },
    { signal },
  );

  // Fade cursor on links
  const links = document.querySelectorAll("a");
  links.forEach((link) => {
    link.addEventListener(
      "mouseenter",
      () => {
        cursorWrapper.classList.add("faded");
      },
      { signal },
    );

    link.addEventListener(
      "mouseleave",
      () => {
        cursorWrapper.classList.remove("faded");
      },
      { signal },
    );
  });

  // Hover effect for buttons and cards
  const hoverElements = document.querySelectorAll(
    'button, .card, [role="button"], input[type="submit"], input[type="button"]',
  );

  hoverElements.forEach((el) => {
    el.addEventListener(
      "mouseenter",
      () => {
        cursorWrapper.classList.add("hover");
      },
      { signal },
    );

    el.addEventListener(
      "mouseleave",
      () => {
        cursorWrapper.classList.remove("hover");
      },
      { signal },
    );
  });
}

// Run on page load
document.addEventListener("astro:page-load", setupCustomCursor);

// Also run immediately in case page-load already fired
if (document.readyState !== "loading") {
  setupCustomCursor();
} else {
  document.addEventListener("DOMContentLoaded", setupCustomCursor);
}
