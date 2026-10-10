import { NAV_ITEMS, LEGAL_ITEMS } from '@/data/navigation';
import { siteUrl } from '@/lib/seo';

// Nur mit echter Domain (Vercel-Produktions-Domain oder NEXT_PUBLIC_SITE_URL) — es wird keine Domain erfunden.
export default function sitemap() {
  const base = siteUrl();
  if (!base) return [];
  const paths = [...NAV_ITEMS.map((i) => i.href), ...LEGAL_ITEMS.map((i) => i.href)];
  return paths.map((p) => ({
    url: `${base}${p === '/' ? '' : p}`,
    changeFrequency: p === '/' ? 'weekly' : 'monthly',
    priority: p === '/' ? 1 : p === '/leistungen' || p === '/termin' ? 0.9 : 0.6,
  }));
}
