/**
 * Page Flow Tracking
 *
 * Tracks visitor navigation patterns across the site.
 * Essential for understanding LinkedIn → Statsbomb → (About? Contact? Exit?) funnel.
 */

import { trackPageFlow } from "@/utils/analytics";

// Track previous page and load time
let previousPage: string | null = null;
let pageLoadTime = Date.now();

/**
 * Determine what triggered the navigation
 */
function getNavigationTrigger(toPath: string): string {
  // Check if we can get more specific trigger from clicked element
  const recentClick = (window as any).__lastClickedElement;

  if (recentClick) {
    // Check for data-track-location attribute (from Button component)
    const trackLocation = recentClick.getAttribute?.("data-track-location");
    if (trackLocation) return trackLocation;

    // Check for common navigation patterns
    if (recentClick.closest("nav")) return "nav-link";
    if (recentClick.closest("footer")) return "footer-cta";
    if (recentClick.classList?.contains("case-study-card")) {
      return "case-study-card";
    }
  }

  // Fallback based on destination
  if (toPath.includes("/portfolio/")) return "case-study-link";
  if (toPath === "/about") return "about-link";
  if (toPath === "/contact") return "contact-link";

  return "unknown";
}

/**
 * Setup page flow tracking
 */
function setupPageFlowTracking() {
  const currentPage = window.location.pathname;

  // Track navigation from previous page to this page
  if (previousPage && previousPage !== currentPage) {
    const timeOnPreviousPage = Math.round((Date.now() - pageLoadTime) / 1000);
    const trigger = getNavigationTrigger(currentPage);

    trackPageFlow(previousPage, currentPage, trigger, timeOnPreviousPage);
  }

  // Update state for next navigation
  previousPage = currentPage;
  pageLoadTime = Date.now();
}

/**
 * Track clicked elements for trigger detection (initialize once)
 */
let clickTrackingInitialized = false;

function trackClickedElements() {
  if (clickTrackingInitialized) return;
  clickTrackingInitialized = true;

  document.addEventListener(
    "click",
    (event) => {
      const target = event.target as HTMLElement;
      const link = target.closest("a");
      if (link) {
        (window as any).__lastClickedElement = link;
      }
    },
    { passive: true },
  );
}

// Run after page load (support View Transitions)
document.addEventListener("astro:page-load", () => {
  setupPageFlowTracking();
  trackClickedElements();
});
