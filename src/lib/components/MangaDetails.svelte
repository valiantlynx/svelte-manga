<script lang="ts">
	import { page } from '$app/stores';
	import { postPocketbase, pb, getPocketbase } from '$lib/utils/api';
	import PersonalRating from '$lib/components/PersonalRating.svelte';
	import HowToRate from '$lib/components/HowToRate.svelte';
	import Share from '$lib/components/share/Share.svelte';
	import { patchPocketbase } from '$lib/utils/api';
	let {VITE_PUBLIC_API} = import.meta.env

	let data = $page.data.manga;

	const imageSrc = `${VITE_PUBLIC_API}/api${data.img}?`;
	let views = data.views;
	// get the genreList from pocketbase and return the id every genre that has the same name as the genre in the manga data.author array
	let genreIds: any = [];
	let authorIds: any = [];
	let pbMangaData: any = {};

	async function createOrUpdateReadingProgress(mangaId: string, chapterId: string) {
		// Check if the user is logged in
		if ($page.data.user) {
			const userId = $page.data.user?.id;

			// First, check if a reading progress record already exists for this manga and user
			const existingProgressList = await getPocketbase('reading_progress', {
				filter: `user="${userId}" && manga="${mangaId}"`
			});

			// If a reading progress record doesn't exist, create it
			if (existingProgressList.items.length === 0) {
				const pbData = {
					user: `${userId}`, // This is the user id, not the username
					manga: `${mangaId}`, // This is the manga id, not the manga title
					currentChapter: `${chapterId}`
				};
				await postPocketbase('reading_progress', pbData);
			} else {
				// If a reading progress record exists, update the current chapter
				const readingProgressId = existingProgressList.items[0].id;
				const data = {
					currentChapter: `${chapterId}`
				};
				await pb.collection('reading_progress').update(readingProgressId, data);
			}
		}
	}

	async function createRecord() {
		// if the user is logged in, send the manga data to pocketbase
		if ($page.data.user) {
			// Check if the manga already exists using some unique identifier, for example, the title
			const existingMangaList = await getPocketbase('mangas', {
				filter: `title="${data.title}"`
			});
			pbMangaData = existingMangaList.items[0];

			if (existingMangaList.items.length === 0) {
				// Manga doesn't exist, create it
				for (let i = 0; i < data.authors.length; i++) {
					const genreList = await getPocketbase('genres', {
						filter: `name="${data.authors[i]}"`
					});

					if (genreList.items.length === 0) {
						const createdAuthor = await postPocketbase('author', {
							name: `${data.authors[i]}`
						});

						authorIds.push(createdAuthor.id);
					} else {
						genreIds.push(genreList.items[0].id);
					}
				}

				// create the manga data to send to pocketbase
				const pbData = {
					title: data.title,
					description: data.description,
					img: data.img,
					updated: data.lastUpdated,
					views,
					latestChapter: data.chapters[0].chapterTitle,
					sourceid: $page.params.id,
					genres: genreIds,
					authors: authorIds,
					src: $page.url.href
				};
				const mangaRes = await postPocketbase('mangas', pbData);
				pbMangaData = mangaRes;

				// Call the function to create or update the reading progress
				await createOrUpdateReadingProgress(mangaRes.id, data.chapters[0].chapterId);
			} else {
				// Call the function to create or update the reading progress
				await createOrUpdateReadingProgress(
					existingMangaList.items[0].id,
					data.chapters[0].chapterId
				);
			}
		}
	}

	let continueFromLastReading = false;
	let continueReadingUrl: any = '';
	let progress: any = {};
	// if the user is logged in, check if the reading progress record exists, if it does make a continue reading button
	async function continueReading() {
		const existingMangaList = await getPocketbase('mangas', {
			filter: `title="${data.title}"`
		});
		pbMangaData = existingMangaList.items[0];

		if ($page.data.user) {
			const userId = $page.data.user?.id;

			// First, check if a reading progress record already exists for this manga and user
			const existingProgressList: any = await getPocketbase('reading_progress', {
				filter: `user="${userId}" && manga="${pbMangaData?.id}"`,
				expand: 'currentChapter'
			});

			// If a reading progress record doesn't exist, create it
			if (existingProgressList.items.length > 0) {
				// If a reading progress record exists, update the current chapter
				continueReadingUrl = existingProgressList.items[0].expand?.currentChapter.src;

				progress = existingProgressList.items[0];

				continueFromLastReading = true;
			}
		}
	}

	continueReading();

		// Function to handle radio button change
	async function handleRatingChange(event: any) {
		const selectedValue = parseFloat(event.target.value);
		progress.rating = selectedValue;

		const pbData = {
			rating: progress.rating
		};
		await patchPocketbase('reading_progress', progress.id, pbData);
	}

			// Function to handle radio button change
		async function handleRatingChangeGlobal(event: any) {
			const selectedValue = parseFloat(event.target.value);
			console.log("comming soon", selectedValue)
	}
</script>

