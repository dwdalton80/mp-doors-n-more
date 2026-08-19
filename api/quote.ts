/**
 * POST /api/quote — product-specific quote request (Storm/Patio door pages, etc).
 * Vercel Node.js serverless function using the Web Fetch API signature.
 */
import { z } from "zod";
import { renderEmailHtml, sendNotificationEmail, validateHoneypot } from "./_lib/email";
import { json, parseJsonBody } from "./_lib/http";
import { getClientIp, isRateLimited, recordSubmission } from "./_lib/rateLimit";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  message: z.string().optional(),
  product: z.string().optional(),
  honeypot: z.string().optional(),
});

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  const body = await parseJsonBody(req);
  if (body === null) {
    return json({ error: "Invalid request body" }, 400);
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return json({ error: parsed.error.issues[0]?.message || "Invalid submission" }, 400);
  }
  const { name, email, phone, message, product, honeypot } = parsed.data;

  if (!validateHoneypot(honeypot)) {
    return json({ error: "Invalid submission. Please try again." }, 400);
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return json({ error: "Too many submissions. Please try again in 1 hour." }, 429);
  }

  const subjectLine = `Quote Request from ${name}${product ? ` - ${product}` : ""}`;

  try {
    await sendNotificationEmail({
      subject: subjectLine,
      replyTo: email,
      html: renderEmailHtml({
        heading: "New Quote Request",
        name,
        email,
        rows: [
          { label: "Name", value: name },
          { label: "Email", value: email, href: `mailto:${email}` },
          { label: "Phone", value: phone, href: phone ? `tel:${phone}` : undefined },
          { label: "Product", value: product },
          { label: "Details", value: message },
        ],
      }),
    });
  } catch (err) {
    console.error("[api/quote] failed:", err);
    return json({ error: "Failed to send quote request. Please try again or call us directly." }, 502);
  }

  // Only record the submission once we know it actually sent — a failed
  // attempt (bad API key, provider outage) must not burn the caller's
  // rate-limit window and lock out a legitimate retry.
  recordSubmission(ip);

  return json({ success: true });
}
