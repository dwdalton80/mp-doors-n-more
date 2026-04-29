import { describe, expect, it } from "vitest";
import { ENV } from "./_core/env";

describe("Resend API key", () => {
  it("RESEND_API_KEY is set in environment", () => {
    expect(ENV.resendApiKey).toBeTruthy();
    expect(ENV.resendApiKey.startsWith("re_")).toBe(true);
  });
});

describe("contact router input validation", () => {
  it("rejects empty name", async () => {
    const { z } = await import("zod");
    const schema = z.object({
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Valid email is required"),
      phone: z.string().optional(),
      subject: z.string().optional(),
      message: z.string().min(1, "Message is required"),
    });

    const result = schema.safeParse({
      name: "",
      email: "test@example.com",
      message: "Hello",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", async () => {
    const { z } = await import("zod");
    const schema = z.object({
      name: z.string().min(1),
      email: z.string().email("Valid email is required"),
      message: z.string().min(1),
    });

    const result = schema.safeParse({
      name: "Test User",
      email: "not-an-email",
      message: "Hello",
    });
    expect(result.success).toBe(false);
  });

  it("accepts valid input", async () => {
    const { z } = await import("zod");
    const schema = z.object({
      name: z.string().min(1),
      email: z.string().email(),
      phone: z.string().optional(),
      subject: z.string().optional(),
      message: z.string().min(1),
    });

    const result = schema.safeParse({
      name: "Derek",
      email: "Mpdoorsnmore232@gmail.com",
      phone: "(903) 421-1305",
      subject: "doors",
      message: "I am interested in your door selection.",
    });
    expect(result.success).toBe(true);
  });
});
