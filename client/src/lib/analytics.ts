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
 * Detect device type from user agent
 */
function detectDeviceType(): "mobile" | "tablet" | "desktop" {
  const ua = navigator.userAgent.toLowerCase();
  if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua)) {
    return "mobile";
  }
  if (/ipad|android(?!.*mobile)|tablet|kindle/i.test(ua)) {
    return "tablet";
  }
  return "desktop";
}

/**
 * Extract traffic source from referrer
 */
function getTrafficSource(referrer: string): string {
  if (!referrer) return "direct";
  
  try {
    const referrerUrl = new URL(referrer);
    const hostname = referrerUrl.hostname.toLowerCase();
    
    if (hostname.includes("google")) return "google";
    if (hostname.includes("facebook")) return "facebook";
    if (hostname.includes("instagram")) return "instagram";
    if (hostname.includes("twitter") || hostname.includes("x.com")) return "twitter";
    if (hostname.includes("linkedin")) return "linkedin";
    if (hostname.includes("pinterest")) return "pinterest";
    if (hostname.includes("reddit")) return "reddit";
    if (hostname.includes("bing")) return "bing";
    if (hostname.includes("yahoo")) return "yahoo";
    if (hostname.includes("duckduckgo")) return "duckduckgo";
    
    // Generic search engine detection
    if (/search|query|find/i.test(hostname)) return "organic_search";
    
    // It's a referral from another site
    return "referral";
  } catch {
    return "referral";
  }
}

/**
 * Log a page view event
 */
export function logPageView(pagePath: string, pageTitle?: string) {
  // Send to server via beacon API for reliability
  const deviceType = detectDeviceType();
  const trafficSource = getTrafficSource(document.referrer);
  
  const data = {
    eventType: "page_view",
    eventName: `Page View: ${pageTitle || pagePath}`,
    pageUrl: window.location.href,
    referrer: document.referrer,
    userAgent: navigator.userAgent,
    metadata: {
      pagePath,
      pageTitle: document.title,
      deviceType,
      trafficSource,
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
  const deviceType = detectDeviceType();
  const trafficSource = getTrafficSource(document.referrer);
  
  const data = {
    ...event,
    pageUrl: window.location.href,
    referrer: document.referrer,
    userAgent: navigator.userAgent,
    metadata: {
      ...event.metadata,
      deviceType,
      trafficSource,
      timestamp: new Date().toISOString(),
    },
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
