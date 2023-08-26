import type { PageLoad } from './$types';

export const load = (async ({ url }) => {
	const page = url.searchParams.get('page');

	let mangas: any = [];

	const url1 = import.meta.env.VITE_HOST_URL + `/api/manga?page=${page}`;

	const response = await fetch(url1);

	const data = await response.json();
	mangas = data.mangas;

	return {
		mangas
	};
}) satisfies PageLoad;
