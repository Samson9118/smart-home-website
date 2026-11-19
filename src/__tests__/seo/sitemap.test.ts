import { describe, it, expect } from 'vitest';
import sitemap from '@/app/sitemap';
import { siteConfig } from '@/config/site';

describe('Sitemap Generator', () => {
  it('generates complete sitemap for all main site pages', () => {
    const map = sitemap();
    expect(Array.isArray(map)).toBe(true);
    expect(map.length).toBe(5);

    const urls = map.map((entry) => entry.url);
    const baseUrl = siteConfig.url.replace(/\/$/, '');

    expect(urls).toContain(`${baseUrl}`);
    expect(urls).toContain(`${baseUrl}/services`);
    expect(urls).toContain(`${baseUrl}/calculator`);
    expect(urls).toContain(`${baseUrl}/portfolio`);
    expect(urls).toContain(`${baseUrl}/contacts`);
  });

  it('assigns valid priorities and change frequencies', () => {
    const map = sitemap();

    map.forEach((entry) => {
      expect(entry.priority).toBeGreaterThanOrEqual(0);
      expect(entry.priority).toBeLessThanOrEqual(1.0);
      expect(entry.changeFrequency).toBeDefined();
      expect(entry.lastModified).toBeInstanceOf(Date);
    });

    const home = map.find((e) => e.url === siteConfig.url.replace(/\/$/, ''));
    expect(home?.priority).toBe(1.0);
  });
});
