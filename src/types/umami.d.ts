/**
 * Umami Analytics TypeScript Definitions
 *
 * Type-safe interface for Umami's client-side tracking API.
 * Umami script injects a global `umami` object on window.
 *
 * @see https://umami.is/docs/track-events
 */

export interface UmamiEventData {
  [key: string]: string | number | boolean;
}

export interface UmamiTracker {
  /**
   * Track a custom event with optional data
   *
   * @param eventName - Name of the event (e.g., 'cta-click', 'scroll-depth')
   * @param eventData - Optional key-value pairs for event metadata
   *
   * @example
   * umami.track('cta-click', { location: 'hero', text: 'Start a Conversation' });
   * umami.track('scroll-depth', { page: 'statsbomb-case-study', depth: '75%' });
   */
  track: (eventName: string, eventData?: UmamiEventData) => void;
}

declare global {
  interface Window {
    /**
     * Umami tracker instance (available after script loads)
     * Check for existence before calling: `if (window.umami) { ... }`
     */
    umami?: UmamiTracker;
  }
}

export {};
