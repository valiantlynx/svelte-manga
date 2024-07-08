import PocketBase from 'pocketbase';
import { site } from '@valiantlynx/general-config';

export const pb = new PocketBase(site.site.pocketbase);

export const getImageURL = (collectionId: string, recordId: string, fileName: string) => {
    return `${site.site.pocketbase}/api/files/${collectionId}/${recordId}/${fileName}`;
};

export const getPocketbase = async (collection: string, data: any) => {
    const resultList = await pb.collection(collection).getList(1, 8, data);
    return resultList;
};

export const postPocketbase = async (collection: string, data: any) => {
    const resultList = await pb.collection(collection).create(data);
    return resultList;
};

export const patchPocketbase1only = async (collection: string, id: string, data: any) => {
    const response = await pb.collection(collection).update(id, data);
    return response;
};

// function that generates the manga pages for the sitemap
export const genMangaPosts = async (page: number, origin: string, imgsrc: string) => {
    const mangaPosts: any = [];
    const url = `${imgsrc}/api/manga?page=${page}`;
    const response = await fetch(url, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    const mangas = data.mangas;

    if (mangas) {
        mangas.forEach((manga: any) => {
            const imageUrl = `${imgsrc}/api${manga.img}`;
            console.log(imageUrl);
            mangaPosts.push({
                url: manga.src,
                image: imageUrl,
                title: manga.title,
                description: manga.description,
            });
        });
    } else {
        console.error('Failed to fetch mangas');
    }

    return mangaPosts;
};

export const serializeNonPOJOs = (obj: any) => {
    // if the object is not a POJO, then serialize it
    // if (obj && typeof obj === 'object' && obj.constructor !== Object) {
    // return JSON.stringify(obj);
    // }
    // return obj;
    return structuredClone(obj);
};

export const render = async (page: number, url: string, imgsrc: string): Promise<string> =>
	`<?xml version='1.0' encoding='utf-8'?>
  <urlset
    xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xhtml="https://www.w3.org/1999/xhtml"
    xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
    xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
    xmlns:video="https://www.google.com/schemas/sitemap-video/1.1">
    <url>
      <loc>${url}</loc>
    </url>
    ${await genMangaPosts(page, url, imgsrc).then((mangas) =>
			mangas
				.map(
					(manga: { url: string; image: string; title: string; description: string }) =>
						`
    
                <url>
                <loc>${url + manga.url}</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <priority>0.9</priority>
                <changefreq>daily</changefreq>
                <image:image>
                  <image:loc>${manga.image}</image:loc>
                  <image:caption>${encodeURIComponent(manga.description)}</image:caption>
                  <image:geo_location>Norway</image:geo_location>
                  <image:title>${encodeURIComponent(manga.title)}</image:title>
                </image:image>
              </url>
              `
				)
				.join('')
		)}
    
  </urlset>`.trim();

// for pages 1 - 53 make a main sitemap that shows the pages of the sitemap
export const renderMainSitemap = (url: string) => {
	const mainSitemapContent = `<?xml version='1.0' encoding='UTF-8'?>

	<sitemapindex xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	
			 xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/siteindex.xsd"
	
			 xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${Array.from({ length: 44 }, (_, i) => i + 1)
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

