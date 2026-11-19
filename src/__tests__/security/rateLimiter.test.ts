import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryRateLimiter } from '@/lib/security/rateLimiter';

describe('InMemoryRateLimiter', () => {
  let limiter: InMemoryRateLimiter;

  beforeEach(() => {
    limiter = new InMemoryRateLimiter(3, 1000); // 3 requests per 1000ms
  });

  it('allows requests within limit and tracks remaining requests', () => {
    const res1 = limiter.check('user-1');
    expect(res1.success).toBe(true);
    expect(res1.remaining).toBe(2);

    const res2 = limiter.check('user-1');
    expect(res2.success).toBe(true);
    expect(res2.remaining).toBe(1);

    const res3 = limiter.check('user-1');
    expect(res3.success).toBe(true);
    expect(res3.remaining).toBe(0);
  });

  it('blocks requests exceeding limit', () => {
    limiter.check('user-2');
    limiter.check('user-2');
    limiter.check('user-2');

    const blocked = limiter.check('user-2');
    expect(blocked.success).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.resetTimeMs).toBeGreaterThan(0);
  });

  it('tracks different IP identifiers independently', () => {
    limiter.check('ip-a');
    limiter.check('ip-a');
    limiter.check('ip-a');

    expect(limiter.check('ip-a').success).toBe(false);
    // ip-b is still fresh
    expect(limiter.check('ip-b').success).toBe(true);
  });

  it('allows resetting limit for an identifier', () => {
    limiter.check('ip-c');
    limiter.check('ip-c');
    limiter.check('ip-c');
    expect(limiter.check('ip-c').success).toBe(false);

    limiter.reset('ip-c');
    expect(limiter.check('ip-c').success).toBe(true);
  });
});
