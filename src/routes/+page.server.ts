import { getImageURL, serializeNonPOJOs } from '$lib/utils/api';

export const load = async (event) => {
	const blogs = await event.locals.pb.collection('blogs').getList(1, 10, {
		sort: '-create',
		expand: 'author'
	});

	for (const item of blogs.items) {
		item.image = getImageURL(item.collectionId, item.id, item.image);
	}

	return {
		blogs: serializeNonPOJOs(blogs)
	};
};
