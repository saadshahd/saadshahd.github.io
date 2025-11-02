/**
 * Resume Download Tracking
 *
 * Tracks resume downloads as key conversion events.
 * Essential for measuring serious interest from visitors.
 */

import { trackResumeDownload } from "@/utils/analytics";

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
 * Setup resume download tracking
 */
function setupResumeDownloadTracking() {
  // Find all links to resume files
  const resumeLinks = document.querySelectorAll('a[href*="resume.pdf"]');

  resumeLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const href = (link as HTMLAnchorElement).href;
      const format = href.endsWith(".pdf") ? "pdf" : "docx";

      // Determine source from data attribute or page location
      const sourceAttr = link.getAttribute("data-track-location");
      const source = sourceAttr || window.location.pathname;

      trackResumeDownload(source, format, getReferrer());
    });
  });
}

// Run after page load (support View Transitions)
document.addEventListener("astro:page-load", setupResumeDownloadTracking);
