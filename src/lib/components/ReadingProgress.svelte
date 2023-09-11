<!-- ReadingProgress.svelte -->

<script lang="ts">
	import { pb, getPocketbase } from '$lib/utils/api';
	import { onMount } from 'svelte';

	let readingProgress: any = [];

	onMount(async () => {
		if (pb.authStore.isValid) {
			const data = {
				sort: '-updated',
				filter: `user="${pb.authStore.model?.id}"`,
				expand: 'manga, currentChapter, user'
			};
			const res = await getPocketbase('reading_progress', data);
			readingProgress = res.items;
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
</script>

<div class="bg-base-100 rounded-lg p-4 shadow-md">
	<h2 class="text-2xl font-bold text-center mb-6 bg-neutral rounded-lg text-neutral-content">
		Your Reading Progress
	</h2>

	{#if pb.authStore.isValid}
		{#if readingProgress.length != 0}
			<!-- Individual Chapters -->
			<ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{#each readingProgress as chapter (chapter.id)}
					<!-- Manga Card -->
					<li class="bg-base-200 rounded-lg p-4 shadow-md">
						<a href={`${chapter.expand?.currentChapter?.src}`} class=" hover:underline">
							<!-- Manga Cover Image -->
							<div class="flex items-center mb-2">
								<img
									src={chapter.expand?.manga?.img}
									alt={chapter.expand?.manga?.title}
									class="w-1/2 h-auto mr-4 rounded"
								/>
								<div>
									<p class=" font-bold text-lg">
										{chapter.expand?.manga?.title}
									</p>
									<p class="">
										Current Chapter - {chapter.currentChapterIndex + 1}/{chapter.totalChapters || 1}
									</p>
									<p class="">
										Last Read On - {chapter.updated}
									</p>
									<p class="">
										Views - {chapter.expand?.manga?.views}
									</p>
									<!-- Progress Bar -->
									<div class="flex items-center justify-between">
										<p class=" font-bold">Progress</p>
									</div>
									<div class="relative pt-1">
										<div class="flex mb-2 items-center justify-between">
											<div>
												<span
													class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-accent"
												>
													Reading
												</span>
											</div>
											<div class="text-right">
												<span class="text-xs font-semibold inline-block text-accent">
													{calculateProgressPercentage(chapter).toFixed(2)}%
												</span>
											</div>
										</div>
										<div class="flex h-2 mb-2 overflow-hidden text-xs bg-blue-200 rounded">
											<div
												style={`width:${calculateProgressPercentage(chapter)}%`}
												class="shadow-none flex flex-col text-center whitespace-nowrap justify-center bg-warning"
											/>
										</div>
									</div>
								</div>
							</div>
						</a>
					</li>
				{/each}
			</ul>
		{:else}
			<p class="text-accent hover:underline mb-4 font-bold text-center">
				You have no reading progress.
			</p>
		{/if}
	{:else}
		<a href="/login" class="text-accent hover:underline mb-4 font-bold">
			Log In to View Reading Progress
		</a>
	{/if}
</div>
