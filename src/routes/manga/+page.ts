import type { PageLoad } from './$types';
import axios from 'axios';

export const load = (async () => {
	const page = 1;
	let mangas = [];

	const url = import.meta.env.VITE_HOST_URL + `/api/manga?page=${page}`;

	const response = await axios.get(url, {
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json'
		}
	});

	const data = await response.data;
	mangas = data.mangas;

	return {
		title: 'List - Animevariant',
		mangas
	};
}) satisfies PageLoad;
