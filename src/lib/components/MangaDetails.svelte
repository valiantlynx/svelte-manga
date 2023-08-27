<script lang="ts">
	import { page } from '$app/stores';
	import { postPocketbase, pb, getPocketbase } from '$lib/utils/api';
	export let data: any;

	const imageSrc = `${import.meta.env.VITE_HOST_URL}/api${data.img}?width=200&height=300`;

	// turn the views into a number by removing the commas and the last character, if the last character is a k  then multiply the number by 1000, if the last character is an m then multiply the number by 1000000
	let views = data.views;

	// remove the commas
	views = views.replace(/,/g, '');

	// check if the last character is a k or m
	const lastChar = views[views.length - 1];

	// if the last character is a k then multiply the number by 1000
	if (lastChar === 'K') {
		views = views.slice(0, views.length - 1);
		views = Number(views) * 1000;
	}

	// if the last character is an m then multiply the number by 1000000
	if (lastChar === 'M') {
		views = views.slice(0, views.length - 1);
		views = Number(views) * 1000000;
	}

	// get the genreList from pocketbase and return the id every genre that has the same name as the genre in the manga data.author array
	let genreIds: any = [];
	let authorIds: any = [];

	//make a function that makes length characters long hash. and use that as the id for the manga
	export function makeId(length: number, characters: string) {
		let result = '';

		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	} // the answer from this function will always be length characters long, and if the input is the same, the output will be the same too because the function is deterministic

	async function createRecord() {
		// create the manga data to send to pocketbase
		const pbData = {
			id: makeId(15, $page.params.id),
			title: data.title,
			description: data.description,
			img: $page.url.origin + '/api' + data.img,
			updated: data.lastUpdated,
			views,
			latestChapter: data.episodes[data.episodes.length - 1].chapterTitle,
			sourceid: $page.params.id,
			genres: genreIds,
			authors: authorIds,
			src: $page.url.href
		};

		// if the user is logged in, send the manga data to pocketbase
		if (pb.authStore.isValid) {
			for (let i = 0; i < data.author.length; i++) {
				const genreList = await getPocketbase('genres', {
					filter: `name="${data.author[i]}"`
				});

				if (genreList.items.length === 0) {
					//now we have all the genres that are not in the database
					//that means they are authors
					//so we need to create them in the database
					const createdManga = await postPocketbase('author', {
						id: makeId(15, data.author[i]),
						name: data.author[i]
					});
					authorIds.push(createdManga?.id);
				} else {
					genreIds.push(genreList.items[0].id);
				}
			}
			await postPocketbase('mangas', pbData);
		}
	}
</script>

<div class="w-full flex flex-col md:flex-row gap-4">
	<!-- manga image -->
	<div class="w-full md:w-1/5 h-full">
		<img class="w-full h-auto object-cover rounded-lg" src={imageSrc} alt={data.title} />
	</div>

	<!-- manga info -->
	<div class="w-full md:w-1/2 p-4 border rounded-lg shadow-md">
		<h2 class="text-xl font-bold mb-2">{data.title}</h2>
		<p class="mb-4">{data.description}</p>
		<a
			class="btn btn-primary"
			href={`${$page.url.pathname}/${data.episodes[data.episodes.length - 1].chapterId}`}
		>
			<button on:click={createRecord}>Read First</button>
		</a>
		<a class="btn btn-primary" href={`${$page.url.pathname}/${data.episodes[0].chapterId}`}>
			<button on:click={createRecord}>Read Latest</button>
		</a>
	</div>

	<!-- manga stats -->
	<div class="  p-4 border rounded-lg shadow-md">
		<h2 class="text-xl font-bold mb-2">Manga Stats</h2>
		<div class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<span class="font-bold">Author:</span>

				<span>{data.author[0]}</span>
			</div>
			<div class="flex flex-col">
				<span class="font-bold">Genres:</span>
				{#each data.author.slice(1) as genre}
					<span>{genre}</span>
				{/each}
			</div>
			<div class="flex flex-col">
				<span class="font-bold">Artist:</span>
				<span>{data.artist}</span>
			</div>
			<div class="flex flex-col">
				<span class="font-bold">Views:</span>
				<span>{data.views}</span>
			</div>

			<div class="flex flex-col">
				<span class="font-bold">Last Updated:</span>
				<span>{data.lastUpdated}</span>
			</div>
		</div>
	</div>
</div>
