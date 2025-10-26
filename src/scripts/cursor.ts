/**
 * Custom Cursor - Mouse tracking with two-element architecture
 *
 * Wrapper: Updates left/top position instantly (no transition)
 * Circle: Scales via CSS on hover (smooth transition)
 *
 * This separation prevents lag by avoiding transform conflicts.
 */

function initCustomCursor() {
  const cursorWrapper = document.querySelector(".custom-cursor-wrapper");

  if (!cursorWrapper || !(cursorWrapper instanceof HTMLElement)) {
    // Cursor element not found (likely on mobile or reduced motion)
    return;
  }

  // Skip if already initialized
  if (cursorWrapper.dataset.cursorInit === "true") {
    return;
  }
  cursorWrapper.dataset.cursorInit = "true";

  let hasMovedOnce = false;

  // Track mouse position and update cursor instantly via left/top
  document.addEventListener("mousemove", (e) => {
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
  });

  // Hide cursor when mouse leaves window
  document.addEventListener("mouseleave", () => {
    cursorWrapper.classList.remove("visible");
  });

  // Show cursor when mouse enters window (if it had moved before)
  document.addEventListener("mouseenter", () => {
    if (hasMovedOnce) {
      cursorWrapper.classList.add("visible");
    }
  });

  // Fade cursor on links, add hover effect for buttons/cards
  const addHoverListeners = () => {
    // Fade cursor on links
    const links = document.querySelectorAll("a");
    links.forEach((link) => {
      if (link.hasAttribute("data-cursor-link")) {
        return;
      }
      link.setAttribute("data-cursor-link", "true");

      link.addEventListener("mouseenter", () => {
        cursorWrapper.classList.add("faded");
      });

      link.addEventListener("mouseleave", () => {
        cursorWrapper.classList.remove("faded");
      });
    });

    // Hover effect for buttons and cards
    const hoverElements = document.querySelectorAll(
      'button, .card, [role="button"], input[type="submit"], input[type="button"]',
    );

    hoverElements.forEach((el) => {
      if (el.hasAttribute("data-cursor-hover")) {
        return;
      }
      el.setAttribute("data-cursor-hover", "true");

      el.addEventListener("mouseenter", () => {
        cursorWrapper.classList.add("hover");
      });

      el.addEventListener("mouseleave", () => {
        cursorWrapper.classList.remove("hover");
      });
    });
  };

  // Initialize hover listeners
  addHoverListeners();

  // Reinitialize hover listeners after View Transitions
  // (new elements may have been added to the DOM)
  document.addEventListener("astro:page-load", () => {
    addHoverListeners();
  });
}

// Run on initial load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCustomCursor);
} else {
  initCustomCursor();
}

// Reinitialize after Astro View Transitions
document.addEventListener("astro:page-load", () => {
  // Reset initialization flag to allow reinit
  const cursorWrapper = document.querySelector(".custom-cursor-wrapper");
  if (cursorWrapper instanceof HTMLElement) {
    delete cursorWrapper.dataset.cursorInit;
  }
  initCustomCursor();
});
