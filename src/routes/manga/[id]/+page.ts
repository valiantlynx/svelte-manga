import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const { id } = params;

	

	const response = await fetch(import.meta.env.VITE_HOST_URL + `/manga/${id}`);
	const data = await response.json();
	console.log('data one manga: ', data);

	return data;
}) satisfies PageLoad;
