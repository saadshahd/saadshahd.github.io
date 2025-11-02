/**
 * Read Completion Tracking
 *
 * Measures how much of the case study was actually consumed.
 * Essential for understanding if visitors finish the Statsbomb story.
 */

import { trackReadCompletion } from "@/utils/analytics";

// Track viewed sections and accordion states
const viewedSections = new Set<string>();
let tldrExpanded = false;
let regretsExpanded = false;
let hasTracked = false;

/**
 * Calculate completion percentage based on sections viewed
 */
function calculateCompletion(): number {
  const totalSections = [
    "origins",
    "architecture",
    "impact",
    "lessons",
    "behind-the-scenes",
  ];

  const viewedCount = totalSections.filter((section) =>
    viewedSections.has(section),
  ).length;

  return Math.round((viewedCount / totalSections.length) * 100);
}

/**
 * Track section views with Intersection Observer
 */
function setupSectionTracking() {
  const sections = document.querySelectorAll(
    "section[id], article > div[id]",
  ) as NodeListOf<HTMLElement>;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = (entry.target as HTMLElement).id;
          if (sectionId) {
            viewedSections.add(sectionId);
          }
        }
      });
    },
    {
      // Consider section "viewed" when 50% is visible
      threshold: 0.5,
    },
  );

  sections.forEach((section) => {
    if (section.id) {
      observer.observe(section);
    }
  });
}

/**
 * Track accordion expansions
 */
function setupAccordionTracking() {
  // Track TL;DR accordion
  const tldrAccordion = document.querySelector(
    'details[id*="tldr"], details[id*="summary"]',
  );
  if (tldrAccordion) {
    tldrAccordion.addEventListener("toggle", () => {
      if ((tldrAccordion as HTMLDetailsElement).open) {
        tldrExpanded = true;
      }
    });
  }

  // Track "What I'd Change" accordion
  const regretsAccordion = document.querySelector(
    'details[id*="regret"], details[id*="change"]',
  );
  if (regretsAccordion) {
    regretsAccordion.addEventListener("toggle", () => {
      if ((regretsAccordion as HTMLDetailsElement).open) {
        regretsExpanded = true;
      }
    });
  }
}

/**
 * Track completion on page exit or significant engagement
 */
function trackCompletion() {
  if (hasTracked) return;

  const completion = calculateCompletion();

  // Only track if user engaged meaningfully (>20% completion)
  if (completion >= 20) {
    trackReadCompletion(
      "statsbomb-case-study",
      completion,
      Array.from(viewedSections),
      tldrExpanded,
      regretsExpanded,
    );
    hasTracked = true;
  }
}

/**
 * Setup read completion tracking
 */
let completionUnloadInitialized = false;

function setupReadCompletionTracking() {
  // Only track on case study pages
  if (!window.location.pathname.includes("/portfolio/")) return;

  setupSectionTracking();
  setupAccordionTracking();

  // Track on page exit (initialize once)
  if (!completionUnloadInitialized) {
    completionUnloadInitialized = true;
    window.addEventListener("beforeunload", trackCompletion);
  }

  // Also track after 2 minutes of engagement (catch early exits)
  setTimeout(trackCompletion, 120000);
}

// Run after page load (support View Transitions)
document.addEventListener("astro:page-load", setupReadCompletionTracking);
