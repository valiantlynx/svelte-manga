<!-- ReadingProgress.svelte -->

<script lang="ts">
	import { pb, getPocketbase } from '$lib/utils/api';
	import { onMount, setContext } from 'svelte';
	import Icon from '@iconify/svelte';
	import { writable } from 'svelte/store';

	// Create a writable store to hold readingProgress data
	const readingProgressStore: any = writable([]);

	let pageNo = 1;
	const itemsPerPage = 20;

	// Set the context to make the store available to child components
	setContext('readingProgress', readingProgressStore);

	onMount(async () => {
		if (pb.authStore.isValid) {
			loadReadingProgress();
		}
	});

	// Calculate the progress percentage for each manga
	function calculateProgressPercentage(chapter: any) {
		const totalChapters = chapter.totalChapters || 1;
		const progressPercentage =
			((totalChapters - chapter.currentChapterIndex) / totalChapters) * 100;

		// Ensure the progress percentage is within the range [0, 100]
		return Math.min(100, Math.max(0, progressPercentage));
	}

	// Function to load reading progress based on pageNo
	async function loadReadingProgress() {
		const data = {
			sort: '-updated',
			filter: `user="${pb.authStore.model?.id}"`,
			expand: 'manga, currentChapter, user',
			page: pageNo
		};

		try {
			const res: any = await pb.collection('reading_progress').getList(1, itemsPerPage, data);
			readingProgressStore.set(res.items);
			console.log('Reading progress loaded successfully');
		} catch (error) {
			console.error('Error fetching reading progress:', error);
		}
	}

	console.log(readingProgressStore);

	// Function to go to the next page
	function nextPage() {
		pageNo++;
		loadReadingProgress();
	}

	// Function to go to the previous page
	function prevPage() {
		pageNo--;
		loadReadingProgress();
	}
</script>

<div class="bg-gradient-to-b from-secondary to-base-200 py-8 w-full">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 text-secondary-content">
		<h2 class="text-3xl font-semibold  text-center mb-8">Your Reading Progress</h2>

		<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
			{#if pb.authStore.isValid}
				{#if $readingProgressStore.length != 0}
					<!-- Individual Chapters -->
					{#each $readingProgressStore as chapter (chapter.id)}
						<!-- Manga Card -->
						<div class=" rounded-lg shadow-md overflow-hidden">
							<a href={`${chapter.expand?.currentChapter?.src}`} class="hover:underline">
								<!-- Manga Cover Image -->
								<img
									src={chapter.expand?.manga?.img}
									alt={chapter.expand?.manga?.title}
									class="w-full h-48 object-cover"
								/>
								<div class="p-4">
									<h5 class="text-lg font-semibold truncate">
										{chapter.expand?.manga?.title}
									</h5>
									<p class="text-sm">
										{chapter.expand?.currentChapter?.chapterId}/{chapter.totalChapters || 1}
									</p>
									<!-- Progress Bar -->
									<div class="flex items-center justify-between mt-2">
										<p class="font-semibold text-info">Progress</p>
										<span class="text-sm font-semibold text-neutral">
											{calculateProgressPercentage(chapter).toFixed(2)}%
										</span>
									</div>
									<div class="mt-2">
										<div class="bg-accent h-2 rounded-full">
											<div
												style={`width:${calculateProgressPercentage(chapter)}%`}
												class="bg-info h-2 rounded-full"
											/>
										</div>
									</div>
								</div>
							</a>
						</div>
					{/each}
					<!-- Pagination -->
					<div class="col-span-full flex justify-center mt-8">
						{#if pageNo > 1}
							<button
								class="px-4 py-2 text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-600 mr-4"
								on:click={prevPage}
							>
								Previous
							</button>
						{/if}
						{#if $readingProgressStore.length === itemsPerPage}
							<button
								class="px-4 py-2 text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-600"
								on:click={nextPage}
							>
								Next
							</button>
						{/if}
					</div>
				{:else}
					<p class="text-center text-white text-xl mt-4">You have no reading progress.</p>
				{/if}
			{:else}
				<a
					href="/login"
					class="text-center text-white text-xl mt-4 font-semibold hover:underline block"
				>
					Log In to View Reading Progress
				</a>
			{/if}
		</div>
	</div>
</div>
