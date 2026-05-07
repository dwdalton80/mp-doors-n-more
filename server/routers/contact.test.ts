import { describe, it, expect, beforeAll } from "vitest";
import { Resend } from "resend";
import { ENV } from "../_core/env";

describe("Contact Router - Resend API", () => {
  let resend: Resend;

  beforeAll(() => {
    resend = new Resend(ENV.resendApiKey);
  });

  it("should have RESEND_API_KEY configured", () => {
    expect(ENV.resendApiKey).toBeTruthy();
    expect(ENV.resendApiKey).not.toBe("");
  });

  it("should be able to send an email via Resend with verified domain", async () => {
    const result = await resend.emails.send({
      from: "MP Doors & More <noreply@mpdoorsnmore.com>",
      to: ["mpdoorsnmore23@gmail.com"],
      subject: "Test Email - Contact Form Verification",
      html: "<p>This is a test email to verify the contact form is working.</p>",
    });

    expect(result.error).toBeNull();
    expect(result.data).toBeDefined();
    expect(result.data?.id).toBeTruthy();
  });
});
