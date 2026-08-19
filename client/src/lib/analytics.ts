/**
 * Client-side analytics tracking utility
 * Forwards events to Google Analytics (gtag.js, loaded in index.html).
 * No backend involved — safe no-op if gtag hasn't loaded yet.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export interface AnalyticsEvent {
  eventType: "page_view" | "quote_request" | "contact_form" | "phone_call" | "facebook_click" | "google_review_click";
  eventName: string;
  productName?: string;
  pageUrl?: string;
  referrer?: string;
  userAgent?: string;
  metadata?: Record<string, any>;
}

function gtag(...args: unknown[]) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag(...args);
  }
}

/**
 * Log a page view event
 */
export function logPageView(pagePath: string, pageTitle?: string) {
  gtag("event", "page_view", {
    page_path: pagePath,
    page_title: pageTitle || document.title,
  });
}

/**
 * Log a custom event
 */
export function logEvent(event: AnalyticsEvent) {
  gtag("event", event.eventType, {
    event_label: event.eventName,
    ...event.metadata,
  });
}

/**
 * Track phone call click with debouncing to prevent duplicate clicks
 * Only tracks the first click within 5 seconds from the same phone number
 */
const phoneCallDebounceMap = new Map<string, number>();
const PHONE_CALL_DEBOUNCE_MS = 5000; // 5 seconds

export function logPhoneCallClick(phoneNumber: string) {
  const now = Date.now();
  const lastClickTime = phoneCallDebounceMap.get(phoneNumber) || 0;

  if (now - lastClickTime < PHONE_CALL_DEBOUNCE_MS) {
    return;
  }
  phoneCallDebounceMap.set(phoneNumber, now);

  logEvent({
    eventType: "phone_call",
    eventName: `Phone Call: ${phoneNumber}`,
    metadata: { phoneNumber },
  });
}
