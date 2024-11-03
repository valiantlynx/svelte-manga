import { serializeNonPOJOs } from '$lib/utils/api';
let {VITE_PUBLIC_API} = import.meta.env
let currentChapterIndex;
let data;

export const load = async (event) => {
	const { id, chapterid } = event.params;

	const response = await event.fetch(`${VITE_PUBLIC_API}/api/manga/${id}/${chapterid}/${event.url.search}`);
	data = await response.json();
	

	currentChapterIndex = data.manga.chapters?.findIndex((chapter) => {
		return chapter.chapterId === chapterid;
	});

	console.log(currentChapterIndex)



	await createRecord(event);
	const similarManga = await getSimilarManga(event);

	return {
		manga: data,
		currentChapterIndex,
		similarManga
	};
};

// function to update the reading status of the manga on the user record in the users collection, if the manga is not in the user record, add it, else update the reading status of the manga and the reading progress
let genreIds = [];
let authorIds = [];
async function createOrUpdateReadingProgress(event, mangaId, chapterId) {
	const { locals } = event;
	// Check if the user is logged in
	if (locals.user) {
		const userId = locals.user?.id;

		// Check if the manga already exists in the user record
		const existingProgressList = await locals.pb.collection('reading_progress').getList(1, 8, {
			filter: `user="${userId}" && manga="${mangaId}"`
		});

		if (existingProgressList.items.length === 0) {
			// If the manga doesn't exist, create it
			const pbData = {
				user: `${userId}`, // This is the user id, not the username
				manga: `${mangaId}`, // This is the manga id, not the manga title
				currentChapter: `${chapterId}`,
				currentChapterIndex: currentChapterIndex,
				totalChapters: data.manga.chapters.length - 1
			};
			await locals.pb.collection('reading_progress').create(pbData);
		} else {
			// If a reading progress record exists, update the current chapter
			const readingProgressId = existingProgressList.items[0].id;
			const pbdata = {
				currentChapter: `${chapterId}`,
				currentChapterIndex: currentChapterIndex,
				totalChapters: data.manga.chapters.length - 1
			};
			await locals.pb.collection('reading_progress').update(readingProgressId, pbdata);
		}
	}
}

async function createRecord(event) {

	const { locals, url, params } = event;
	// if the user is logged in, send the chapter data to pocketbase
	if (locals.user) {
		// Check if the chapter already exists using some unique identifier, for example, the title
		const existingChapterList = await locals.pb.collection('Chapters').getList(1, 8, {
			filter: `src="${url.href}"`
		});

		if (existingChapterList.items.length === 0) {
			// Check if the manga already exists using some unique identifier, for example, the title
			const existingMangaList = await locals.pb.collection('mangas').getList(1, 8, {
				filter: `sourceid~"${params.id}"`
			});
			// If a manga record doesn't exist, create it
			if (existingMangaList.items.length === 0) {
				// Manga doesn't exist, create it

				//but first do genres and author
				for (let i = 0; i < data.manga.authors.length; i++) {
	
					const authorList = await locals.pb.collection('author').getFullList({
						filter: `name="${data.manga.authors[i]}"`
					});
		

					if (authorList.length === 0) {
						const createdAuthor = await locals.pb.collection('author').create({
							name: `${data.manga.authors[i]}`
						});

						authorIds.push(createdAuthor.id);
					} else {
						authorIds.push(authorList[0].id);
					}
				}

				for (let i = 0; i < data.manga.genres.length; i++) {
	
					const genreList = await locals.pb.collection('genres').getFullList({
						filter: `name="${data.manga.genres[i]}"`
					});

					if (genreList.length === 0) {
						const createdGenre = await locals.pb.collection('genres').create({
							name: `${data.manga.genres[i]}`
						});

						genreIds.push(createdGenre.id);
					} else {
						genreIds.push(genreList[0].id);
					}
				}

				const image = data.manga.img.split("/mangaimage/")

				// create the manga datamanga to send to pocketbase
				const pbDataManga = {
					title: data.manga.title,
					description: data.manga.description,
					img: image[1],
					updated: data.manga.lastUpdated,
					views: data.manga.views,
					latestChapter: data.manga.chapters[0].chapterTitle,
					sourceid: params.id,
					genres: genreIds,
					authors: authorIds,
					src: url.href
				};
				const mangaRes = await locals.pb.collection('mangas').create(pbDataManga);

				// create the chapter data to send to pocketbase
				const pbData = {
					title: data.manga.title,
					chapterId: params.chapterid,
					src: url.href,
					manga: mangaRes.id
				};
				const chapterRes = await locals.pb.collection('Chapters').create(pbData);

				// Call the function to create or update the reading progress
				await createOrUpdateReadingProgress(event, chapterRes.manga, chapterRes.id);
			} else {
				// create the chapter data to send to pocketbase
				const pbData = {
					title: data.manga.title,
					chapterId: params.chapterid,
					src: url.href,
					manga: existingMangaList.items[0].id
				};
				const chapterRes = await locals.pb.collection('Chapters').create(pbData);

				// Call the function to create or update the reading progress
				await createOrUpdateReadingProgress(event, chapterRes.manga, chapterRes.id);
			}
		} else {
			// Call the function to create or update the reading progress
			await createOrUpdateReadingProgress(
				event,
				existingChapterList.items[0].manga,
				existingChapterList.items[0].id
			);
		}
	}
}

async function getSimilarManga(event) {
	const { locals } = event;
	// get similar manga, depending on the genre of the manga

	const similarMangaList = await serializeNonPOJOs(
		await locals.pb.collection('mangas').getList(1, 8, {})
	);

	return similarMangaList.items;
}
