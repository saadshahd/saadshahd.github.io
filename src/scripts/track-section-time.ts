/**
 * Section Time Tracking
 *
 * Measures how long visitors spend viewing each section of the case study.
 * Essential for understanding which sections hold attention vs. get skimmed.
 */

import { trackSectionTime } from "@/utils/analytics";
import { setLastVisibleSection } from "./track-entry-exit";

// Track time spent in each section
interface SectionTimeData {
  startTime: number | null;
  totalTime: number;
  hasTracked: boolean;
}

const sectionTimes = new Map<string, SectionTimeData>();

/**
 * Calculate engagement score based on time and section type
 */
function calculateEngagementScore(
  timeInSection: number,
  sectionId: string,
): "low" | "medium" | "high" {
  // Different expectations for different sections
  const thresholds: Record<string, { low: number; high: number }> = {
    origins: { low: 20, high: 60 },
    architecture: { low: 30, high: 90 },
    impact: { low: 15, high: 45 },
    lessons: { low: 20, high: 60 },
    "behind-the-scenes": { low: 10, high: 30 },
  };

  const threshold = thresholds[sectionId] || { low: 15, high: 45 };

  if (timeInSection < threshold.low) return "low";
  if (timeInSection >= threshold.high) return "high";
  return "medium";
}

/**
 * Setup section time tracking using Intersection Observer
 */
function setupSectionTimeTracking() {
  // Define sections to track (case study sections)
  const sections = document.querySelectorAll(
    "section[id], article > div[id]",
  ) as NodeListOf<HTMLElement>;

  // Initialize tracking data for each section
  sections.forEach((section) => {
    if (section.id) {
      sectionTimes.set(section.id, {
        startTime: null,
        totalTime: 0,
        hasTracked: false,
      });
    }
  });

  // Create observer to track when sections enter/exit viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const sectionId = (entry.target as HTMLElement).id;
        if (!sectionId) return;

        const data = sectionTimes.get(sectionId);
        if (!data) return;

        if (entry.isIntersecting) {
          // Section entered viewport - start timer
          data.startTime = Date.now();
          setLastVisibleSection(sectionId);
        } else if (data.startTime) {
          // Section left viewport - accumulate time
          const timeSpent = Math.round((Date.now() - data.startTime) / 1000);
          data.totalTime += timeSpent;
          data.startTime = null;

          // Track if spent meaningful time (>5 seconds) and not yet tracked
          if (data.totalTime > 5 && !data.hasTracked) {
            const engagement = calculateEngagementScore(data.totalTime, sectionId);
            trackSectionTime(
              "statsbomb-case-study",
              sectionId,
              data.totalTime,
              engagement,
            );
            data.hasTracked = true;
          }
        }
      });
    },
    {
      // Fire when 25% of section is visible
      threshold: 0.25,
    },
  );

  // Observe all sections
  sections.forEach((section) => {
    if (section.id) {
      observer.observe(section);
    }
  });

  // Track remaining time when leaving page (only register once)
  if (!window.__sectionTimeUnloadInitialized) {
    window.__sectionTimeUnloadInitialized = true;
    window.addEventListener("beforeunload", () => {
      sectionTimes.forEach((data, sectionId) => {
        // Finalize any active timers
        if (data.startTime) {
          const timeSpent = Math.round((Date.now() - data.startTime) / 1000);
          data.totalTime += timeSpent;
        }

        // Track any untracked sections with meaningful time
        if (data.totalTime > 5 && !data.hasTracked) {
          const engagement = calculateEngagementScore(data.totalTime, sectionId);
          trackSectionTime(
            "statsbomb-case-study",
            sectionId,
            data.totalTime,
            engagement,
          );
        }
      });
    });
  }
}

// Extend Window interface for flag
declare global {
  interface Window {
    __sectionTimeUnloadInitialized?: boolean;
  }
}

// Run after page load (support View Transitions)
document.addEventListener("astro:page-load", setupSectionTimeTracking);
