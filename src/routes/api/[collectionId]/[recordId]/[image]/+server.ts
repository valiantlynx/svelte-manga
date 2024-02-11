import type { RequestHandler } from './$types';
import { getImageURL } from '$lib/utils/api';

export const GET: RequestHandler = async ({ url, params }) => {
	const imageUrl = getImageURL(params.collectionId, params.recordId, params.image);
	const imageBuffer = await fetch(imageUrl).then((res) => res.arrayBuffer());

	return new Response(imageBuffer, {
		headers: {
			'Content-Type': 'image/webp',
			'Access-Control-Allow-Origin': '*',
			'Cache-Control': `public, s-maxage=${60 * 60 * 24 * 365}`
		}
	});
};
