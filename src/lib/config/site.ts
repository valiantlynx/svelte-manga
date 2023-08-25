import type { SiteConfig } from '$lib/types/site';

export const site: SiteConfig = {
	protocol: import.meta.env.URARA_SITE_PROTOCOL ?? import.meta.env.DEV ? 'http://' : 'https://',
	domain: import.meta.env.VITE_SITE_URL ?? 'valiantlynx.com',
	logo: import.meta.env.VITE_SITE_LOGO ?? '/logo.png',
	company: import.meta.env.VITE_SITE_COMPANY ?? 'Valiantlynx',
	email: import.meta.env.VITE_SITE_EMAIL ?? 'valiantlynxz@gmail.com',
	noImage: import.meta.env.VITE_SITE_NO_IMAGE ?? '/assets/no-image.png',
	title: 'Valiantlynx',
	subtitle: 'Where Imagination Meets Innovation',
	pocketbase: import.meta.env.VITE_PB_API ?? 'https://nameless-cloud-5581.fly.dev',
	lang: 'en-US',
	description:
		'The Journey of a Multi-Disciplinary Engineer: Exploring the Intersection of AI, Blockchain, Web Development, and Product Design',
	author: {
		avatar: '/assets/maskable@512.png',
		name: 'Valiantlynx',
		status: '🌸',
		bio: 'Multi-Disciplinary Engineer: Exploring the Intersection of AI, Blockchain, Web Development, and Product Design'
	},
	themeColor: '#3D4451'
};
