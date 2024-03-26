
import { genMangaPosts, pb } from '$lib/utils/api';

//temp fix for googleapis
const google: any = {};
// ping google to update the the urls of the company and the images
const pingGoogle = async (page: number, url: string) => {
	const links: any[] = [];
	const images: any[] = [];

	await genMangaPosts(page, url, url).then((mangas) => {
		
		mangas.map((manga: { url: string; image: string; title: string; description: string }) => {
			links.push(url + manga.url);
			images.push(url + manga.image);
		});
	});

	// get the pocketbase services credentials
    const services = await pb.collection('credentials').getList(1, 8, {}).then((data) => data.items);
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