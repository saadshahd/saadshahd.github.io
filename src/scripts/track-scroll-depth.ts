/**
 * Scroll Depth Tracking for Case Study Pages
 *
 * Tracks reader engagement by firing events at 25%, 50%, 75%, and 100% scroll milestones.
 * Uses Intersection Observer for accurate, performant tracking.
 */

import { trackScrollDepth } from "@/utils/analytics";

// Track scroll depth milestones using Intersection Observer
function setupScrollDepthTracking() {
  // Define depth milestones with corresponding sections
  const depthMarkers = [
    { depth: 25, selector: "#origins", label: "Origins" },
    { depth: 50, selector: "#architecture", label: "Architecture" },
    { depth: 75, selector: "#lessons", label: "Lessons" },
    { depth: 100, selector: "#behind-the-scenes", label: "End" },
  ];

  // Track which depths have already been fired (prevent duplicates)
  const firedDepths = new Set<number>();

  // Create Intersection Observer for each marker
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Find which depth marker this element corresponds to
          const marker = depthMarkers.find((m) =>
            entry.target.matches(m.selector),
          );

          if (marker && !firedDepths.has(marker.depth)) {
            // Track this depth milestone
            trackScrollDepth(
              "statsbomb-case-study",
              marker.depth,
              marker.label,
            );
            firedDepths.add(marker.depth);

            // Stop observing this element (fire once only)
            observer.unobserve(entry.target);
          }
        }
      });
    },
    {
      // Fire when 10% of element is visible
      // Lower threshold needed because sections are taller than viewport
      threshold: 0.1,
    },
  );

  // Observe all depth marker elements
  depthMarkers.forEach((marker) => {
    const element = document.querySelector(marker.selector);
    if (element) {
      observer.observe(element);
    }
  });
}

// Run after page load (support View Transitions)
document.addEventListener("astro:page-load", setupScrollDepthTracking);
