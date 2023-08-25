import type { RequestHandler } from './$types';
import axios from 'axios';
import cheerio from 'cheerio';

export const GET: RequestHandler = async ({ url }) => {
	// Your logic for handling the page parameter and generating the response
	const path = url.pathname;
	const trimmedPathname = path.substring(path.indexOf('/', 1));

	try {
		const urlLink = `${import.meta.env.VITE_IMAGE_URL}/chapter${trimmedPathname}`;

		console.log('Navigating to: ', urlLink);

		const response = await axios.get(urlLink);
		const $ = cheerio.load(response.data);

		const titleElement = $('.panel-chapter-info-top h1');
		const elements = $('.container-chapter-reader img');
		const data = elements
			.map((index, element) => {
				const imageUrl = $(element).attr('data-src');
				const pageNumber = index + 1;
				const totalPages = elements.length;

				console.log('Image URL:', imageUrl);
				console.log('Page Number:', pageNumber);
				console.log('Total Pages:', totalPages);

				return {
					imageUrl,
					pageNumber,
					totalPages
				};
			})
			.get();

		const chapters: any[] = [];
		// Select the first select element with class "navi-change-chapter"
		const firstSelectElement = $('select.navi-change-chapter option')
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
		console.log('First Select Element:', firstSelectElement);
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

		console.log('Chapter Numbers:', chapters);
		return new Response(
			JSON.stringify({
				chapters,
				title: titleElement.text(),
				images: data
			})
		);
	} catch (error: any) {
		return new Response(
			JSON.stringify({
				images: error.message,
				failure: error
			})
		);
	}
};
