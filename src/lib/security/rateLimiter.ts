interface RateLimitRecord {
  timestamps: number[];
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetTimeMs: number;
}

export class InMemoryRateLimiter {
  private records = new Map<string, RateLimitRecord>();
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor(maxRequests = 5, windowMs = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  public check(identifier: string): RateLimitResult {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    // Retrieve or create records for identifier
    let record = this.records.get(identifier);
    if (!record) {
      record = { timestamps: [] };
      this.records.set(identifier, record);
    }

    // Filter out timestamps outside the sliding window
    record.timestamps = record.timestamps.filter((t) => t > windowStart);

    // If limit exceeded
    if (record.timestamps.length >= this.maxRequests) {
      const oldest = record.timestamps[0] || now;
      const resetTimeMs = Math.max(0, oldest + this.windowMs - now);

      return {
        success: false,
        limit: this.maxRequests,
        remaining: 0,
        resetTimeMs,
      };
    }

    // Record this request
    record.timestamps.push(now);

    return {
      success: true,
      limit: this.maxRequests,
      remaining: this.maxRequests - record.timestamps.length,
      resetTimeMs: this.windowMs,
    };
  }

  public reset(identifier?: string): void {
    if (identifier) {
      this.records.delete(identifier);
    } else {
      this.records.clear();
    }
  }
}

// Global default instance configured via env vars
const maxReq = Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 5;
const winMs = Number(process.env.RATE_LIMIT_WINDOW_MS) || 60000;

export const globalRateLimiter = new InMemoryRateLimiter(maxReq, winMs);
