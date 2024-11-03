import { error } from '@sveltejs/kit';
let {VITE_PUBLIC_API} = import.meta.env

export const load = async (event) => {
	const { id } = event.params;
	const anime = await getDetails(event, id)

	const pageNumbers = generatePageNumbers(anime);
	const chaptersToShow = updateChaptersToShow(1, anime.total_episode);
	const similarAnime = await getDetails(event);

	return {
		anime,
		chaptersToShow,
		pageNumbers,
		similarAnime
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
            const manga = await getDetails(event, id);

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
function updateChaptersToShow(currentPage, totalEpisodes) {
	const startIndex = (currentPage - 1) * chaptersPerPage;
	const endIndex = Math.min(startIndex + chaptersPerPage, totalEpisodes);

	// Generate chapter objects based on the index
	const chaptersToShow = Array.from({ length: endIndex - startIndex }, (_, i) => ({
		chapterId: startIndex + i + 1, // chapterId is based on the episode number
		title: `Episode ${startIndex + i + 1}`
	}));
	return chaptersToShow;
}
// Generate an array of page numbers for pagination buttons
function generatePageNumbers(manga) {
	const totalChapters = manga.chapters?.length;
	const totalPages = Math.ceil(totalChapters / chaptersPerPage);
	const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
	return pageNumbers;
}

async function getDetails(event, id) {
	const url = VITE_PUBLIC_API + `/api/anime/${id}`;
    try {
        const response = await event.fetch(url,
            { headers: { 'Access-Control-Allow-Origin': '*' } }
        );

        const results = await response.json();

        return results;
    } catch (error) {
        console.log(error);
    }
}

