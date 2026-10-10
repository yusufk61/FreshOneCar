import { siteUrl } from '@/lib/seo';

export default function robots() {
  const base = siteUrl();
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    ...(base ? { sitemap: `${base}/sitemap.xml` } : {}),
  };
}
