/**
 * POST /api/contact — general contact form submission.
 * Vercel Node.js serverless function using the Web Fetch API signature.
 */
import { z } from "zod";
import { renderEmailHtml, sendNotificationEmail, validateHoneypot } from "./_lib/email";
import { checkRateLimit, getClientIp } from "./_lib/rateLimit";

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

  let body: unknown;
  try {
    body = await req.json();
  } catch {
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

  if (!checkRateLimit(getClientIp(req))) {
    return json({ error: "Too many submissions. Please try again in 1 hour." }, 429);
  }

  const subjectLine = subject
    ? `New Inquiry: ${subject.charAt(0).toUpperCase() + subject.slice(1)} — ${name}`
    : `New Contact Form Inquiry from ${name}`;

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
          { label: "Topic", value: subject ? subject.charAt(0).toUpperCase() + subject.slice(1) : undefined },
          { label: "Message", value: message },
        ],
      }),
    });
  } catch (err) {
    console.error("[api/contact] failed:", err);
    return json({ error: "Failed to send message. Please try again or call us directly." }, 502);
  }

  return json({ success: true });
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
