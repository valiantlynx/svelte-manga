<script lang="ts">
	import type { PageData } from './$types';
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';
	import ScrollToTop from '$lib/components/ScrollToTop.svelte';
	import LongstripReadingMode from '$lib/components/LongstripReadingMode.svelte';
	import GridReadingMode from '$lib/components/GridReadingMode.svelte';
	import PaginatedReadingMode from '$lib/components/PaginatedReadingMode.svelte';
	import Chat from '$lib/components/Chat.svelte';
	import { goto } from '$app/navigation';

	export let data: PageData;

	let readingMode = 'longstrip'; // Default reading mode
	let imageWidth = 'medium'; // Default image width mode
	let currentPage = writable(0);

	// filter  all hte data.chapters.value that starts with '\n
	data.chapters = data.chapters.filter((chapter: any) => chapter.value.startsWith('/'));
	console.log('data.chapters: ', data);

	const currentChapterIndex = data.chapters.findIndex(
		(chapter: any) => chapter.value === $page.url.pathname?.replace('/manga', '')
	);

	console.log('page: ', $page);

	function setReadingMode(mode: string) {
		readingMode = mode;
		currentPage.set(0); // Reset current page when switching reading modes
	}

	function setImageWidth(mode: string) {
		imageWidth = mode;
		currentPage.set(0); // Reset current page when switching reading modes
	}
	function goToPreviousChapter() {
		if (currentChapterIndex > 0) {
			// Use > 0 instead of < data.chapters.length - 1
			const url = $page.url.origin + '/manga' + data.chapters[currentChapterIndex + 1].value; // Use - 1
			window.location.href = url;
		}
	}

	function goToNextChapter() {
		if (currentChapterIndex < data.chapters.length - 1) {
			const url = $page.url.origin + '/manga' + data.chapters[currentChapterIndex - 1].value; // Use + 1
			window.location.href = url;
		}
	}
</script>

<main class="bg-base-100">
	currentChapterIndex === data.chapters.length
	<h1 class="text-3xl font-bold mb-6 text-center">{data.title} {$page.params.chapterid}</h1>

	<!-- Reading Mode Selection -->
	<div class="mb-4 flex justify-center space-x-4">
		<button
			class="px-4 py-2 rounded-lg btn btn-primary"
			class:selected={readingMode === 'longstrip' ? 'bg-blue-500 text-white' : ''}
			on:click={() => setReadingMode('longstrip')}
		>
			Long Strip
		</button>

		<button
			class="px-4 py-2 rounded-lg btn btn-primary"
			class:selected={readingMode === 'grid' ? 'bg-blue-500 text-white' : ''}
			on:click={() => setReadingMode('grid')}
		>
			Grid
		</button>
		<button
			class="px-4 py-2 rounded-lg btn btn-primary"
			class:selected={readingMode === 'paginated' ? 'bg-blue-500 text-white' : ''}
			on:click={() => setReadingMode('paginated')}
		>
			Paginated
		</button>
	</div>

	<!-- Images width selection between full or medium -->
	<div class="mb-4 flex justify-center space-x-4">
		<button
			class="px-4 py-2 rounded-lg btn btn-primary"
			class:selected={imageWidth === 'full' ? 'bg-blue-500 text-white' : ''}
			on:click={() => setImageWidth('full')}
		>
			Full
		</button>

		<button
			class="px-4 py-2 rounded-lg btn btn-primary"
			class:selected={imageWidth === 'medium' ? 'bg-blue-500 text-white' : ''}
			on:click={() => setImageWidth('medium')}
		>
			Medium
		</button>
	</div>

	<!-- Images Display -->
	{#if readingMode === 'longstrip'}
		<LongstripReadingMode {data} {imageWidth} />
	{/if}

	{#if readingMode === 'grid'}
		<GridReadingMode {data} />
	{/if}

	{#if readingMode === 'paginated'}
		<PaginatedReadingMode {data} />
	{/if}

	<!-- Previous and Next Chapter Buttons -->
	<div class="flex justify-center space-x-4 m-4">
		<button
			class="px-4 py-2 rounded-lg btn btn-primary"
			disabled={currentChapterIndex === data.chapters.length - 1}
			on:click={goToPreviousChapter}
		>
			Previous Chapter
		</button>
		{#if currentChapterIndex === 0}
			<button
				class="px-4 py-2 rounded-lg btn btn-primary"
				on:click={() => goto(`/manga/${$page.params.id}`)}
			>
				Manga Details
			</button>
		{:else}
			<button
				class="px-4 py-2 rounded-lg btn btn-primary"
				disabled={currentChapterIndex === 0}
				on:click={goToNextChapter}
			>
				Next Chapter
			</button>
		{/if}
	</div>
	<ScrollToTop />
	<Chat />
</main>
