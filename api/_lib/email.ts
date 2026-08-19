/**
 * Shared email-sending helper for the contact/quote serverless functions.
 * Uses Resend — set RESEND_API_KEY in your deployment environment.
 */
import { Resend } from "resend";

const TO_EMAIL = process.env.TO_EMAIL || "mpdoorsnmore23@gmail.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "MP Doors & More <noreply@mpdoorsnmore.com>";

let resendClient: Resend | null = null;
function getResend(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not configured");
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

type Row = { label: string; value?: string | null; href?: string };

export function renderEmailHtml(opts: { heading: string; rows: Row[]; name: string; email: string }): string {
  const { heading, rows, name, email } = opts;
  const rowsHtml = rows
    .filter((r) => r.value)
    .map(
      (r) => `
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #1a2e45; width: 120px; vertical-align: top;">${r.label}</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #333; white-space: pre-wrap;">${
          r.href
            ? `<a href="${escapeHtml(r.href)}" style="color: #a61c00;">${escapeHtml(r.value!)}</a>`
            : escapeHtml(r.value!)
        }</td>
      </tr>`
    )
    .join("");

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 24px; border-radius: 8px;">
      <div style="background: #1a2e45; padding: 20px 24px; border-radius: 6px 6px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 20px;">${heading}</h1>
        <p style="color: rgba(255,255,255,0.7); margin: 4px 0 0; font-size: 14px;">MP Doors & More Website</p>
      </div>
      <div style="background: white; padding: 24px; border-radius: 0 0 6px 6px; border: 1px solid #e0e0e0; border-top: none;">
        <table style="width: 100%; border-collapse: collapse;">${rowsHtml}</table>
        <div style="margin-top: 24px; padding: 16px; background: #f5f5f5; border-radius: 4px; font-size: 13px; color: #666;">
          <strong>Reply directly</strong> to this email to respond to ${escapeHtml(name)} at
          <a href="mailto:${escapeHtml(email)}" style="color: #a61c00;">${escapeHtml(email)}</a>.
        </div>
      </div>
    </div>
  `;
}

export async function sendNotificationEmail(opts: { subject: string; html: string; replyTo: string }) {
  const resend = getResend();
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [TO_EMAIL],
    replyTo: opts.replyTo,
    subject: opts.subject,
    html: opts.html,
  });
  if (error) {
    console.error("[email] Resend error:", error);
    throw new Error("Failed to send email. Please try again or call us directly.");
  }
}

export function validateHoneypot(value: unknown): boolean {
  return typeof value !== "string" || value.trim().length === 0;
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
