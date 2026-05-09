import { Express, Request, Response } from "express";
import { logAnalyticsEvent } from "../db";

export function registerAnalyticsEndpoint(app: Express) {
  // REST endpoint for analytics tracking (used by client-side sendBeacon)
  app.post("/api/analytics/track", async (req: Request, res: Response) => {
    try {
      const { eventType, eventName, pageUrl, referrer, userAgent, metadata } = req.body;

      // Extract IP address from request
      const ipAddress =
        (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
        req.socket.remoteAddress ||
        undefined;

      // Log the analytics event
      await logAnalyticsEvent({
        eventType: eventType || "page_view",
        eventName: eventName || `${eventType || "page_view"} event`,
        pageUrl,
        referrer,
        userAgent,
        ipAddress,
        metadata,
      });

      // Return success response
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("[Analytics Endpoint] Error tracking event:", error);
      // Still return 200 to avoid beacon errors on client
      res.status(200).json({ success: false, error: "Failed to track event" });
    }
  });
}
