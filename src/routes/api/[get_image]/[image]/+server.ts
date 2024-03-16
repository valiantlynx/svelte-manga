import type { RequestHandler } from './$types';
import dotenv from 'dotenv';
dotenv.config();

let { PUBLIC_IMAGE_URL } = process.env;

export const GET: RequestHandler = async ({ params }) => {
	const imageUrl = `${PUBLIC_IMAGE_URL}/${params.get_image}/${params.image || ''}`;

	try {
		const response = await fetch(imageUrl, {
			method: 'GET',
			// You might not need to set 'Content-Type' here since it will be determined by the response
			headers: {
				'Access-Control-Allow-Origin': '*'
			}
		});

		if (!response.ok) {
			throw new Error('Failed to fetch image');
		}

		// Clone the response to modify its headers
		const imageResponse = new Response(response.body, response);
		// Ensure the Content-Type header is set correctly based on the fetched image
		imageResponse.headers.set('Content-Type', response.headers.get('Content-Type') || 'image/jpeg');
		imageResponse.headers.set('Access-Control-Allow-Origin', '*');
		// You might want to customize the Cache-Control header based on your needs
		imageResponse.headers.set('Cache-Control', `public, s-maxage=${60 * 60 * 24 * 365}`);

		return imageResponse;
	} catch (error) {
		return new Response(JSON.stringify({ message: 'Failed to serve image', error }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			}
		});
	}
};
