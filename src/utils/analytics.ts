/**
 * Analytics Tracking Utilities
 *
 * Type-safe wrappers for Umami event tracking with graceful degradation.
 * All functions check for SSR safety and Umami script availability.
 */

import type { UmamiEventData } from "@/types/umami";

/**
 * Core event tracking function
 *
 * Safely tracks custom events with Umami. Handles SSR gracefully
 * by checking for window object and Umami script availability.
 *
 * @param eventName - Name of the event (kebab-case recommended)
 * @param eventData - Optional metadata as key-value pairs
 *
 * @example
 * trackEvent('page-view', { section: 'portfolio' });
 * trackEvent('error', { type: '404', path: window.location.pathname });
 */
export function trackEvent(
  eventName: string,
  eventData?: UmamiEventData,
): void {
  // SSR safety: window not available during build
  if (typeof window === "undefined") return;

  // Check if Umami script loaded successfully
  if (!window.umami) {
    console.warn(`[Analytics] Umami not loaded, skipping event: ${eventName}`);
    return;
  }

  try {
    window.umami.track(eventName, eventData);
  } catch (error) {
    console.error(`[Analytics] Failed to track event "${eventName}":`, error);
  }
}

/**
 * Track CTA (Call-to-Action) button/link clicks
 *
 * @param location - Where on the page (e.g., 'hero', 'footer', 'case-study-card')
 * @param text - Button/link text content
 * @param destination - Optional href/destination URL
 *
 * @example
 * trackCTAClick('hero', 'Start a Conversation', '/contact');
 * trackCTAClick('case-study-card', 'Read Full Case Study', '/portfolio/statsbomb');
 */
export function trackCTAClick(
  location: string,
  text: string,
  destination?: string,
): void {
  trackEvent("cta-click", {
    location,
    text,
    ...(destination && { destination }),
  });
}

/**
 * Track scroll depth milestones on long-form content
 *
 * @param page - Page identifier (e.g., 'statsbomb-case-study', 'about-page')
 * @param depth - Scroll depth percentage (25, 50, 75, 100)
 * @param section - Optional section ID where depth was reached
 *
 * @example
 * trackScrollDepth('statsbomb-case-study', 50, 'architecture');
 * trackScrollDepth('about-page', 100);
 */
export function trackScrollDepth(
  page: string,
  depth: number,
  section?: string,
): void {
  trackEvent("scroll-depth", {
    page,
    depth: `${depth}%`,
    ...(section && { section }),
  });
}

/**
 * Track section visibility (when user scrolls a section into view)
 *
 * Useful for understanding which sections get attention vs. skipped.
 *
 * @param page - Page identifier
 * @param sectionName - Human-readable section name
 *
 * @example
 * trackSectionView('statsbomb-case-study', 'Impact');
 * trackSectionView('about-page', 'Expertise');
 */
export function trackSectionView(page: string, sectionName: string): void {
  trackEvent("section-view", {
    page,
    section: sectionName,
  });
}

/**
 * Track outbound link clicks (external sites, PDFs, etc.)
 *
 * @param destination - Full URL being navigated to
 * @param sourcePage - Page where the link was clicked
 * @param linkText - Optional link text for context
 *
 * @example
 * trackOutboundLink('https://linkedin.com/in/saadshahd', '/contact', 'LinkedIn Profile');
 * trackOutboundLink('/resume.pdf', '/about', 'Download Resume');
 */
export function trackOutboundLink(
  destination: string,
  sourcePage: string,
  linkText?: string,
): void {
  trackEvent("outbound-link", {
    destination,
    source: sourcePage,
    ...(linkText && { text: linkText }),
  });
}

/**
 * Track form submissions (contact, newsletter, etc.)
 *
 * @param formName - Form identifier
 * @param success - Whether submission succeeded
 *
 * @example
 * trackFormSubmit('contact-form', true);
 * trackFormSubmit('newsletter-signup', false);
 */
export function trackFormSubmit(formName: string, success: boolean): void {
  trackEvent("form-submit", {
    form: formName,
    success: success ? "true" : "false",
  });
}

/**
 * Track accordion expansion/collapse interactions
 *
 * Useful for understanding which content gets revealed vs. skipped.
 *
 * @param accordionId - Unique identifier for the accordion
 * @param action - Whether accordion was expanded or collapsed
 * @param page - Page identifier (e.g., 'statsbomb-case-study')
 * @param section - Optional parent section name
 *
 * @example
 * trackAccordionToggle('impact-details', 'expand', 'statsbomb-case-study', 'Impact');
 * trackAccordionToggle('lessons-team-building', 'collapse', 'statsbomb-case-study');
 */
export function trackAccordionToggle(
  accordionId: string,
  action: "expand" | "collapse",
  page: string,
  section?: string,
): void {
  trackEvent("accordion-toggle", {
    id: accordionId,
    action,
    page,
    ...(section && { section }),
  });
}
