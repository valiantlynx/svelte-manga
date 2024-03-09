import { error } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils/api';

export const load = async (event) => {
	const popularMangas = await Popular(event.locals, 1);
	const page = 1;
	const state = "all";
	const category = "Isekai";
	const type = "latest";
	const latestMangas = await Latest(event, page, type, state, category);



	console.log("--Z", latestMangas)
	return {
		popularMangas,
		latestMangas
	};
};

/** @type {import('./$types').Actions} */
export const actions = {
	popular: async (event) => {
		const data = await event.request.formData();
		const page = data.get('page');
		try {
			const popularMangas = await Popular(event.locals, page);
	
			return {
				popularMangas
			};
		} catch (err) {
			throw error(err.status, err.message);
		}
	},
	latest: async (event) => {
		const data = await event.request.formData();
		const page = data.get('page');
		const state = "all";
		const category = "Isekai";
		const type = "latest";
		try {
			const latestMangas = await Latest(event, page, type, state, category);
			return {
				latestMangas
			};
		} catch (err) {
			throw error(err.status, err.message);
		}
	}
};

// function to get the data from the url
const Popular = async (locals, pageNo) => {

	const resultList = serializeNonPOJOs(
		await locals.pb.collection('reading_progress').getList(1, 20, {
			filter: 'user = "77760erf1db6qql"',
			expand: ['manga', 'currentChapter'],
			perPage: 20,
			sort: '-updated',
			page: pageNo
		})
	);

	const mangas = resultList.items.map((manga) => manga.expand?.manga);
	return mangas;
};

const Latest = async (event, pageNo, type, state, category) => {
	const url = `${event.url.origin}/api/manga?type=${type}&page=${pageNo}&state=${state}&category=${category}`
	const res = await event.fetch(url);
	const data = await res.json();
	return data.mangas;
};
