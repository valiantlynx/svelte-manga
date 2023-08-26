import type { PageLoad } from './$types';

export const load = (async () => {
	const page = 1;
	let mangas = [];

	const url = import.meta.env.VITE_HOST_URL + `/api/manga?page=${page}`;

	const response = await fetch(url);

	const data = await response.json();
	mangas = data.mangas;

	return {
		title: 'List - Animevariant',
		mangas
	};
}) satisfies PageLoad;
