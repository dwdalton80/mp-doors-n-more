import { publicProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { logAnalyticsEvent } from "../db";

export const analyticsRouter = router({
  // Track analytics events from client
  track: publicProcedure
    .input(
      z.object({
        eventType: z.enum(["page_view", "quote_request", "contact_form", "phone_call"] as const),
        eventName: z.string(),
        productName: z.string().optional(),
        pageUrl: z.string().optional(),
        referrer: z.string().optional(),
        userAgent: z.string().optional(),
        metadata: z.record(z.string(), z.any()).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        // Extract IP address from request
        const ipAddress =
          (ctx.req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
          (ctx.req.headers["x-real-ip"] as string) ||
          ctx.req.socket?.remoteAddress ||
          undefined;

        // Log the event to database
        await logAnalyticsEvent({
          eventType: input.eventType,
          eventName: input.eventName,
          productName: input.productName,
          pageUrl: input.pageUrl,
          referrer: input.referrer,
          userAgent: input.userAgent,
          ipAddress,
          metadata: input.metadata ? JSON.stringify(input.metadata) : undefined,
        });

        return { success: true };
      } catch (error) {
        console.error("[Analytics] Failed to track event:", error);
        // Don't throw - analytics failures shouldn't break the app
        return { success: false };
      }
    }),
});
