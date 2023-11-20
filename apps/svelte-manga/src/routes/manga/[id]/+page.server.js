import { error } from '@sveltejs/kit';

export const load = async (event) => {
	const { id } = event.params;

	const url = `/manga/${id}`;

	const response = await fetch(event.url.origin + `/api/manga/${id}?url=${url}`);
	const manga = await response.json();

	const pageNumbers = generatePageNumbers(manga);
	const chaptersToShow = updateChaptersToShow(1, manga);
	return {
		manga,
		chaptersToShow,
		pageNumbers
	};
};

/** @type {import('./$types').Actions} */
export const actions = {
	chapters: async (event) => {
		const data = await event.request.formData();
		const page = data.get('page');
		console.log('page chapters', page);
		try {
			const { id } = event.params;
			const url = `/manga/${id}`;
			const response = await fetch(event.url.origin + `/api/manga/${id}?url=${url}`);
			const manga = await response.json();
			const chaptersToShow = updateChaptersToShow(page, manga);
			console.log('chaptersToShow', chaptersToShow);
			return {
				chaptersToShow
			};
		} catch (err) {
			console.log('err', err);
			throw error(err.status, err.message);
		}
	}
};

let chaptersPerPage = 12;
function updateChaptersToShow(currentPage, manga) {
	const startIndex = (currentPage - 1) * chaptersPerPage;
	const endIndex = startIndex + chaptersPerPage;
	const chaptersToShow = manga.episodes.slice(startIndex, endIndex);
	return chaptersToShow;
}
// Generate an array of page numbers for pagination buttons
function generatePageNumbers(manga) {
	const totalChapters = manga.episodes.length;
	const totalPages = Math.ceil(totalChapters / chaptersPerPage);
	const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
	return pageNumbers;
}
