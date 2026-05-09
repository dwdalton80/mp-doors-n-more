import { describe, it, expect, vi, beforeEach } from "vitest";
import { dashboardRouter } from "./dashboard";

// Mock the environment variable
beforeEach(() => {
  vi.stubEnv("DASHBOARD_PASSWORD", "Maldonado");
});

describe("Dashboard Router", () => {
  describe("verifyPassword", () => {
    it("should return true for correct password", async () => {
      const caller = dashboardRouter.createCaller({} as any);
      const result = await caller.verifyPassword({ password: "Maldonado" });
      expect(result.isValid).toBe(true);
    });

    it("should return false for incorrect password", async () => {
      const caller = dashboardRouter.createCaller({} as any);
      const result = await caller.verifyPassword({ password: "WrongPassword" });
      expect(result.isValid).toBe(false);
    });

    it("should return false for empty password", async () => {
      const caller = dashboardRouter.createCaller({} as any);
      const result = await caller.verifyPassword({ password: "" });
      expect(result.isValid).toBe(false);
    });
  });

  describe("getAnalytics", () => {
    it("should return analytics data with all required fields", async () => {
      const caller = dashboardRouter.createCaller({} as any);
      const result = await caller.getAnalytics();

      expect(result).toBeDefined();
      expect(result.totalVisitors).toBeGreaterThan(0);
      expect(result.pageViews).toBeGreaterThan(0);
      expect(result.bounceRate).toBeGreaterThan(0);
      expect(result.avgSessionDuration).toBeDefined();
    });

    it("should return top pages array", async () => {
      const caller = dashboardRouter.createCaller({} as any);
      const result = await caller.getAnalytics();

      expect(Array.isArray(result.topPages)).toBe(true);
      expect(result.topPages.length).toBeGreaterThan(0);
      expect(result.topPages[0]).toHaveProperty("path");
      expect(result.topPages[0]).toHaveProperty("views");
      expect(result.topPages[0]).toHaveProperty("visitors");
    });

    it("should return traffic sources data", async () => {
      const caller = dashboardRouter.createCaller({} as any);
      const result = await caller.getAnalytics();

      expect(Array.isArray(result.trafficSources)).toBe(true);
      expect(result.trafficSources.length).toBeGreaterThan(0);
      expect(result.trafficSources[0]).toHaveProperty("source");
      expect(result.trafficSources[0]).toHaveProperty("visitors");
      expect(result.trafficSources[0]).toHaveProperty("percentage");
    });

    it("should return conversion metrics", async () => {
      const caller = dashboardRouter.createCaller({} as any);
      const result = await caller.getAnalytics();

      expect(result.conversions).toBeDefined();
      expect(result.conversions).toHaveProperty("quoteRequests");
      expect(result.conversions).toHaveProperty("contactFormSubmissions");
      expect(result.conversions).toHaveProperty("phoneCallsTracked");
    });

    it("should return device breakdown data", async () => {
      const caller = dashboardRouter.createCaller({} as any);
      const result = await caller.getAnalytics();

      expect(Array.isArray(result.deviceBreakdown)).toBe(true);
      expect(result.deviceBreakdown.length).toBeGreaterThan(0);
      expect(result.deviceBreakdown[0]).toHaveProperty("device");
      expect(result.deviceBreakdown[0]).toHaveProperty("percentage");
      expect(result.deviceBreakdown[0]).toHaveProperty("visitors");
    });

    it("should return daily visitors data", async () => {
      const caller = dashboardRouter.createCaller({} as any);
      const result = await caller.getAnalytics();

      expect(Array.isArray(result.dailyVisitors)).toBe(true);
      expect(result.dailyVisitors.length).toBe(7); // 7 days of the week
      expect(result.dailyVisitors[0]).toHaveProperty("date");
      expect(result.dailyVisitors[0]).toHaveProperty("visitors");
    });
  });
});
