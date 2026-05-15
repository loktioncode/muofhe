import type { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/site-url'

const paths: Array<{
  path: string
  changeFrequency: MetadataRoute.Sitemap[0]['changeFrequency']
  priority: number
}> = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/conferences', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/swimming-pool', changeFrequency: 'monthly', priority: 0.75 },
  { path: '/restaurant', changeFrequency: 'monthly', priority: 0.75 },
  { path: '/cancellation', changeFrequency: 'yearly', priority: 0.4 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.35 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.35 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl()
  return paths.map(({ path, ...rest }) => ({
    ...rest,
    url: `${base}${path === '/' ? '/' : path}`,
    lastModified: new Date(),
  }))
}
