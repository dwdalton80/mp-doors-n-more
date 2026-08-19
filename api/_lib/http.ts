/**
 * Shared response/body helpers for the api/*.ts serverless functions.
 */

export function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/** Returns null on any parse failure instead of throwing. */
export async function parseJsonBody(req: Request): Promise<unknown | null> {
  try {
    return await req.json();
  } catch {
    return null;
  }
}
