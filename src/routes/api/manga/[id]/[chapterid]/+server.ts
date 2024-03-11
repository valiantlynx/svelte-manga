import type { RequestHandler } from './$types';
import axios from 'axios';
import cheerio from 'cheerio';

export const GET: RequestHandler = async ({ url: requestUrl, setHeaders }) => {
    const sourceUrl: string | null = requestUrl.searchParams.get('url');
    if (!sourceUrl) {
        return new Response(JSON.stringify({ error: "URL parameter is missing" }), { status: 400 });
    }

    setHeaders({
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': `public, s-maxage=${60 * 60 * 24 * 365}`,
    });

    const trimmedPathname = sourceUrl.substring(sourceUrl.indexOf('/', 1));
    const urls = [
        `${import.meta.env.VITE_IMAGE_URL_MANGANELO}/${trimmedPathname}`,
        `${import.meta.env.VITE_IMAGE_URL_CHAPMANGANELO}/${trimmedPathname}`,
    ];

    for (let urlLink of urls) {
        try {
            const response = await axios.get(urlLink);
            const $ = cheerio.load(response.data);

            // Check for "404 NOT FOUND" content in the response
            if ($('div.panel-not-found').length > 0 || $('p').text().includes("404 - PAGE NOT FOUND")) {
                console.log(`404 Page Detected at ${urlLink}`);
                continue; // Try the next URL if "404 NOT FOUND" content is detected
            }

           
		const titleElement = $('.panel-chapter-info-top h1');
		const elements = $('.reader-content');
		const data = elements
			.map((index, element) => {
				const imageUrlExternal = $(element).attr('src');
				console.log(imageUrlExternal)
				// fetch the image url from the src attribute through our origin
				const imageUrl = `${requestUrl.origin}/api/getimage?url=${imageUrlExternal}`;
				const pageNumber = index + 1;
				const totalPages = elements.length;

				

				return {
					imageUrl,
					pageNumber,
					totalPages
				};
			})
			.get();

		const chapters: any[] = [];
		// Select the first select element with class "navi-change-chapter"
		$('select.navi-change-chapter option')
			.first()
			.each((index, element) => {
				const chapterNumberMatch = $(element)
					.text()
					.match(/Chapter (\d+)/);

				// remove the /chapter part of the url
				const value = $(element).attr('value')?.replace('/chapter', '');
				if (chapterNumberMatch && value) {
					const chapterNumber = parseInt(chapterNumberMatch[1]);
					chapters.push({
						number: chapterNumber,
						value
					});
				}
			});
		// Select all <option> elements within the <select> with class "navi-change-chapter"
		$('select.navi-change-chapter option').each((index, element) => {
			const chapterNumberMatch = $(element)
				.text()
				.match(/Chapter (\d+)/);

			// remove the /chapter part of the url
			const value = $(element).attr('value')?.replace('/chapter', '');
			if (chapterNumberMatch && value) {
				const chapterNumber = parseInt(chapterNumberMatch[1]);
				chapters.push({
					number: chapterNumber,
					value
				});
			}
		});

		return new Response(
			JSON.stringify({
				chapters,
				title: titleElement.text(),
				images: data
			})
		);

        } catch (error) {
            console.error(`Error fetching from ${urlLink}:`, error.message);
			return new Response(
				JSON.stringify({
					error: error.message,
					failure: `Error fetching from ${urlLink}:`
				})
			);
        }
    }

    // If all URLs fail
    return new Response(JSON.stringify({
        error: "Failed to fetch valid data from both sources.",
    }), { status: 502 });
};
