import { describe, it, expect } from 'vitest';
import {
  escapeTelegramMarkdown,
  escapeHtml,
  sanitizeString,
} from '@/lib/security/sanitize';

describe('Sanitization & Escaping Security Functions', () => {
  describe('escapeTelegramMarkdown', () => {
    it('escapes MarkdownV2 special characters', () => {
      const dangerous = 'Hello_world *bold* [link](url) ~strike~ `code` >quote #tag +1 -2 =3 |pipe| {brace} .dot !excl';
      const escaped = escapeTelegramMarkdown(dangerous);

      expect(escaped).toContain('\\_');
      expect(escaped).toContain('\\*');
      expect(escaped).toContain('\\[link\\]');
      expect(escaped).toContain('\\(url\\)');
      expect(escaped).toContain('\\~');
      expect(escaped).toContain('\\`');
      expect(escaped).toContain('\\>');
      expect(escaped).toContain('\\#');
      expect(escaped).toContain('\\+');
      expect(escaped).toContain('\\-');
      expect(escaped).toContain('\\=');
      expect(escaped).toContain('\\|');
      expect(escaped).toContain('\\{');
      expect(escaped).toContain('\\}');
      expect(escaped).toContain('\\.');
      expect(escaped).toContain('\\!');
    });

    it('returns empty string for null or undefined', () => {
      expect(escapeTelegramMarkdown(null)).toBe('');
      expect(escapeTelegramMarkdown(undefined)).toBe('');
      expect(escapeTelegramMarkdown('')).toBe('');
    });
  });

  describe('escapeHtml', () => {
    it('escapes HTML angle brackets and quotes', () => {
      const malicious = '<script>alert("XSS")</script> & \'test\'';
      const safe = escapeHtml(malicious);

      expect(safe).toBe('&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt; &amp; &#039;test&#039;');
      expect(safe).not.toContain('<script>');
    });

    it('returns empty string for falsy input', () => {
      expect(escapeHtml(null)).toBe('');
      expect(escapeHtml(undefined)).toBe('');
    });
  });

  describe('sanitizeString', () => {
    it('strips control characters and trims', () => {
      const dirty = '\x00\x07  Привет мир!  \x1F';
      const clean = sanitizeString(dirty);
      expect(clean).toBe('Привет мир!');
    });

    it('truncates to specified max length', () => {
      const longText = 'A'.repeat(600);
      const truncated = sanitizeString(longText, 50);
      expect(truncated.length).toBe(50);
    });

    it('returns empty string for non-string types', () => {
      expect(sanitizeString(12345)).toBe('');
      expect(sanitizeString(null)).toBe('');
      expect(sanitizeString(undefined)).toBe('');
    });
  });
});
