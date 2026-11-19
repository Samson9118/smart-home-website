import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from '@/app/api/lead/route';
import { globalRateLimiter } from '@/lib/security/rateLimiter';

describe('POST /api/lead Route Handler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalRateLimiter.reset();

    // Mock fetch for telegram/max requests
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ ok: true }),
    });
  });

  const createRequest = (body: unknown, headers?: Record<string, string>) => {
    return new NextRequest('http://localhost:3000/api/lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': '192.168.1.1',
        ...headers,
      },
      body: typeof body === 'string' ? body : JSON.stringify(body),
    });
  };

  it('accepts valid lead and returns 200 with success message', async () => {
    const req = createRequest({
      name: 'Константин',
      phone: '+7 (916) 123-45-67',
      messenger: 'telegram',
      contactHandle: '@konstantin_tech',
      comment: 'Нужен расчёт под 3 комнаты',
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.message).toContain('успешно принята');
  });

  it('accepts lead with full calculator inputs and returns 200', async () => {
    const req = createRequest({
      name: 'Мария',
      phone: '+7 (925) 999-88-77',
      messenger: 'max',
      calculatorInputs: {
        propertyType: 'apartment',
        area: 80,
        rooms: 3,
        bathrooms: 2,
        hub: 'home-assistant',
        brandTier: 'optimum',
        modules: {
          lighting: true,
          climate: true,
          leakage: true,
          curtains: true,
          security: true,
        },
      },
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.success).toBe(true);
  });

  it('returns 400 when name is too short or phone is invalid', async () => {
    const req = createRequest({
      name: 'А', // too short (<2 chars)
      phone: '12345', // invalid phone
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const json = await res.json();
    expect(json.error).toBe('Неверные данные формы');
    expect(json.fieldErrors).toBeDefined();
  });

  it('silently accepts honeypot submissions with 200 without sending to admins', async () => {
    const req = createRequest({
      name: 'SpamBot',
      phone: '+7 (999) 000-00-00',
      honeypot: 'bot-spam-field-filled',
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.success).toBe(true);

    // Telegram fetch should NOT have been called for honeypot bot
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('returns 429 when IP exceeds rate limit', async () => {
    const clientIp = '10.0.0.50';

    // Exhaust 5 requests
    for (let i = 0; i < 5; i++) {
      const req = createRequest(
        { name: 'Тест', phone: '+7 (999) 111-22-33' },
        { 'x-forwarded-for': clientIp }
      );
      const res = await POST(req);
      expect(res.status).toBe(200);
    }

    // 6th request from same IP should be blocked
    const blockedReq = createRequest(
      { name: 'Тест', phone: '+7 (999) 111-22-33' },
      { 'x-forwarded-for': clientIp }
    );
    const blockedRes = await POST(blockedReq);

    expect(blockedRes.status).toBe(429);
    const json = await blockedRes.json();
    expect(json.error).toContain('Слишком много запросов');
    expect(blockedRes.headers.get('Retry-After')).toBeDefined();
  });
});
