/**
 * Best-effort in-memory rate limiting: 1 submission per hour per IP.
 * Note: serverless instances are ephemeral, so this only guards repeat
 * submissions hitting the same warm instance — it's a speed bump, not a
 * hard limit. Pair with your host's platform-level abuse protection.
 */
const submissionTracker = new Map<string, number>();
const ONE_HOUR_MS = 60 * 60 * 1000;

export function checkRateLimit(ip: string | null): boolean {
  if (!ip) return true;

  const now = Date.now();
  const last = submissionTracker.get(ip);
  if (last && now - last < ONE_HOUR_MS) {
    return false;
  }
  submissionTracker.set(ip, now);

  if (submissionTracker.size > 5000) {
    submissionTracker.forEach((ts, key) => {
      if (now - ts > ONE_HOUR_MS) submissionTracker.delete(key);
    });
  }
  return true;
}

export function getClientIp(req: Request): string | null {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip");
}
