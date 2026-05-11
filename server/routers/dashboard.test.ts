import { describe, it, expect, beforeEach, vi } from "vitest";
import { dashboardRouter } from "./dashboard";

describe("Dashboard Router", () => {
  describe("getAnalytics", () => {
    it("should return analytics data with all required fields", async () => {
      // Mock admin context
      const mockContext = {
        user: { id: "admin", role: "admin" },
      } as any;

      const caller = dashboardRouter.createCaller(mockContext);
      const result = await caller.getAnalytics();

      expect(result).toBeDefined();
      expect(result.totalVisitors).toBeGreaterThanOrEqual(0);
      expect(result.pageViews).toBeGreaterThanOrEqual(0);
      expect(result.bounceRate).toBeGreaterThanOrEqual(0);
      expect(result.avgSessionDuration).toBeDefined();
    });

    it("should return top pages array", async () => {
      const mockContext = {
        user: { id: "admin", role: "admin" },
      } as any;

      const caller = dashboardRouter.createCaller(mockContext);
      const result = await caller.getAnalytics();

      expect(Array.isArray(result.topPages)).toBe(true);
      expect(result.topPages.length).toBeGreaterThan(0);
      expect(result.topPages[0]).toHaveProperty("path");
      expect(result.topPages[0]).toHaveProperty("views");
      expect(result.topPages[0]).toHaveProperty("visitors");
    });

    it("should return traffic sources", async () => {
      const mockContext = {
        user: { id: "admin", role: "admin" },
      } as any;

      const caller = dashboardRouter.createCaller(mockContext);
      const result = await caller.getAnalytics();

      expect(Array.isArray(result.trafficSources)).toBe(true);
      expect(result.trafficSources.length).toBeGreaterThan(0);
      expect(result.trafficSources[0]).toHaveProperty("source");
      expect(result.trafficSources[0]).toHaveProperty("visitors");
      expect(result.trafficSources[0]).toHaveProperty("percentage");
    });

    it("should return conversions data", async () => {
      const mockContext = {
        user: { id: "admin", role: "admin" },
      } as any;

      const caller = dashboardRouter.createCaller(mockContext);
      const result = await caller.getAnalytics();

      expect(result.conversions).toBeDefined();
      expect(result.conversions).toHaveProperty("quoteRequests");
      expect(result.conversions).toHaveProperty("contactFormSubmissions");
      expect(result.conversions).toHaveProperty("phoneCallsTracked");
      expect(result.conversions).toHaveProperty("facebookClicks");
    });

    it("should return device breakdown", async () => {
      const mockContext = {
        user: { id: "admin", role: "admin" },
      } as any;

      const caller = dashboardRouter.createCaller(mockContext);
      const result = await caller.getAnalytics();

      expect(Array.isArray(result.deviceBreakdown)).toBe(true);
      expect(result.deviceBreakdown.length).toBeGreaterThan(0);
      expect(result.deviceBreakdown[0]).toHaveProperty("device");
      expect(result.deviceBreakdown[0]).toHaveProperty("percentage");
      expect(result.deviceBreakdown[0]).toHaveProperty("visitors");
    });

    it("should return daily visitors data", async () => {
      const mockContext = {
        user: { id: "admin", role: "admin" },
      } as any;

      const caller = dashboardRouter.createCaller(mockContext);
      const result = await caller.getAnalytics();

      expect(Array.isArray(result.dailyVisitors)).toBe(true);
      if (result.dailyVisitors.length > 0) {
        expect(result.dailyVisitors[0]).toHaveProperty("date");
        expect(result.dailyVisitors[0]).toHaveProperty("visitors");
      }
    });

    it("should accept optional date range parameters", async () => {
      const mockContext = {
        user: { id: "admin", role: "admin" },
      } as any;

      const caller = dashboardRouter.createCaller(mockContext);
      const result = await caller.getAnalytics({
        startDate: "2026-05-01",
        endDate: "2026-05-09",
      });

      expect(result).toBeDefined();
      expect(result.totalVisitors).toBeGreaterThanOrEqual(0);
    });
  });

  describe("getConversions", () => {
    it("should return conversion events", async () => {
      const mockContext = {
        user: { id: "admin", role: "admin" },
      } as any;

      const caller = dashboardRouter.createCaller(mockContext);
      const result = await caller.getConversions();

      expect(result).toBeDefined();
      expect(Array.isArray(result.events)).toBe(true);
      expect(result).toHaveProperty("total");
    });

    it("should filter conversions by event type", async () => {
      const mockContext = {
        user: { id: "admin", role: "admin" },
      } as any;

      const caller = dashboardRouter.createCaller(mockContext);
      const result = await caller.getConversions({
        eventType: "quote_request",
      });

      expect(result).toBeDefined();
      expect(Array.isArray(result.events)).toBe(true);
      // All events should be quote requests
      result.events.forEach((event) => {
        expect(event.eventType).toBe("quote_request");
      });
    });

    it("should filter conversions by date range", async () => {
      const mockContext = {
        user: { id: "admin", role: "admin" },
      } as any;

      const caller = dashboardRouter.createCaller(mockContext);
      const result = await caller.getConversions({
        startDate: "2026-05-01",
        endDate: "2026-05-09",
      });

      expect(result).toBeDefined();
      expect(Array.isArray(result.events)).toBe(true);
    });

    it("should return conversion details", async () => {
      const mockContext = {
        user: { id: "admin", role: "admin" },
      } as any;

      const caller = dashboardRouter.createCaller(mockContext);
      const result = await caller.getConversions();

      if (result.events.length > 0) {
        const event = result.events[0];
        expect(event).toHaveProperty("id");
        expect(event).toHaveProperty("eventType");
        expect(event).toHaveProperty("eventName");
        expect(event).toHaveProperty("createdAt");
      }
    });
  });

  describe("Authorization", () => {
    it("should allow public access to getAnalytics (for password-verified clients)", async () => {
      // Mock non-admin context
      const mockContext = {
        user: { id: "user", role: "user" },
      } as any;

      const caller = dashboardRouter.createCaller(mockContext);

      // Should not throw - getAnalytics is public
      const result = await caller.getAnalytics();
      expect(result).toBeDefined();
      expect(result.totalVisitors).toBeGreaterThanOrEqual(0);
    });

    it("should require admin role for getConversions", async () => {
      const mockContext = {
        user: { id: "user", role: "user" },
      } as any;

      const caller = dashboardRouter.createCaller(mockContext);

      try {
        await caller.getConversions();
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.code).toBe("FORBIDDEN");
      }
    });
  });

  describe("Data Validation", () => {
    it("should return non-negative numbers", async () => {
      const mockContext = {
        user: { id: "admin", role: "admin" },
      } as any;

      const caller = dashboardRouter.createCaller(mockContext);
      const result = await caller.getAnalytics();

      expect(result.totalVisitors).toBeGreaterThanOrEqual(0);
      expect(result.pageViews).toBeGreaterThanOrEqual(0);
      expect(result.bounceRate).toBeGreaterThanOrEqual(0);
      expect(result.avgSessionDuration).toBeGreaterThanOrEqual(0);
    });

    it("should return valid percentages", async () => {
      const mockContext = {
        user: { id: "admin", role: "admin" },
      } as any;

      const caller = dashboardRouter.createCaller(mockContext);
      const result = await caller.getAnalytics();

      result.trafficSources.forEach((source) => {
        expect(source.percentage).toBeGreaterThanOrEqual(0);
        expect(source.percentage).toBeLessThanOrEqual(100);
      });

      result.deviceBreakdown.forEach((device) => {
        expect(device.percentage).toBeGreaterThanOrEqual(0);
        expect(device.percentage).toBeLessThanOrEqual(100);
      });
    });

    it("should return bounce rate between 0 and 100", async () => {
      const mockContext = {
        user: { id: "admin", role: "admin" },
      } as any;

      const caller = dashboardRouter.createCaller(mockContext);
      const result = await caller.getAnalytics();

      expect(result.bounceRate).toBeGreaterThanOrEqual(0);
      expect(result.bounceRate).toBeLessThanOrEqual(100);
    });
  });
});
