import { Resend } from "resend";
import { z } from "zod";
import { ENV } from "../_core/env";
import { publicProcedure, router } from "../_core/trpc";
import { logQuoteRequest } from "../db";

const resend = new Resend(ENV.resendApiKey);

export const quotesRouter = router({
  sendPricingRequest: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Valid email is required"),
        phone: z.string().optional(),
        message: z.string().optional(),
        category: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { name, email, phone, message, category } = input;

      const subjectLine = `Pricing Request from ${name}${category ? ` - ${category}` : ""}`;

      const htmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 24px; border-radius: 8px;">
          <div style="background: #1e3450; padding: 20px 24px; border-radius: 6px 6px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 20px;">New Pricing Request</h1>
            <p style="color: rgba(255,255,255,0.7); margin: 4px 0 0; font-size: 14px;">MP Doors & More Website</p>
          </div>
          <div style="background: white; padding: 24px; border-radius: 0 0 6px 6px; border: 1px solid #e0e0e0; border-top: none;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #1e3450; width: 120px;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #333;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #1e3450;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #333;"><a href="mailto:${email}" style="color: #a61c00;">${email}</a></td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #1e3450;">Phone</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #333;"><a href="tel:${phone}" style="color: #a61c00;">${phone}</a></td>
              </tr>` : ""}
              ${category ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #1e3450;">Category</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #333;">${category}</td>
              </tr>` : ""}
              ${message ? `
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #1e3450; vertical-align: top;">Additional Info</td>
                <td style="padding: 10px 0; color: #333; white-space: pre-wrap;">${message}</td>
              </tr>` : ""}
            </table>
            <div style="margin-top: 24px; padding: 16px; background: #f5f5f5; border-radius: 4px; font-size: 13px; color: #666;">
              <strong>Reply directly</strong> to this email to respond to ${name} at <a href="mailto:${email}" style="color: #a61c00;">${email}</a>.
            </div>
          </div>
        </div>
      `;

      const { error } = await resend.emails.send({
        from: "MP Doors & More <noreply@mpdoorsnmore.com>",
        to: ["mpdoorsnmore23@gmail.com"],
        replyTo: email,
        subject: subjectLine,
        html: htmlBody,
      });

      if (error) {
        console.error("[Quotes] Resend error:", error);
        throw new Error("Failed to send pricing request. Please try again or call us directly.");
      }

      // Log analytics event for pricing request
      await logQuoteRequest({
        userEmail: email,
        userPhone: phone,
        productName: category,
      });

      return { success: true };
    }),

  sendQuoteRequest: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Valid email is required"),
        phone: z.string().optional(),
        message: z.string().optional(),
        product: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { name, email, phone, message, product } = input;

      const subjectLine = `Quote Request from ${name}${product ? ` - ${product}` : ""}`;

      const htmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 24px; border-radius: 8px;">
          <div style="background: #1e3450; padding: 20px 24px; border-radius: 6px 6px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 20px;">New Quote Request</h1>
            <p style="color: rgba(255,255,255,0.7); margin: 4px 0 0; font-size: 14px;">MP Doors & More Website</p>
          </div>
          <div style="background: white; padding: 24px; border-radius: 0 0 6px 6px; border: 1px solid #e0e0e0; border-top: none;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #1e3450; width: 120px;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #333;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #1e3450;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #333;"><a href="mailto:${email}" style="color: #a61c00;">${email}</a></td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #1e3450;">Phone</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #333;"><a href="tel:${phone}" style="color: #a61c00;">${phone}</a></td>
              </tr>` : ""}
              ${product ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #1e3450;">Product</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #333;">${product}</td>
              </tr>` : ""}
              ${message ? `
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #1e3450; vertical-align: top;">Details</td>
                <td style="padding: 10px 0; color: #333; white-space: pre-wrap;">${message}</td>
              </tr>` : ""}
            </table>
            <div style="margin-top: 24px; padding: 16px; background: #f5f5f5; border-radius: 4px; font-size: 13px; color: #666;">
              <strong>Reply directly</strong> to this email to respond to ${name} at <a href="mailto:${email}" style="color: #a61c00;">${email}</a>.
            </div>
          </div>
        </div>
      `;

      const { error } = await resend.emails.send({
        from: "MP Doors & More <noreply@mpdoorsnmore.com>",
        to: ["mpdoorsnmore23@gmail.com"],
        replyTo: email,
        subject: subjectLine,
        html: htmlBody,
      });

      if (error) {
        console.error("[Quotes] Resend error:", error);
        throw new Error("Failed to send quote request. Please try again or call us directly.");
      }

      // Log analytics event for quote request
      await logQuoteRequest({
        userEmail: email,
        userPhone: phone,
        productName: product,
      });

      return { success: true };
    }),
});
