import { error } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils/api';
let {VITE_PUBLIC_API} = import.meta.env

export const load = async (event) => {
	const { id } = event.params;
	const response = await fetch(VITE_PUBLIC_API + `/api/manga/${id}`);
	const manga = await response.json();

	const pageNumbers = generatePageNumbers(manga);
	const chaptersToShow = updateChaptersToShow(1, manga);
	const similarManga = await getSimilarManga(event);

	return {
		manga,
		chaptersToShow,
		pageNumbers,
		similarManga
	};
};

/** @type {import('./$types').Actions} */
export const actions = {
    chapters: async (event) => {
        const data = await event.request.formData();
        const page = parseInt(data.get('page'), 10); // Convert to integer
        if (isNaN(page)) {
            throw error(400, "Invalid page number");
        }
        try {
            const { id } = event.params;
            const response = await fetch(`${VITE_PUBLIC_API}/api/manga/${id}`);
            const manga = await response.json();

			if (!manga || !Array.isArray(manga.chapters)) {
				throw error(404, "Manga not found or chapters are unavailable.");
			}			
            const chaptersToShow = updateChaptersToShow(page, manga);
            return {
                chaptersToShow
            };
        } catch (err) {
            throw error(err.status || 500, err.message || "An error occurred while fetching chapters.");
        }
    }
};


let chaptersPerPage = 12;
function updateChaptersToShow(currentPage, manga) {
	const startIndex = (currentPage - 1) * chaptersPerPage;
	const endIndex = startIndex + chaptersPerPage;
	const chaptersToShow = manga.chapters.slice(startIndex, endIndex);
	return chaptersToShow;
}
// Generate an array of page numbers for pagination buttons
function generatePageNumbers(manga) {
	const totalChapters = manga.chapters.length;
	const totalPages = Math.ceil(totalChapters / chaptersPerPage);
	const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
	return pageNumbers;
}

async function getSimilarManga(event) {
	const { locals } = event;
	// get similar manga, depending on the genre of the manga

	const similarMangaList = await serializeNonPOJOs(
		await locals.pb.collection('mangas').getList(1, 8, {})
	);

	return similarMangaList.items;
}
