import { describe, it, expect, vi } from "vitest";
import { reportsRouter } from "./reports";

describe("Reports Router", () => {
  describe("getTemplates", () => {
    it("should return all available templates", async () => {
      const caller = reportsRouter.createCaller({
        user: null,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.getTemplates();

      expect(result.templates).toHaveLength(4);
      expect(result.templates.map((t) => t.id)).toEqual([
        "executive",
        "detailed",
        "conversion",
        "custom",
      ]);
    });

    it("should return all available metrics", async () => {
      const caller = reportsRouter.createCaller({
        user: null,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.getTemplates();

      expect(result.availableMetrics).toHaveLength(8);
      expect(result.availableMetrics[0].id).toBe("totalVisitors");
    });
  });

  describe("generateReport", () => {
    it("should generate executive summary report", async () => {
      const caller = reportsRouter.createCaller({
        user: null,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.generateReport({
        template: "executive",
      });

      expect(result.success).toBe(true);
      expect(result.pdfBytes).toBeDefined();
      expect(Array.isArray(result.pdfBytes)).toBe(true);
      expect(result.fileName).toContain("analytics-report");
      expect(result.fileName).toContain(".pdf");
    });

    it("should generate detailed performance report", async () => {
      const caller = reportsRouter.createCaller({
        user: null,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.generateReport({
        template: "detailed",
      });

      expect(result.success).toBe(true);
      expect(result.pdfBytes).toBeDefined();
      expect(result.pdfBytes.length).toBeGreaterThan(0);
    });

    it("should generate conversion focused report", async () => {
      const caller = reportsRouter.createCaller({
        user: null,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.generateReport({
        template: "conversion",
      });

      expect(result.success).toBe(true);
      expect(result.pdfBytes).toBeDefined();
    });

    it("should generate custom report with selected metrics", async () => {
      const caller = reportsRouter.createCaller({
        user: null,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.generateReport({
        template: "custom",
        customMetrics: ["totalVisitors", "pageViews", "conversions"],
      });

      expect(result.success).toBe(true);
      expect(result.pdfBytes).toBeDefined();
      expect(result.pdfBytes.length).toBeGreaterThan(0);
    });

    it("should include date in filename", async () => {
      const caller = reportsRouter.createCaller({
        user: null,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.generateReport({
        template: "executive",
      });

      const today = new Date().toISOString().split("T")[0];
      expect(result.fileName).toContain(today);
    });

    it("should generate PDF with content for all metrics", async () => {
      const caller = reportsRouter.createCaller({
        user: null,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.generateReport({
        template: "detailed",
      });

      // PDF should be a valid byte array
      expect(result.pdfBytes.length).toBeGreaterThan(100); // PDF headers and content
      expect(result.pdfBytes[0]).toBe(37); // PDF starts with '%'
    });

    it("should handle custom metrics with date range", async () => {
      const caller = reportsRouter.createCaller({
        user: null,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.generateReport({
        template: "custom",
        customMetrics: ["totalVisitors", "bounceRate"],
        startDate: "2026-05-01",
        endDate: "2026-05-09",
      });

      expect(result.success).toBe(true);
      expect(result.pdfBytes).toBeDefined();
    });
  });
});
