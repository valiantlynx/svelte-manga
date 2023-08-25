<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';
	import ScrollToTop from '$lib/components/ScrollToTop.svelte';
	import LongstripReadingMode from '$lib/components/LongstripReadingMode.svelte';
	import GridReadingMode from '$lib/components/GridReadingMode.svelte';
	import PaginatedReadingMode from '$lib/components/PaginatedReadingMode.svelte';
	import Chat from '$lib/components/Chat.svelte';
	export let data: PageData;

	let readingMode = 'longstrip'; // Default reading mode
	let imageWidth = 'medium'; // Default image width mode
	let currentPage = writable(0);
	let chaptersToShow: any = [];

	onMount(() => {
		chaptersToShow = JSON.parse(window.localStorage.getItem('chaptersToShow') || '[]');
	});

	function setReadingMode(mode: string) {
		readingMode = mode;
		currentPage.set(0); // Reset current page when switching reading modes
	}

	function setImageWidth(mode: string) {
		imageWidth = mode;
		currentPage.set(0); // Reset current page when switching reading modes
	}
	function goToPreviousChapter() {
		const currentChapterIndex = chaptersToShow.findIndex(
			(chapter: any) => chapter.chapterId === $page.params.chapterid
		);

		console.log('currentChapterIndex: ' + currentChapterIndex);

		if (currentChapterIndex < chaptersToShow.length - 1) {
			const url =
				$page.url.origin +
				'/manga/' +
				$page.params.id +
				'/' +
				chaptersToShow[currentChapterIndex + 1].chapterId;
			window.location.href = url;
		}
	}

	function goToNextChapter() {

		const currentChapterIndex = chaptersToShow.findIndex(
			(chapter: any) => chapter.chapterId === $page.params.chapterid
		);

		

		if (currentChapterIndex < chaptersToShow.length - 1) {
			const url =
				$page.url.origin +
				'/manga/' +
				$page.params.id +
				'/' +
				chaptersToShow[currentChapterIndex - 1].chapterId;
			window.location.href = url;
		}
	}
</script>

<main class="bg-base-100">
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
	<div class="flex justify-center space-x-4">
		<button class="px-4 py-2 rounded-lg btn btn-primary" on:click={goToPreviousChapter}>
			Previous Chapter
		</button>
		<button class="px-4 py-2 rounded-lg btn btn-primary" on:click={goToNextChapter}>
			Next Chapter
		</button>
	</div>
	<ScrollToTop />
	<Chat />
</main>
