import { publicProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

const reportTemplates = {
  executive: {
    name: "Executive Summary",
    metrics: ["totalVisitors", "pageViews", "bounceRate", "conversions"],
  },
  detailed: {
    name: "Detailed Performance",
    metrics: [
      "totalVisitors",
      "pageViews",
      "bounceRate",
      "avgSessionDuration",
      "topPages",
      "trafficSources",
      "deviceBreakdown",
      "conversions",
    ],
  },
  conversion: {
    name: "Conversion Focused",
    metrics: ["totalVisitors", "conversions", "topPages", "trafficSources"],
  },
};

export const reportsRouter = router({
  generateReport: publicProcedure
    .input(
      z.object({
        template: z.enum(["executive", "detailed", "conversion", "custom"]),
        customMetrics: z.array(z.string()).optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Get template metrics
        let metricsToInclude: string[] = [];

        if (input.template === "custom" && input.customMetrics) {
          metricsToInclude = input.customMetrics;
        } else if (input.template in reportTemplates) {
          metricsToInclude =
            reportTemplates[input.template as keyof typeof reportTemplates]
              .metrics;
        }

        // Mock analytics data - replace with real data from your analytics provider
        const analyticsData = {
          totalVisitors: 2543,
          pageViews: 8921,
          bounceRate: 32,
          avgSessionDuration: "3m 24s",
          topPages: [
            { path: "/", views: 1250, visitors: 892 },
            { path: "/products", views: 1100, visitors: 756 },
            { path: "/patio-doors-special-order", views: 892, visitors: 634 },
            { path: "/contact", views: 456, visitors: 234 },
          ],
          trafficSources: [
            { source: "Direct", visitors: 892, percentage: 35 },
            { source: "Organic", visitors: 756, percentage: 30 },
            { source: "Referral", visitors: 634, percentage: 25 },
            { source: "Social", visitors: 261, percentage: 10 },
          ],
          deviceBreakdown: [
            { device: "Desktop", percentage: 60, visitors: 1526 },
            { device: "Mobile", percentage: 35, visitors: 890 },
            { device: "Tablet", percentage: 5, visitors: 127 },
          ],
          conversions: {
            quoteRequests: 45,
            contactFormSubmissions: 28,
            phoneCallsTracked: 12,
          },
        };

        // Create PDF
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([612, 792]); // Letter size
        const { width, height } = page.getSize();
        const fontSize = 12;
        const titleFontSize = 20;
        const headingFontSize = 14;

        const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);
        const timesRomanBold = await pdfDoc.embedFont(
          StandardFonts.TimesRomanBold
        );

        let yPosition = height - 50;

        // Title
        page.drawText("MP Doors & More - Analytics Report", {
          x: 50,
          y: yPosition,
          size: titleFontSize,
          font: timesRomanBold,
          color: rgb(0.65, 0.11, 0),
        });

        yPosition -= 30;

        // Template and date info
        const templateName =
          input.template === "custom"
            ? "Custom Report"
            : reportTemplates[input.template as keyof typeof reportTemplates]
                .name;

        page.drawText(
          `Template: ${templateName} | Generated: ${new Date().toLocaleDateString()}`,
          {
            x: 50,
            y: yPosition,
            size: fontSize - 2,
            font: timesRoman,
            color: rgb(0.5, 0.5, 0.5),
          }
        );

        yPosition -= 25;

        // Content sections
        if (metricsToInclude.includes("totalVisitors")) {
          page.drawText("Key Metrics", {
            x: 50,
            y: yPosition,
            size: headingFontSize,
            font: timesRomanBold,
            color: rgb(0.12, 0.2, 0.31),
          });
          yPosition -= 20;

          page.drawText(
            `Total Visitors: ${analyticsData.totalVisitors.toLocaleString()}`,
            { x: 50, y: yPosition, size: fontSize, font: timesRoman }
          );
          yPosition -= 15;

          page.drawText(
            `Page Views: ${analyticsData.pageViews.toLocaleString()}`,
            { x: 50, y: yPosition, size: fontSize, font: timesRoman }
          );
          yPosition -= 15;

          page.drawText(`Bounce Rate: ${analyticsData.bounceRate}%`, {
            x: 50,
            y: yPosition,
            size: fontSize,
            font: timesRoman,
          });
          yPosition -= 15;

          page.drawText(
            `Avg Session Duration: ${analyticsData.avgSessionDuration}`,
            { x: 50, y: yPosition, size: fontSize, font: timesRoman }
          );
          yPosition -= 25;
        }

        if (metricsToInclude.includes("topPages")) {
          page.drawText("Top Pages", {
            x: 50,
            y: yPosition,
            size: headingFontSize,
            font: timesRomanBold,
            color: rgb(0.12, 0.2, 0.31),
          });
          yPosition -= 15;

          analyticsData.topPages.forEach((page_data) => {
            page.drawText(
              `${page_data.path} - ${page_data.views} views (${page_data.visitors} visitors)`,
              { x: 50, y: yPosition, size: fontSize - 1, font: timesRoman }
            );
            yPosition -= 12;
          });
          yPosition -= 10;
        }

        if (metricsToInclude.includes("trafficSources")) {
          page.drawText("Traffic Sources", {
            x: 50,
            y: yPosition,
            size: headingFontSize,
            font: timesRomanBold,
            color: rgb(0.12, 0.2, 0.31),
          });
          yPosition -= 15;

          analyticsData.trafficSources.forEach((source) => {
            page.drawText(
              `${source.source} - ${source.visitors} visitors (${source.percentage}%)`,
              { x: 50, y: yPosition, size: fontSize - 1, font: timesRoman }
            );
            yPosition -= 12;
          });
          yPosition -= 10;
        }

        if (metricsToInclude.includes("conversions")) {
          page.drawText("Conversions", {
            x: 50,
            y: yPosition,
            size: headingFontSize,
            font: timesRomanBold,
            color: rgb(0.12, 0.2, 0.31),
          });
          yPosition -= 15;

          page.drawText(
            `Quote Requests: ${analyticsData.conversions.quoteRequests}`,
            { x: 50, y: yPosition, size: fontSize - 1, font: timesRoman }
          );
          yPosition -= 12;

          page.drawText(
            `Contact Form Submissions: ${analyticsData.conversions.contactFormSubmissions}`,
            { x: 50, y: yPosition, size: fontSize - 1, font: timesRoman }
          );
          yPosition -= 12;

          page.drawText(
            `Phone Calls Tracked: ${analyticsData.conversions.phoneCallsTracked}`,
            { x: 50, y: yPosition, size: fontSize - 1, font: timesRoman }
          );
        }

        // Convert to bytes
        const pdfBytes = await pdfDoc.save();

        return {
          success: true,
          pdfBytes: Array.from(pdfBytes),
          fileName: `analytics-report-${new Date().toISOString().split("T")[0]}.pdf`,
        };
      } catch (error) {
        console.error("Report generation error:", error);
        throw new Error("Failed to generate report");
      }
    }),

  getTemplates: publicProcedure.query(() => {
    return {
      templates: [
        {
          id: "executive",
          name: "Executive Summary",
          description: "High-level overview of key metrics",
        },
        {
          id: "detailed",
          name: "Detailed Performance",
          description: "Comprehensive report with all metrics",
        },
        {
          id: "conversion",
          name: "Conversion Focused",
          description: "Focus on leads and conversions",
        },
        {
          id: "custom",
          name: "Custom Report",
          description: "Select specific metrics to include",
        },
      ],
      availableMetrics: [
        { id: "totalVisitors", label: "Total Visitors" },
        { id: "pageViews", label: "Page Views" },
        { id: "bounceRate", label: "Bounce Rate" },
        { id: "avgSessionDuration", label: "Avg Session Duration" },
        { id: "topPages", label: "Top Pages" },
        { id: "trafficSources", label: "Traffic Sources" },
        { id: "deviceBreakdown", label: "Device Breakdown" },
        { id: "conversions", label: "Conversions" },
      ],
    };
  }),
});
