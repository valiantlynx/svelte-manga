import { pb, getImageURL } from './api';

// function that generates the manga pages for the sitemap
export const genPosts = async (page: number, origin: string) => {
	const allPosts: any = [];

	// fetch all the blogs	from pocketbase
	const blogs = await pb.collection('blogs').getFullList({
		sort: '-created'
	});
	
	if (blogs) {
		blogs.forEach((blog: any) => {
			const imageUrl = `${origin}/api/${blog.collectionId}/${blog.id}/${blog.image}`;
			allPosts.push({
				url: `/blogs/${blog.slug}`,
				image: imageUrl,
				title: blog.title,
				description: blog.summary
			});
			allPosts.push({
				url: `/${blog.slug}`,
				image: imageUrl,
				title: blog.title,
				description: blog.summary
			});
		});
	} else {
		console.error('Failed to fetch blogs');
	}

	// fetch all the projects from pocketbase
	const projects = await pb.collection('projects_valiantlynx').getFullList({
		sort: '-created'
	});

	if (projects) {
		projects.forEach((project: any) => {
			const imageUrl = `${origin}/api/${project.collectionId}/${project.id}/${project.thumbnail}`;
			allPosts.push({
				url: `/projects/${project.id}`,
				image: imageUrl,
				title: project.name,
				description: project.tagline
			});
		});
	} else {
		console.error('Failed to fetch projects');
	}


	return allPosts;
};

// Function to remove specified query parameters from a URL
const removeQueryParameters = (url, paramsToRemove) => {
	const parsedUrl = new URL(url);

	paramsToRemove.forEach((param) => {
		parsedUrl.searchParams.delete(param);
	});

	return parsedUrl.toString();
};

export const serializeNonPOJOs = (obj: any) => {
	// // if the object is not a POJO, then serialize it
	// if (obj && typeof obj === 'object' && obj.constructor !== Object) {
	// 	return JSON.stringify(obj);
	// }

	// return obj;

	return structuredClone(obj);
};

export const render = async (page: number, url: string): Promise<string> =>
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
    ${await genPosts(page, url).then((mangas) =>
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

//temp fix for googleapis
const google: any = {};
// ping google to update the the urls of the company and the images
const pingGoogle = async (page: number, url: string) => {
	const links: any[] = [];
	const images: any[] = [];

	await genPosts(page, url).then((mangas) => {
		mangas.map((manga: { url: string; image: string; title: string; description: string }) => {
			links.push(url + manga.url);
			images.push(url + manga.image);
		});
	});

	// get the pocketbase services credentials
	const services = await pb
		.collection('credentials')
		.getList(1, 8, {})
		.then((data) => data.items);

	const service = services[0].creds;

	// index the urls
	await indexer(links, service);
	// index the images
	await indexer(images, service);
};

// Set up variables for tracking API usage
const maxIndexingApiCalls = 5;
let apiCalls = 0;
let lastCallTime = Date.now();

async function indexer(urls: string[], services: any) {
	try {
		for (let i = 0; i < urls.length && apiCalls < maxIndexingApiCalls; i++) {
			const url = urls[i];
			// eslint-disable-next-line no-console
			console.log(`Indexing ${url}...`);
			const now = Date.now();

			// Limit the API call rate to one per 30 seconds
			if (apiCalls > 0 && now - lastCallTime < 3000) {
				const timeToWait = 3000 - (now - lastCallTime);
				// eslint-disable-next-line no-console
				console.log(`Waiting ${timeToWait}ms before next API call...`);
				await new Promise((resolve) => setTimeout(resolve, timeToWait));
			} else {
				// Create new auth object, pass it the client email, private key, and ask for permission to use the indexing service.
				const auth = new google.auth.JWT(
					services.client_email,
					undefined,
					services.private_key,
					['https://www.googleapis.com/auth/indexing'],
					undefined
				);

				const indexer = google.indexing({
					version: 'v3',
					auth: auth
				});

				const indexRequest = await indexer.urlNotifications
					.publish({
						requestBody: {
							type: 'URL_UPDATED',
							url: `${url}`
						}
					})
					.catch((error) => {
						// If the API call fails, log the error and continue
						// eslint-disable-next-line no-console
						console.error(`Error indexing ${url} ...`, error.message, error.domain, error.reason);
					});

				// Increment API usage and update last call time
				apiCalls++;
				lastCallTime = now;

				if (indexRequest) {
					// eslint-disable-next-line no-console
					console.log(`Indexed ${url} ...`);

					// If the API call succeeds, log the response
					// eslint-disable-next-line no-console
					console.log('index success', indexRequest.status, indexRequest.statusText);
				}
			}
		}
	} catch (error) {
		// If the API call fails, log the error and continue
	}
}
