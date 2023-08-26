import type { RequestHandler } from './$types';

// for pages 1 - 53 make a main sitemap that shows the pages of the sitemap
const renderMainSitemap = async (url: string): Promise<string> => {
	const mainSitemapContent = `<?xml version='1.0' encoding='utf-8'?>
    <sitemapindex xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
        ${Array.from({ length: 53 }, (_, i) => i + 1)
					.map(
						(page) => `
            <sitemap>
                <loc>${url}/sitemap.xml/sitemap-${page}.xml</loc>
            </sitemap>

        `
					)
					.join('')}
    </sitemapindex>`.trim();

	return mainSitemapContent;
};

export const prerender = true;
export const trailingSlash = 'never';

export const GET: RequestHandler = async ({ url }) => {
	return new Response(await renderMainSitemap(url.origin), {
		headers: {
			'content-type': 'application/xml; charset=utf-8'
		}
	});
};
new Response();
