/**
 * Entry/Exit Point Tracking
 *
 * Tracks where visitors enter and exit the site, with engagement context.
 * Essential for understanding LinkedIn funnel drop-off points and bounce behavior.
 */

import { trackEntry, trackExit } from "@/utils/analytics";

// Session state for exit tracking
let pageLoadTime = Date.now();
let lastVisibleSection: string | undefined;
let maxScrollDepth = 0;

/**
 * Detect device type from user agent
 */
function getDeviceType(): string {
  const ua = navigator.userAgent.toLowerCase();
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }
  if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua,
    )
  ) {
    return "mobile";
  }
  return "desktop";
}

/**
 * Extract clean referrer domain
 */
function getReferrer(): string {
  if (!document.referrer) return "direct";

  try {
    const url = new URL(document.referrer);
    return url.hostname.replace("www.", "");
  } catch {
    return "unknown";
  }
}

/**
 * Track scroll depth for exit context
 */
function updateScrollDepth() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const currentDepth = Math.round((scrollTop / docHeight) * 100);

  maxScrollDepth = Math.max(maxScrollDepth, currentDepth);
}

/**
 * Track entry point when first landing
 */
function setupEntryTracking() {
  // Only track on first page load (not View Transitions)
  const isFirstLoad = !window.sessionStorage.getItem("entry-tracked");

  if (isFirstLoad) {
    trackEntry(window.location.pathname, getReferrer(), getDeviceType());
    window.sessionStorage.setItem("entry-tracked", "true");
  }

  // Reset page load time for this page
  pageLoadTime = Date.now();
  maxScrollDepth = 0;
}

/**
 * Track exit point before leaving
 */
let exitTrackingInitialized = false;

function setupExitTracking() {
  // Only initialize once (not on every View Transition)
  if (exitTrackingInitialized) return;
  exitTrackingInitialized = true;

  window.addEventListener("beforeunload", () => {
    const timeOnPage = Math.round((Date.now() - pageLoadTime) / 1000);
    trackExit(
      window.location.pathname,
      lastVisibleSection,
      timeOnPage,
      maxScrollDepth,
    );
  });

  // Update scroll depth continuously
  window.addEventListener("scroll", updateScrollDepth, { passive: true });
}

/**
 * Track visible section for exit context
 */
export function setLastVisibleSection(sectionId: string) {
  lastVisibleSection = sectionId;
}

// Run after page load (support View Transitions)
document.addEventListener("astro:page-load", () => {
  setupEntryTracking();
  setupExitTracking();
});
