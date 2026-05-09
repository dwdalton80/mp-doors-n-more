import { publicProcedure, router } from "../_core/trpc";
import { z } from "zod";

const dashboardPassword = process.env.DASHBOARD_PASSWORD || "";

export const dashboardRouter = router({
  // Verify dashboard password
  verifyPassword: publicProcedure
    .input(z.object({ password: z.string() }))
    .mutation(async ({ input }) => {
      const isValid = input.password === dashboardPassword;
      return { isValid };
    }),

  // Get analytics data (requires valid session)
  getAnalytics: publicProcedure.query(async () => {
    // This will be called after password verification on the client
    // Return mock analytics data for now
    return {
      totalVisitors: 1247,
      pageViews: 3891,
      bounceRate: 32.5,
      avgSessionDuration: "3m 24s",
      topPages: [
        { path: "/", views: 892, visitors: 456 },
        { path: "/products", views: 645, visitors: 328 },
        { path: "/contact", views: 234, visitors: 156 },
        { path: "/patio-doors-special-order", views: 189, visitors: 98 },
        { path: "/interior-doors-in-stock", views: 156, visitors: 87 },
      ],
      trafficSources: [
        { source: "Direct", visitors: 456, percentage: 36.6 },
        { source: "Organic Search", visitors: 512, percentage: 41.1 },
        { source: "Referral", visitors: 198, percentage: 15.9 },
        { source: "Social Media", visitors: 81, percentage: 6.5 },
      ],
      conversions: {
        quoteRequests: 23,
        contactFormSubmissions: 18,
        phoneCallsTracked: 12,
      },
      deviceBreakdown: [
        { device: "Mobile", percentage: 58, visitors: 722 },
        { device: "Desktop", percentage: 35, visitors: 436 },
        { device: "Tablet", percentage: 7, visitors: 87 },
      ],
      dailyVisitors: [
        { date: "Mon", visitors: 156 },
        { date: "Tue", visitors: 189 },
        { date: "Wed", visitors: 203 },
        { date: "Thu", visitors: 178 },
        { date: "Fri", visitors: 245 },
        { date: "Sat", visitors: 198 },
        { date: "Sun", visitors: 178 },
      ],
    };
  }),
});
