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

        if (!userId || !contentId) {
            throw error(400, 'Invalid request data');
        }

        try {
            const existingLike = await locals.pb
                .collection('valiantlynx_likes')
                .getFirstListItem(`userId='${userId}' && contentId='${contentId}'`, {});

            if (!existingLike) {
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
                await locals.pb.collection('valiantlynx_likes').delete(existingLike.id);
                return {
                    status: 200,
                    message: 'Unliked blog successfully'
                };
            }
        } catch (err) {
            throw error(err.status, err.message);
        }
    }
};
