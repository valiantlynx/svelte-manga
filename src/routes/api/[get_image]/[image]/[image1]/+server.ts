import type { RequestHandler } from './$types';


export const GET: RequestHandler = async ({ params }) => {
    const imageUrl = import.meta.env.VITE_IMAGE_URL_MANGANELO_IMAGE_SRC + '/' + params.get_image + '/' + params.image + '/' + params.image1 || '';

    try {
        // Fetch the image
        const response = await fetch(imageUrl, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch image');
        }

        // Get the content-type from the response (assuming the server provides it)
        const contentType = response.headers.get('Content-Type') || 'image/jpeg';

        // Read the image data
        const imageData = await response.arrayBuffer();

        // Return the image data with appropriate headers
        return new Response(imageData, {
            headers: {
                'Content-Type': contentType,
                'Access-Control-Allow-Origin': '*', // Consider adjusting this in production for security
                'Cache-Control': `public, s-maxage=${60 * 60 * 24 * 365}` // Adjust caching as needed
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Failed to fetch and serve image', error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*' // Consistent CORS policy as the rest of your API
            }
        });
    }
};
