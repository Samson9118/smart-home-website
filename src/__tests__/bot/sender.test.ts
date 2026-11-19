import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  sendTelegramNotification,
  sendMaxNotification,
  notifyAdmins,
} from '@/lib/bot/sender';

describe('Bot Notification Sender', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('skips sending if bot token or chat ID is missing', async () => {
    const successTg = await sendTelegramNotification('test', '', '');
    expect(successTg).toBe(false);

    const successMax = await sendMaxNotification('test', '', '');
    expect(successMax).toBe(false);
  });

  it('sends telegram message when tokens are provided', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ ok: true }),
    });
    global.fetch = mockFetch;

    const success = await sendTelegramNotification(
      'Test message',
      'test-token',
      '12345678'
    );

    expect(success).toBe(true);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.telegram.org/bottest-token/sendMessage',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
    );
  });

  it('handles Telegram API error response gracefully', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      text: () => Promise.resolve('Bad Request'),
    });
    global.fetch = mockFetch;

    const success = await sendTelegramNotification(
      'Test message',
      'test-token',
      '12345678'
    );
    expect(success).toBe(false);
  });

  it('dispatches to both Telegram and MAX in notifyAdmins', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ ok: true }),
    });
    global.fetch = mockFetch;

    process.env.TELEGRAM_BOT_TOKEN = 'mock-tg-token';
    process.env.TELEGRAM_CHAT_ID = 'mock-chat-id';

    const result = await notifyAdmins({
      telegramMarkdown: 'Markdown msg',
      plainText: 'Plain msg',
      html: '<p>HTML msg</p>',
    });

    expect(result.telegram).toBe(true);

    delete process.env.TELEGRAM_BOT_TOKEN;
    delete process.env.TELEGRAM_CHAT_ID;
  });
});
