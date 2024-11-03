let {VITE_PUBLIC_API} = import.meta.env

export const load = async (event) => {
	const genre = event.params.genretype
	const genreList = await getGenre(event, genre, 1);
	return {
		genreList
	};
};


async function getGenre(event, genre, pageNo) {
	const url = VITE_PUBLIC_API + `/api/genre/${genre}/${pageNo}`;
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
