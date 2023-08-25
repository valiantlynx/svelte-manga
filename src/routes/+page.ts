import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const page = 1;
	let mangas = [];

	const url = import.meta.env.VITE_HOST_URL + `/manga?page=${page}`;

	const response = await fetch(url)
	
	const data = await await response.json();
	mangas = data.mangas;

	return {
		title: 'List - Animevariant',
		mangas
	};
}) satisfies PageLoad;
