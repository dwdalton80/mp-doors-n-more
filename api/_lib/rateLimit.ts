/**
 * Best-effort in-memory rate limiting: 1 submission per hour per IP.
 * Note: serverless instances are ephemeral, so this only guards repeat
 * submissions hitting the same warm instance — it's a speed bump, not a
 * hard limit. Pair with your host's platform-level abuse protection.
 *
 * isRateLimited() is a read-only check; recordSubmission() is the mutation.
 * Callers must only call recordSubmission() AFTER the submission actually
 * succeeds (e.g. the email sent) — otherwise a transient failure (bad API
 * key, provider outage) burns the caller's window and locks out a retry
 * even though nothing was ever sent.
 */
const submissionTracker = new Map<string, number>();
const ONE_HOUR_MS = 60 * 60 * 1000;

export function isRateLimited(ip: string | null): boolean {
  if (!ip) return false;
  const last = submissionTracker.get(ip);
  return last !== undefined && Date.now() - last < ONE_HOUR_MS;
}

export function recordSubmission(ip: string | null): void {
  if (!ip) return;
  const now = Date.now();
  submissionTracker.set(ip, now);

  if (submissionTracker.size > 5000) {
    submissionTracker.forEach((ts, key) => {
      if (now - ts > ONE_HOUR_MS) submissionTracker.delete(key);
    });
  }
}

export function getClientIp(req: Request): string | null {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip");
}
