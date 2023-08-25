<script lang="ts">
	import { page } from '$app/stores';
	import MangaCard from '$lib/components/MangaCard.svelte';

	export let data: any;
	let { pageNo } = $page.params;

	// send the user to the manga chapters page
	function goToMangaChapters(id: any) {
		window.location.href = $page.url.origin + '/manga/' + id;
	}
</script>

<main class="p-4 bg-base-100">
	<h1 class="text-2xl font-bold text-center mb-6">Home</h1>
	<div
		class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
	>
		{#each data.mangas as manga}
			<MangaCard {manga} {goToMangaChapters} />
		{/each}
	</div>
</main>
