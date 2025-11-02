/**
 * UTM Campaign Tracking
 *
 * Captures UTM parameters from URL on page load to understand traffic sources.
 * Essential for tracking LinkedIn post performance and campaign effectiveness.
 */

import { trackCampaignSource } from "@/utils/analytics";

function setupUTMTracking() {
  // Parse URL parameters
  const params = new URLSearchParams(window.location.search);

  const source = params.get("utm_source");
  const medium = params.get("utm_medium");
  const campaign = params.get("utm_campaign");
  const content = params.get("utm_content");
  const term = params.get("utm_term");

  // Only track if at least source/medium/campaign are present
  if (source && medium && campaign) {
    trackCampaignSource(
      source,
      medium,
      campaign,
      content || undefined,
      term || undefined,
    );
  }
}

// Run after page load (support View Transitions)
document.addEventListener("astro:page-load", setupUTMTracking);
