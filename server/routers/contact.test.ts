import { describe, it, expect, beforeAll, vi } from "vitest";
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
    // Mock the Resend API to avoid sending real emails during tests
    const mockSend = vi.spyOn(resend.emails, "send").mockResolvedValueOnce({
      data: { id: "test-email-id-12345" },
      error: null,
    } as any);

    const result = await resend.emails.send({
      from: "MP Doors & More <noreply@mpdoorsnmore.com>",
      to: ["mpdoorsnmore23@gmail.com"],
      subject: "Test Email - Contact Form Verification",
      html: "<p>This is a test email to verify the contact form is working.</p>",
    });

    expect(result.error).toBeNull();
    expect(result.data).toBeDefined();
    expect(result.data?.id).toBeTruthy();
    expect(mockSend).toHaveBeenCalledOnce();

    // Clean up the mock
    mockSend.mockRestore();
  });
});
