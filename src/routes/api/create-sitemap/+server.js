import { render } from '$lib/utils/api';
import { writeFile } from 'fs/promises';
let {VITE_PUBLIC_API} = import.meta.env

export const GET = async (event) => {
	for (let i = 1; i <= 44; i++) {
		console.log('creating sitemap', i);
		const data = await render(i, VITE_PUBLIC_API);
		await writeFile(`./static/sitemap-${i}.xml`, data, { encoding: 'utf-8', flag: 'w' });
		console.log('sitemap created', i);
	}

	const data = { message: 'sitemap creation started' };

	return new Response(JSON.stringify(data), {
		headers: {
			'content-type': 'text/plain'
		}
	});
};
