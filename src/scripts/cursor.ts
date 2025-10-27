/**
 * Custom Cursor - Headline-only enhancement
 *
 * Wrapper: Updates left/top position globally (no transition)
 * Circle: Visible only when hovering h1, h2, h3 elements
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

  // Track mouse position globally (cursor follows everywhere)
  document.addEventListener(
    "mousemove",
    (e) => {
      const x = e.clientX;
      const y = e.clientY;

      // Update position instantly (no transform, no transition)
      cursorWrapper.style.left = `${x}px`;
      cursorWrapper.style.top = `${y}px`;
    },
    { signal },
  );

  // Show cursor only when hovering headline text (spans inside headings)
  const headlineSpans = document.querySelectorAll("h1 span, h2 span, h3 span");
  headlineSpans.forEach((headlineSpan) => {
    headlineSpan.addEventListener(
      "mouseenter",
      () => {
        cursorWrapper.classList.add("visible");
      },
      { signal },
    );

    headlineSpan.addEventListener(
      "mouseleave",
      () => {
        cursorWrapper.classList.remove("visible");
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
