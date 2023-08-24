<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;
	let { pageNo } = $page.params;

	// send the user to the manga chapters page
	function goToMangaChapters(id: any) {
		window.location.href = $page.url.origin + '/manga/' + id;
	}
</script>

<main class="p-4 bg-gray-100">
	<h1 class="text-2xl font-bold text-center mb-6">Manga List</h1>

	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
		{#each data.mangas as manga}
			<div class="relative group">
				<button
					class="bg-white shadow-md p-4 text-center transition-transform transform-gpu hover:-translate-y-1 rounded-lg"
					on:click={() => goToMangaChapters(manga.id)}
					on:keypress={() => goToMangaChapters(manga.id)}
				>
					<div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg bg-gray-200">
						<img
							class="h-full w-full object-cover object-center group-hover:opacity-75"
							src={`${import.meta.env.VITE_IMAGE_URL}${manga.img}`}
							alt={manga.title}
						/>
					</div>
					<h2 class="text-lg font-bold mt-3">{manga.title}</h2>
					<p class="text-gray-500 text-sm line-clamp-3 mt-2">{manga.description}</p>
				</button>
				<button
					class="hidden group-hover:block absolute inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center"
					on:click={() => goToMangaChapters(manga.id)}
					on:keypress={() => goToMangaChapters(manga.id)}
					aria-label="View Manga"
				>
					<div class="max-w-lg p-4 rounded-lg bg-white shadow-lg">
						<h2 class="text-xl font-bold mb-2">{manga.title}</h2>
						<p class="text-gray-500 mb-4">{manga.description}</p>
						<button class="btn btn-primary">Read More</button>
					</div>
				</button>
			</div>
		{/each}
	</div>
</main>
