import { describe, it, expect } from 'vitest';
import { GET } from '@/app/api/health/route';

describe('GET /api/health Endpoint', () => {
  it('returns 200 OK with service status and uptime', async () => {
    const res = await GET();
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.status).toBe('ok');
    expect(json.service).toBe('smart-home-website');
    expect(json.uptime).toBeGreaterThanOrEqual(0);
    expect(json.timestamp).toBeDefined();
  });
});
