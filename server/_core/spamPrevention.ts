/**
 * Spam prevention utilities for form submissions
 * Implements rate limiting and honeypot field validation
 */

// In-memory store for rate limiting (IP -> timestamps of submissions)
// In production, consider using Redis for distributed rate limiting
const submissionTracker = new Map<string, number[]>();

/**
 * Check if an IP has exceeded the rate limit
 * Limit: 1 submission per hour per IP
 */
export function checkRateLimit(ipAddress: string | undefined): boolean {
  if (!ipAddress) return true; // Allow if no IP (shouldn't happen)

  const now = Date.now();
  const oneHourAgo = now - 60 * 60 * 1000;

  // Get existing submissions for this IP
  const submissions = submissionTracker.get(ipAddress) || [];

  // Filter out submissions older than 1 hour
  const recentSubmissions = submissions.filter(time => time > oneHourAgo);

  // If there's already a submission in the last hour, reject
  if (recentSubmissions.length > 0) {
    return false;
  }

  // Record this submission
  recentSubmissions.push(now);
  submissionTracker.set(ipAddress, recentSubmissions);

  // Clean up old entries to prevent memory leaks
  if (submissionTracker.size > 10000) {
    cleanupOldEntries();
  }

  return true;
}

/**
 * Validate honeypot field
 * If the honeypot field is filled, it's likely a bot
 */
export function validateHoneypot(honeypotValue: string | undefined): boolean {
  // Honeypot should be empty
  if (honeypotValue && honeypotValue.trim().length > 0) {
    return false; // Honeypot was filled - likely a bot
  }
  return true; // Honeypot is empty - likely a real user
}

/**
 * Clean up old rate limit entries to prevent memory leaks
 */
function cleanupOldEntries(): void {
  const now = Date.now();
  const oneHourAgo = now - 60 * 60 * 1000;

  submissionTracker.forEach((submissions, ip) => {
    const recentSubmissions = submissions.filter((time: number) => time > oneHourAgo);
    if (recentSubmissions.length === 0) {
      submissionTracker.delete(ip);
    } else {
      submissionTracker.set(ip, recentSubmissions);
    }
  });
}

/**
 * Get remaining time (in seconds) before an IP can submit again
 */
export function getRateLimitRemainingTime(ipAddress: string | undefined): number {
  if (!ipAddress) return 0;

  const now = Date.now();
  const oneHourAgo = now - 60 * 60 * 1000;

  const submissions = submissionTracker.get(ipAddress) || [];
  const recentSubmissions = submissions.filter(time => time > oneHourAgo);

  if (recentSubmissions.length === 0) {
    return 0; // Can submit now
  }

  // Return time until the oldest submission expires
  const oldestSubmission = Math.min(...recentSubmissions);
  const expiryTime = oldestSubmission + 60 * 60 * 1000;
  const remainingMs = expiryTime - now;

  return Math.ceil(remainingMs / 1000);
}
