let {VITE_PUBLIC_API} = import.meta.env

export const load = async (event) => {
	const genreList = await getPopularAnime	(event, 1);
	return {
		genreList
	};
};


async function getPopularAnime(event, pageNo) {
	const url = VITE_PUBLIC_API + `/api/popular/${pageNo}`;
    try {
        const response = await event.fetch(url,
            { headers: { 'Access-Control-Allow-Origin': '*' } }
        );

        const results = await response.json();

        return results.results;
    } catch (error) {
        console.log(error);
    }
}
