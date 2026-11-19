import { describe, it, expect } from 'vitest';
import { articles } from '@/data/articles';

describe('Articles Data and Content', () => {
  it('contains expert articles on smart home protocols', () => {
    expect(articles.length).toBeGreaterThanOrEqual(4);
  });

  it('verifies required fields and structure of each article', () => {
    articles.forEach((art) => {
      expect(art.slug).toMatch(/^[a-z0-9-]+$/);
      expect(art.title.length).toBeGreaterThan(10);
      expect(art.summary.length).toBeGreaterThan(20);
      expect(art.readingTime).toBeTruthy();
      expect(art.author).toBeTruthy();
      expect(art.content.lead.length).toBeGreaterThan(30);
      expect(art.content.sections.length).toBeGreaterThan(0);
      expect(art.tags.length).toBeGreaterThan(0);
    });
  });

  it('includes key articles: Zigbee 3.0, Matter/Thread, Local vs Cloud', () => {
    const slugs = articles.map((a) => a.slug);
    expect(slugs).toContain('zigbee-mesh-deep-dive');
    expect(slugs).toContain('matter-and-thread-explained');
    expect(slugs).toContain('local-vs-cloud-smart-home');
  });
});
