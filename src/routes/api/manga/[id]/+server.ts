import type { RequestHandler } from './$types';
import axios from 'axios';
import cheerio from 'cheerio';

export const GET: RequestHandler = async ({ url: requestUrl, setHeaders }) => {
    const sourceUrl = requestUrl.searchParams.get('url');
    setHeaders({
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': `public, s-maxage=${60 * 60 * 24 * 365}`,
    });

    const urls = [
        `${import.meta.env.VITE_IMAGE_URL_MANGANELO}${sourceUrl}`,
        `${import.meta.env.VITE_IMAGE_URL_CHAPMANGANELO}${sourceUrl}`,
    ];

    for (let url of urls) {
        try {
            const response = await axios.get(url);
            const $ = cheerio.load(response.data);
            const notFoundText = $('div.panel-not-found p').first().text();

            // Check if the loaded page is a "404 NOT FOUND" page by looking for specific text.
            if (notFoundText.includes("404 - PAGE NOT FOUND") || notFoundText.includes("This page does not exist")) {
                console.error(`404 Not Found content detected at ${url}`);
                continue; // Skip this iteration and try the next URL
            }

			const titleElement = $('.story-info-right h1');
			const imgElement = $('.info-image img');
			const descriptionElement = $('#panel-story-info-description');
	
			// Select the parent element containing the author information
			const authorContainer = $('.table-value');
			const lastUpdated = $('.stre-value').text();
			// Extract the last update date and time
			const lastUpdatedPattern = /(\w{3} \d{1,2},\d{4} - \d{2}:\d{2} [APM]{2})/;
			const lastUpdatedMatch = lastUpdated.match(lastUpdatedPattern);
			const lastUpated = lastUpdatedMatch ? lastUpdatedMatch[1] : '';
	
			// Extract the view count
			const viewCountPattern = /([0-9]+[A-Z])/;
			const viewCountMatch = lastUpdated.match(viewCountPattern);
			const viewCount = viewCountMatch ? viewCountMatch[1] : '';
	
			// Select all the anchor elements within the parent container
			const authorElements = authorContainer.find('a');
	
			// Create an array to store the extracted author names
			const authors: string[] = [];
	
			// Iterate through the anchor elements and extract their text content
			authorElements.each((index, authorElement) => {
				const authorName = $(authorElement).text().trim();
				authors.push(authorName);
			});
	
			const ratingElement = $('.manga-info-text .manga-info-text-i span');
			const genresElement = $('.manga-info-text .manga-info-text-i a');
	
			const chapterElements = $('.chapter-name');
		
			const data = chapterElements
				.map((index, element) => {
					const src = $(element).attr('href');
	
					// Assuming the URL structure is consistent
					const urlSegments = src ? src.split('/') : [];
					const mangaId = urlSegments.length > 3 ? urlSegments[3] : null; // manga-ox128591
					const chapter = urlSegments.length > 4 ? urlSegments[4] : null; // chapter-5
					const chapterId = chapter ? chapter.split('-').slice(-1)[0] : null; // Extracts '5' from 'chapter-5'
					const chapterPrefix = chapter ? chapter.replace(`-${chapterId}`, '') : ''; // 'chapter'
	
					return {
						src,
						mangaId,
						chapterId,
						chapterPrefix, // This is 'chapter', in case you need it
						chapterTitle: $(element).text()
					};
				})
				.get();
			// extract the image path
			const parsedImg = imgElement.attr('src').split('.com').slice(-1)[0]
				
			return new Response(
				JSON.stringify({
					episodes: data,
					title: titleElement.text(),
					img: requestUrl.origin + '/api' + parsedImg,
					description: descriptionElement.text(),
					author: authors,
					rating: ratingElement.text(),
					genres: genresElement.text(),
					lastUpdated: lastUpated,
					views: viewCount
				})
			);
        } catch (error) {
            console.error(`Error fetching from ${url}:`, error.message);
			return new Response(
				JSON.stringify({
					error: error.message,
					failure: `Error fetching from ${url}:`
				})
			);
        }
    }

    // If neither URL results in valid content
    return new Response(JSON.stringify({
        failure: 'Failed to fetch valid data from both sources.',
    }), { status: 502 });
};
