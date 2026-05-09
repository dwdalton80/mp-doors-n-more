/**
 * Client-side analytics tracking utility
 * Logs page views and user interactions to the server
 */

export interface AnalyticsEvent {
  eventType: "page_view" | "quote_request" | "contact_form" | "phone_call";
  eventName: string;
  productName?: string;
  pageUrl?: string;
  referrer?: string;
  userAgent?: string;
  metadata?: Record<string, any>;
}

/**
 * Log a page view event
 */
export function logPageView(pagePath: string, pageTitle?: string) {
  // Send to server via beacon API for reliability
  const data = {
    eventType: "page_view",
    eventName: `Page View: ${pageTitle || pagePath}`,
    pageUrl: window.location.href,
    referrer: document.referrer,
    userAgent: navigator.userAgent,
    metadata: {
      pagePath,
      pageTitle: document.title,
      timestamp: new Date().toISOString(),
    },
  };

  // Use sendBeacon for reliability (fires even if page unloads)
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/analytics/track", JSON.stringify(data));
  } else {
    // Fallback to fetch
    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      keepalive: true,
    }).catch(() => {
      // Silently fail - don't break the app for analytics errors
    });
  }
}

/**
 * Log a custom event
 */
export function logEvent(event: AnalyticsEvent) {
  const data = {
    ...event,
    pageUrl: window.location.href,
    referrer: document.referrer,
    userAgent: navigator.userAgent,
    timestamp: new Date().toISOString(),
  };

  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/analytics/track", JSON.stringify(data));
  } else {
    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      keepalive: true,
    }).catch(() => {
      // Silently fail
    });
  }
}

/**
 * Track phone call click
 */
export function logPhoneCallClick(phoneNumber: string) {
  logEvent({
    eventType: "phone_call",
    eventName: `Phone Call: ${phoneNumber}`,
    metadata: {
      phoneNumber,
      timestamp: new Date().toISOString(),
    },
  });
}
