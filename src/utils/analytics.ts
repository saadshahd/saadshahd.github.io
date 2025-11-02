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

/**
 * Track photo lightbox open (user clicks thumbnail)
 *
 * Useful for understanding which photos attract attention and get opened.
 *
 * @param galleryId - Gallery container ID (e.g., 'media-gallery', 'statsbomb-photos')
 * @param photoSrc - Image path (unique identifier)
 * @param photoIndex - Position in gallery (0-indexed)
 * @param page - Page identifier (e.g., 'statsbomb-case-study')
 *
 * @example
 * trackPhotoClick('media-gallery', '/images/team-photo.jpg', 0, 'statsbomb-case-study');
 */
export function trackPhotoClick(
  galleryId: string,
  photoSrc: string,
  photoIndex: number,
  page: string,
): void {
  trackEvent("photo-click", {
    gallery: galleryId,
    photo: photoSrc,
    position: photoIndex + 1, // Human-readable (1-indexed)
    page,
  });
}

/**
 * Track gallery navigation (prev/next slide in lightbox)
 *
 * Useful for understanding how deeply users explore galleries.
 *
 * @param galleryId - Gallery container ID
 * @param photoIndex - New slide index (0-indexed)
 * @param totalPhotos - Total slides in gallery
 *
 * @example
 * trackPhotoNavigation('media-gallery', 3, 16);
 */
export function trackPhotoNavigation(
  galleryId: string,
  photoIndex: number,
  totalPhotos: number,
): void {
  trackEvent("photo-navigation", {
    gallery: galleryId,
    position: photoIndex + 1,
    total: totalPhotos,
    depth: `${Math.round(((photoIndex + 1) / totalPhotos) * 100)}%`,
  });
}

/**
 * Track lightbox close (engagement session end)
 *
 * Useful for understanding gallery completion rates and engagement depth.
 *
 * @param galleryId - Gallery container ID
 * @param viewedCount - Number of unique photos viewed in this session
 * @param totalPhotos - Total slides in gallery
 *
 * @example
 * trackLightboxClose('media-gallery', 5, 16); // Viewed 5 out of 16 photos (31% completion)
 */
export function trackLightboxClose(
  galleryId: string,
  viewedCount: number,
  totalPhotos: number,
): void {
  trackEvent("lightbox-close", {
    gallery: galleryId,
    viewed: viewedCount,
    total: totalPhotos,
    completion: `${Math.round((viewedCount / totalPhotos) * 100)}%`,
  });
}

/**
 * Track UTM campaign parameters on page load
 *
 * Captures marketing campaign source/medium/campaign from URL parameters.
 * Essential for understanding which LinkedIn posts/campaigns drive traffic.
 *
 * @param source - Traffic source (e.g., 'linkedin', 'twitter', 'email')
 * @param medium - Marketing medium (e.g., 'social', 'paid', 'organic')
 * @param campaign - Campaign identifier (e.g., 'case-study-launch', 'portfolio-update')
 * @param content - Optional content identifier (e.g., 'post-nov-1', 'comment-thread')
 * @param term - Optional search term for paid campaigns
 *
 * @example
 * trackCampaignSource('linkedin', 'social', 'case-study-launch', 'post-nov-1');
 * trackCampaignSource('google', 'cpc', 'engineering-leads', undefined, 'functional-architecture');
 */
export function trackCampaignSource(
  source: string,
  medium: string,
  campaign: string,
  content?: string,
  term?: string,
): void {
  trackEvent("campaign-source", {
    source,
    medium,
    campaign,
    ...(content && { content }),
    ...(term && { term }),
  });
}

/**
 * Track entry point when visitor lands on site
 *
 * Captures where visitors enter the site and from which source.
 * Essential for understanding LinkedIn funnel entry points.
 *
 * @param landingPage - First page visited (e.g., '/portfolio/statsbomb', '/')
 * @param referrer - Referring domain (e.g., 'linkedin.com', 'direct')
 * @param device - Device type (e.g., 'mobile', 'desktop', 'tablet')
 *
 * @example
 * trackEntry('/portfolio/statsbomb', 'linkedin.com', 'mobile');
 * trackEntry('/', 'direct', 'desktop');
 */
export function trackEntry(
  landingPage: string,
  referrer: string,
  device: string,
): void {
  trackEvent("entry", {
    landing: landingPage,
    referrer,
    device,
  });
}

