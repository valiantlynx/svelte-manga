import type { SiteConfig } from '$lib/types/site'

export const site: SiteConfig = {
  protocol: import.meta.env.URARA_SITE_PROTOCOL ?? import.meta.env.DEV ? 'http://' : 'https://',
  domain: import.meta.env.URARA_SITE_DOMAIN ?? 'valiantlynx.com',
  title: 'Valiantlynx',
  subtitle: 'Where Imagination Meets Innovation',
  lang: 'en-US',
  description: 'The Journey of a Multi-Disciplinary Engineer: Exploring the Intersection of AI, Blockchain, Web Development, and Product Design',
  author: {
    avatar: '/assets/maskable@512.png',
    name: 'Valiantlynx',
    status: '🌸',
    bio: 'Multi-Disciplinary Engineer: Exploring the Intersection of AI, Blockchain, Web Development, and Product Design'
  },
  themeColor: '#3D4451'
}