<div class="w-full flex flex-col md:flex-row gap-4">
	<!-- manga image -->
	<div class="w-full md:w-1/5 h-full">
		<a href={`${$page.url.pathname}/${data.chapters[data.chapters.length - 1].chapterId}`}>
			<img
				class="w-full h-auto object-cover rounded-lg border border-primary"
				src={imageSrc}
				alt={data.title}
			/>
		</a>
	</div>

	<!-- manga info -->
	<div class="w-full md:w-1/2 p-4 border border-primary rounded-lg shadow-md">
		<h2 class="text-xl font-bold mb-2">{data.title}</h2>
		<p class="mb-4">{data.description}</p>
		<a
			class="btn btn-primary"
			href={`${$page.url.pathname}/${data.chapters[data.chapters.length - 1].chapterId}`}
		>
			<button on:click={createRecord}>Read First</button>
		</a>
		<a class="btn " href={`${$page.url.pathname}/${data.chapters[0].chapterId}`}>
			<button on:click={createRecord}>Read Latest</button>
		</a>
		<div class="relative">
			{#if !$page.data.user}
				<!-- Not logged in overlay -->
				<div class="absolute inset-0 flex items-center justify-center ">
					<div class="bg-base-300 text-base-content z-10 p-4 rounded-lg shadow-md text-center">
						<p class="text-lg font-bold mb-4">
							Login for free to unlock auto reading-progress tracker feature:
						</p>
						<a href="/login" class="btn btn-secondary">Login</a>
					</div>
				</div>
			{/if}
			{#if $page.data.user}
				<!-- logged in stats -->
				<div class="mt-4 p-4 border border-primary rounded-lg shadow-md">
					<h2 class="text-xl font-bold mb-2">Logged in as {$page.data.user?.username}</h2>
					<div class="grid grid-cols-2 gap-4">
						{#if continueFromLastReading}
							<a class="btn btn-primary animate-bounce" href={`${continueReadingUrl}`}>
								<button>Continue Reading</button>
							</a>
						{:else}
							<p class="text-error font-bold mb-4">
								You haven't started reading this manga yet. Read at least one chapter to start
								tracking your reading progress.
							</p>
						{/if}
						<div class="flex flex-col">
							<span class="font-bold">Current:</span>

							<span>{progress.expand?.currentChapter.chapterId}</span>
						</div>
						<div class="flex flex-col">
							<PersonalRating bind:progress {handleRatingChange}>
								<span class="font-bold" slot="title">Personal rating:</span>
								<HowToRate />
							</PersonalRating>
						</div>
						<div class="flex flex-col">
							<span class="font-bold">Status:</span>
							<span>{progress.status}</span>
						</div>
						<div class="flex flex-col">
							<span class="font-bold">Completed:</span>
							<span>{progress.completed}</span>
						</div>
						<div class="flex flex-col">
							<span class="font-bold">Started:</span>
							<span>{progress.started}</span>
						</div>
					</div>
				</div>
			{:else}
				<!-- logged out stats -->
				<div
					class="mt-4 p-4 border border-primary rounded-lg shadow-md text-success bg-opacity-90 blur-sm"
				>
					<h2 class="text-xl font-bold mb-2">Logged in as {$page.data.user?.username}</h2>
					<div class="grid grid-cols-2 gap-4">
						{#if continueFromLastReading}
							<a class="btn btn-primary animate-bounce" href={`${continueReadingUrl}`}>
								<button>Continue Reading</button>
							</a>
						{/if}
						<div class="flex flex-col">
							<span class="font-bold">Current:</span>

							<span>{progress.expand?.currentChapter.chapterId}</span>
						</div>


						<div class="flex flex-col">
							<span class="font-bold">Status:</span>
							<span>{progress.status}</span>
						</div>
						<div class="flex flex-col">
							<span class="font-bold">Completed:</span>
							<span>{progress.completed}</span>
						</div>
						<div class="flex flex-col">
							<span class="font-bold">Started:</span>
							<span>{progress.started}</span>
						</div>
						<div class="flex flex-col">
							<PersonalRating bind:progress={data} handleRatingChange={handleRatingChangeGlobal}>
								<span class="font-bold" slot="title">Rating:</span>
								HowToRate
							</PersonalRating>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>

	<!-- manga stats -->
	<div class="  p-4 border border-primary rounded-lg shadow-md">
		<h2 class="text-xl font-bold mb-2">Manga Stats</h2>
		<div class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<span class="font-bold">Author:</span>

				<span>{data.authors[0]}</span>
			</div>
			<div class="flex flex-col">
				<span class="font-bold">Genres:</span>
				{#each data.genres as genre}
					<span>{genre}</span>
				{/each}
			</div>
			<div class="flex flex-col w-11">
				<PersonalRating bind:progress={data} handleRatingChange={handleRatingChangeGlobal}>
					<span class="font-bold" slot="title">Rating:</span>
					HowToRate
				</PersonalRating>
			</div>

			<div class="flex flex-col">
				<span class="font-bold">Artist:</span>
		
			</div>

			<div class="flex flex-col">
				<span class="font-bold">Views:</span>
				<span>{data.views}</span>
			</div>
			


			<div class="flex flex-col">
				<span class="font-bold">Last Updated:</span>
				<span>{data.lastUpdated}</span>
			</div>



			<div class="flex flex-col">
				<span class="font-bold">Share this manga:</span>
				<Share
		title={data.title}
		url={$page.url.href}
		text={data.description}
		image={imageSrc}
		hashtags="manga"

	 />
	 </div>
		</div>
	</div>


</div>
