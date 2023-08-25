import type { PageLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const { id, chapterid } = params;

	const response = await fetch(import.meta.env.VITE_HOST_URL + `/manga/${id}/${chapterid}`);
	const data = await response.json();
	return data;
}) satisfies PageLoad;