/**
 * Track exit point when visitor leaves site
 *
 * Captures last page, section, and engagement depth before leaving.
 * Essential for understanding where 75% bounce rate occurs.
 *
 * @param lastPage - Last page visited before exit
 * @param lastSection - Last section ID viewed (optional)
 * @param timeOnPage - Seconds spent on last page
 * @param scrollDepth - Percentage scrolled on last page
 *
 * @example
 * trackExit('/portfolio/statsbomb', 'architecture', 187, 65);
 * trackExit('/', undefined, 12, 15);
 */
export function trackExit(
  lastPage: string,
  lastSection: string | undefined,
  timeOnPage: number,
  scrollDepth: number,
): void {
  trackEvent("exit", {
    page: lastPage,
    ...(lastSection && { section: lastSection }),
    duration: timeOnPage,
    depth: `${scrollDepth}%`,
  });
}

/**
 * Track time spent viewing a specific section
 *
 * Measures engagement depth by tracking how long visitors spend in each section.
 * Essential for understanding which sections hold attention.
 *
 * @param page - Page identifier (e.g., 'statsbomb-case-study')
 * @param section - Section identifier (e.g., 'architecture', 'origins')
 * @param timeInSection - Seconds actively viewing this section
 * @param engagementScore - Engagement quality ('low' | 'medium' | 'high')
 *
 * @example
 * trackSectionTime('statsbomb-case-study', 'architecture', 183, 'high');
 * trackSectionTime('statsbomb-case-study', 'origins', 45, 'medium');
 */
export function trackSectionTime(
  page: string,
  section: string,
  timeInSection: number,
  engagementScore: "low" | "medium" | "high",
): void {
  trackEvent("section-time", {
    page,
    section,
    duration: timeInSection,
    engagement: engagementScore,
  });
}

/**
 * Track resume download clicks
 *
 * Captures resume downloads as key conversion events.
 * Essential for understanding serious interest from visitors.
 *
 * @param source - Page/component where download was triggered (e.g., 'statsbomb-cta', 'about-page', 'footer')
 * @param format - File format ('pdf', 'docx')
 * @param referrer - Referring domain (e.g., 'linkedin.com', 'direct')
 *
 * @example
 * trackResumeDownload('statsbomb-cta', 'pdf', 'linkedin.com');
 * trackResumeDownload('footer', 'pdf', 'direct');
 */
export function trackResumeDownload(
  source: string,
  format: string,
  referrer: string,
): void {
  trackEvent("resume-download", {
    source,
    format,
    referrer,
  });
}

/**
 * Track cross-page navigation flow
 *
 * Captures visitor journey through the site to understand navigation patterns.
 * Essential for understanding LinkedIn → Statsbomb → (About? Contact? Exit?) flow.
 *
 * @param fromPage - Previous page path
 * @param toPage - New page path
 * @param trigger - What triggered navigation (e.g., 'footer-cta', 'nav-link', 'case-study-card')
 * @param timeOnPreviousPage - Seconds spent on previous page
 *
 * @example
 * trackPageFlow('/portfolio/statsbomb', '/about', 'footer-cta', 245);
 * trackPageFlow('/', '/portfolio/statsbomb', 'case-study-card', 32);
 */
export function trackPageFlow(
  fromPage: string,
  toPage: string,
  trigger: string,
  timeOnPreviousPage: number,
): void {
  trackEvent("page-flow", {
    from: fromPage,
    to: toPage,
    trigger,
    duration: timeOnPreviousPage,
  });
}

/**
 * Track read completion rate for long-form content
 *
 * Measures how much of a case study/article was actually consumed.
 * Essential for understanding if visitors finish the Statsbomb story.
 *
 * @param page - Page identifier (e.g., 'statsbomb-case-study')
 * @param completion - Completion percentage (0-100)
 * @param sectionsRead - Array of section IDs that were viewed
 * @param tldrExpanded - Whether TL;DR accordion was expanded
 * @param regretsExpanded - Whether "What I'd Change" accordion was expanded
 *
 * @example
 * trackReadCompletion('statsbomb-case-study', 85, ['origins', 'architecture', 'lessons'], true, false);
 * trackReadCompletion('statsbomb-case-study', 45, ['origins'], false, false);
 */
export function trackReadCompletion(
  page: string,
  completion: number,
  sectionsRead: string[],
  tldrExpanded: boolean,
  regretsExpanded: boolean,
): void {
  trackEvent("read-completion", {
    page,
    completion: `${completion}%`,
    sections: sectionsRead.join(","),
    tldr: tldrExpanded ? "expanded" : "collapsed",
    regrets: regretsExpanded ? "expanded" : "collapsed",
  });
}
