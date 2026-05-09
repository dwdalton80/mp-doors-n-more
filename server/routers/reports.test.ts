import { describe, it, expect } from "vitest";
import { reportsRouter } from "./reports";

describe("Reports Router", () => {
  const mockAdminContext = {
    user: { id: "admin", role: "admin" },
    req: { headers: {} } as any,
    res: {} as any,
  };

  describe("getTemplates", () => {
    it("should return all available templates", async () => {
      const caller = reportsRouter.createCaller(mockAdminContext);

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
      const caller = reportsRouter.createCaller(mockAdminContext);

      const result = await caller.getTemplates();

      expect(result.availableMetrics).toHaveLength(8);
      expect(result.availableMetrics[0].id).toBe("totalVisitors");
    });

    it("should have correct template names", async () => {
      const caller = reportsRouter.createCaller(mockAdminContext);

      const result = await caller.getTemplates();

      const templateNames = result.templates.map((t) => t.name);
      expect(templateNames).toContain("Executive Summary");
      expect(templateNames).toContain("Detailed Performance");
      expect(templateNames).toContain("Conversion Focused");
      expect(templateNames).toContain("Custom Report");
    });
  });

  describe("generateReport", () => {
    it("should generate executive summary report", async () => {
      const caller = reportsRouter.createCaller(mockAdminContext);

      const result = await caller.generateReport({
        template: "executive",
      });

      expect(result.success).toBe(true);
      expect(result.pdfBytes).toBeDefined();
      expect(Array.isArray(result.pdfBytes)).toBe(true);
      expect(result.fileName).toBeDefined();
      expect(result.fileName).toMatch(/analytics-report-\d{4}-\d{2}-\d{2}\.pdf/);
    });

    it("should generate detailed report", async () => {
      const caller = reportsRouter.createCaller(mockAdminContext);

      const result = await caller.generateReport({
        template: "detailed",
      });

      expect(result.success).toBe(true);
      expect(result.pdfBytes).toBeDefined();
      expect(result.fileName).toBeDefined();
    });

    it("should generate conversion focused report", async () => {
      const caller = reportsRouter.createCaller(mockAdminContext);

      const result = await caller.generateReport({
        template: "conversion",
      });

      expect(result.success).toBe(true);
      expect(result.pdfBytes).toBeDefined();
      expect(result.fileName).toBeDefined();
    });

    it("should generate custom report with selected metrics", async () => {
      const caller = reportsRouter.createCaller(mockAdminContext);

      const result = await caller.generateReport({
        template: "custom",
        customMetrics: ["totalVisitors", "pageViews", "conversions"],
      });

      expect(result.success).toBe(true);
      expect(result.pdfBytes).toBeDefined();
      expect(result.fileName).toBeDefined();
    });

    it("should generate report with date range", async () => {
      const caller = reportsRouter.createCaller(mockAdminContext);

      const result = await caller.generateReport({
        template: "detailed",
        startDate: "2026-05-01",
        endDate: "2026-05-09",
      });

      expect(result.success).toBe(true);
      expect(result.pdfBytes).toBeDefined();
    });

    it("should generate PDF with content for all metrics", async () => {
      const caller = reportsRouter.createCaller(mockAdminContext);

      const result = await caller.generateReport({
        template: "detailed",
      });

      expect(result.success).toBe(true);
      // PDF should have reasonable size (at least 1KB)
      expect(result.pdfBytes.length).toBeGreaterThan(1000);
    });

    it("should handle custom metrics with date range", async () => {
      const caller = reportsRouter.createCaller(mockAdminContext);

      const result = await caller.generateReport({
        template: "custom",
        customMetrics: ["totalVisitors", "conversions"],
        startDate: "2026-04-01",
        endDate: "2026-05-09",
      });

      expect(result.success).toBe(true);
      expect(result.pdfBytes).toBeDefined();
      expect(result.fileName).toBeDefined();
    });

    it("should include filename in response", async () => {
      const caller = reportsRouter.createCaller(mockAdminContext);

      const result = await caller.generateReport({
        template: "executive",
      });

      expect(result.fileName).toMatch(/\.pdf$/);
      expect(result.fileName).toContain("analytics-report");
    });

    it("should generate PDF bytes as array", async () => {
      const caller = reportsRouter.createCaller(mockAdminContext);

      const result = await caller.generateReport({
        template: "executive",
      });

      expect(Array.isArray(result.pdfBytes)).toBe(true);
      expect(result.pdfBytes.length).toBeGreaterThan(0);
      // PDF magic number: %PDF
      expect(result.pdfBytes[0]).toBe(37); // %
      expect(result.pdfBytes[1]).toBe(80); // P
      expect(result.pdfBytes[2]).toBe(68); // D
      expect(result.pdfBytes[3]).toBe(70); // F
    });
  });

  describe("Authorization", () => {
    it("should require admin role for generateReport", async () => {
      const mockUserContext = {
        user: { id: "user", role: "user" },
        req: { headers: {} } as any,
        res: {} as any,
      };

      const caller = reportsRouter.createCaller(mockUserContext);

      try {
        await caller.generateReport({ template: "executive" });
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.code).toBe("FORBIDDEN");
      }
    });

    it("should require admin role for getTemplates", async () => {
      const mockUserContext = {
        user: { id: "user", role: "user" },
        req: { headers: {} } as any,
        res: {} as any,
      };

      const caller = reportsRouter.createCaller(mockUserContext);

      try {
        await caller.getTemplates();
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.code).toBe("FORBIDDEN");
      }
    });
  });

  describe("Data Validation", () => {
    it("should handle missing optional parameters", async () => {
      const caller = reportsRouter.createCaller(mockAdminContext);

      const result = await caller.generateReport({
        template: "executive",
      });

      expect(result.success).toBe(true);
    });

    it("should validate template enum", async () => {
      const caller = reportsRouter.createCaller(mockAdminContext);

      try {
        await caller.generateReport({
          template: "invalid" as any,
        });
        expect.fail("Should have thrown validation error");
      } catch (error: any) {
        expect(error.message).toContain("Invalid");
      }
    });

    it("should handle empty custom metrics array", async () => {
      const caller = reportsRouter.createCaller(mockAdminContext);

      const result = await caller.generateReport({
        template: "custom",
        customMetrics: [],
      });

      expect(result.success).toBe(true);
    });
  });
});
