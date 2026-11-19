import { describe, it, expect } from 'vitest';
import sitemap from '@/app/sitemap';
import { siteConfig } from '@/config/site';

describe('Sitemap Generator', () => {
  it('generates complete sitemap for all main site pages and articles', () => {
    const map = sitemap();
    expect(Array.isArray(map)).toBe(true);
    expect(map.length).toBeGreaterThanOrEqual(15);

    const urls = map.map((entry) => entry.url);
    const baseUrl = siteConfig.url.replace(/\/$/, '');

    // Core pages
    expect(urls).toContain(`${baseUrl}`);
    expect(urls).toContain(`${baseUrl}/services`);
    expect(urls).toContain(`${baseUrl}/calculator`);
    expect(urls).toContain(`${baseUrl}/portfolio`);
    expect(urls).toContain(`${baseUrl}/contacts`);

    // Specialized services
    expect(urls).toContain(`${baseUrl}/services/lighting`);
    expect(urls).toContain(`${baseUrl}/services/climate`);
    expect(urls).toContain(`${baseUrl}/services/security`);
    expect(urls).toContain(`${baseUrl}/services/surveillance`);

    // Knowledge & Articles
    expect(urls).toContain(`${baseUrl}/knowledge`);
    expect(urls).toContain(`${baseUrl}/articles`);
    expect(urls).toContain(`${baseUrl}/articles/zigbee-mesh-deep-dive`);
    expect(urls).toContain(`${baseUrl}/articles/matter-and-thread-explained`);
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
