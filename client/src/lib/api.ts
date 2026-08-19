/**
 * Client helpers for the /api/contact and /api/quote serverless functions.
 * Replaces the old tRPC-based calls that went through the Manus backend.
 */

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
};

export type QuotePayload = {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  product?: string;
};

async function postJSON(path: string, body: unknown): Promise<{ success: true }> {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || "Something went wrong. Please try again or call us directly.");
  }
  return data;
}

export function sendContactMessage(payload: ContactPayload) {
  return postJSON("/api/contact", payload);
}

export function sendQuoteRequest(payload: QuotePayload) {
  return postJSON("/api/quote", payload);
}
