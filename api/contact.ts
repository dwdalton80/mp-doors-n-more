/**
 * POST /api/contact — general contact form submission.
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
  subject: z.string().optional(),
  message: z.string().min(1, "Message is required"),
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
  const { name, email, phone, subject, message, honeypot } = parsed.data;

  if (!validateHoneypot(honeypot)) {
    return json({ error: "Invalid submission. Please try again." }, 400);
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return json({ error: "Too many submissions. Please try again in 1 hour." }, 429);
  }

  const topic = subject ? subject.charAt(0).toUpperCase() + subject.slice(1) : undefined;
  const subjectLine = topic ? `New Inquiry: ${topic} — ${name}` : `New Contact Form Inquiry from ${name}`;

  try {
    await sendNotificationEmail({
      subject: subjectLine,
      replyTo: email,
      html: renderEmailHtml({
        heading: "New Contact Form Submission",
        name,
        email,
        rows: [
          { label: "Name", value: name },
          { label: "Email", value: email, href: `mailto:${email}` },
          { label: "Phone", value: phone, href: phone ? `tel:${phone}` : undefined },
          { label: "Topic", value: topic },
          { label: "Message", value: message },
        ],
      }),
    });
  } catch (err) {
    console.error("[api/contact] failed:", err);
    return json({ error: "Failed to send message. Please try again or call us directly." }, 502);
  }

  // Only record the submission once we know it actually sent — a failed
  // attempt (bad API key, provider outage) must not burn the caller's
  // rate-limit window and lock out a legitimate retry.
  recordSubmission(ip);

  return json({ success: true });
}
