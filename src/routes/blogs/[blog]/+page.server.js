import { serializeNonPOJOs, getImageURL } from '$lib/utils/api';
import { error } from '@sveltejs/kit';

export const load = async (event) => {
	const slug = event.params['blog'];
	const blog = await event.locals.pb.collection('blogs').getFirstListItem(`slug="${slug}"`, {
		expand: ['tags, author']
	});
	blog.image = getImageURL(blog.collectionId, blog.id, blog.image, 'thumb=200x200');
	return {
		blog: serializeNonPOJOs(blog)
	};
};

export const actions = {
	toggleLike: async ({ locals, request }) => {
		const form = await request.formData();
		const contentId = form.get('blogId');
		const userId = form.get('userId');
		try {
			// Logic to toggle like
			// Check if the like exists
			const existingLike = await locals.pb
				.collection('valiantlynx_likes')
				.getFirstListItem(`userId='${userId}' && contentId='${contentId}'`, {});

			if (!existingLike) {
				// Like
				const data = {
					userId: userId,
					contentType: 'blog',
					contentId: contentId
				};
				await locals.pb.collection('valiantlynx_likes').create(data);
				return {
					status: 200,
					message: 'Liked1 blog successfully'
				};
			} else {
				// Unlike
				await locals.pb.collection('valiantlynx_likes').delete(existingLike.id);
				return {
					status: 200,
					message: 'Unliked blog successfully'
				};
			}
		} catch (err) {
			// Handle not found error specifically
			if (err.status === 404) {
				// If like record not found, create a new like
				const data = {
					userId: userId,
					contentType: 'blog',
					contentId: contentId
				};
				await locals.pb.collection('valiantlynx_likes').create(data);
				return {
					status: 200,
					message: 'Liked blog successfully'
				};
			} else {
				throw error(err.status, err.message);
			}
		}
	}
};
