import { describe, it, expect, vi, beforeEach } from "vitest";
import { quotesRouter } from "./quotes";

// Mock the Resend module
vi.mock("resend", () => {
  const mockSend = vi.fn();
  return {
    Resend: vi.fn(() => ({
      emails: {
        send: mockSend,
      },
    })),
    mockSend,
  };
});

describe("Quotes Router", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("sendQuoteRequest", () => {
    it("should send a quote request email with all fields", async () => {
      const { mockSend } = await import("resend");
      mockSend.mockResolvedValue({ id: "email-123" });

      const caller = quotesRouter.createCaller({} as any);

      const result = await caller.sendQuoteRequest({
        name: "John Doe",
        email: "john@example.com",
        phone: "(903) 555-1234",
        message: "I'm interested in French Patio Doors",
        product: "French Patio Doors",
      });

      expect(result).toEqual({ success: true });
      expect(mockSend).toHaveBeenCalledOnce();

      const callArgs = mockSend.mock.calls[0][0];
      expect(callArgs.from).toBe("MP Doors & More <noreply@mpdoorsnmore.com>");
      expect(callArgs.to).toContain("mpdoorsnmore23@gmail.com");
      expect(callArgs.replyTo).toBe("john@example.com");
      expect(callArgs.subject).toContain("John Doe");
      expect(callArgs.subject).toContain("French Patio Doors");
      expect(callArgs.html).toContain("John Doe");
      expect(callArgs.html).toContain("john@example.com");
      expect(callArgs.html).toContain("(903) 555-1234");
      expect(callArgs.html).toContain("I'm interested in French Patio Doors");
    });

    it("should send a quote request without optional fields", async () => {
      const { mockSend } = await import("resend");
      mockSend.mockResolvedValue({ id: "email-123" });

      const caller = quotesRouter.createCaller({} as any);

      const result = await caller.sendQuoteRequest({
        name: "Jane Smith",
        email: "jane@example.com",
      });

      expect(result).toEqual({ success: true });
      expect(mockSend).toHaveBeenCalledOnce();

      const callArgs = mockSend.mock.calls[0][0];
      expect(callArgs.html).toContain("Jane Smith");
      expect(callArgs.html).toContain("jane@example.com");
    });

    it("should throw an error if email sending fails", async () => {
      const { mockSend } = await import("resend");
      mockSend.mockResolvedValue({
        error: { message: "Invalid email" },
      });

      const caller = quotesRouter.createCaller({} as any);

      await expect(
        caller.sendQuoteRequest({
          name: "Test User",
          email: "test@example.com",
        })
      ).rejects.toThrow("Failed to send quote request");
    });
  });

  describe("sendPricingRequest", () => {
    it("should send a pricing request email", async () => {
      const { mockSend } = await import("resend");
      mockSend.mockResolvedValue({ id: "email-456" });

      const caller = quotesRouter.createCaller({} as any);

      const result = await caller.sendPricingRequest({
        name: "Bob Johnson",
        email: "bob@example.com",
        phone: "(903) 555-5678",
        message: "What are the prices for vinyl flooring?",
        category: "Flooring",
      });

      expect(result).toEqual({ success: true });
      expect(mockSend).toHaveBeenCalledOnce();

      const callArgs = mockSend.mock.calls[0][0];
      expect(callArgs.subject).toContain("Bob Johnson");
      expect(callArgs.subject).toContain("Flooring");
      expect(callArgs.html).toContain("Bob Johnson");
      expect(callArgs.html).toContain("Flooring");
      expect(callArgs.html).toContain("What are the prices for vinyl flooring?");
    });

    it("should handle pricing request without optional fields", async () => {
      const { mockSend } = await import("resend");
      mockSend.mockResolvedValue({ id: "email-456" });

      const caller = quotesRouter.createCaller({} as any);

      const result = await caller.sendPricingRequest({
        name: "Alice Brown",
        email: "alice@example.com",
      });

      expect(result).toEqual({ success: true });
      expect(mockSend).toHaveBeenCalledOnce();
    });

    it("should include category in pricing request email", async () => {
      const { mockSend } = await import("resend");
      mockSend.mockResolvedValue({ id: "email-456" });

      const caller = quotesRouter.createCaller({} as any);

      await caller.sendPricingRequest({
        name: "Charlie Davis",
        email: "charlie@example.com",
        category: "Windows",
      });

      const callArgs = mockSend.mock.calls[0][0];
      expect(callArgs.html).toContain("Windows");
    });
  });
});
