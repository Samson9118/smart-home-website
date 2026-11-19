import { describe, it, expect } from 'vitest';
import robots from '@/app/robots';
import { siteConfig } from '@/config/site';

describe('Robots.txt Generator', () => {
  it('generates compliant robots rules', () => {
    const rules = robots();
    expect(rules.rules).toBeDefined();

    const rule = Array.isArray(rules.rules) ? rules.rules[0] : rules.rules;
    expect(rule.userAgent).toBe('*');
    expect(rule.allow).toBe('/');
    expect(rule.disallow).toContain('/api/');

    const baseUrl = siteConfig.url.replace(/\/$/, '');
    expect(rules.sitemap).toBe(`${baseUrl}/sitemap.xml`);
  });
});
