<script lang="ts">
	import { page } from '$app/stores';
	import MangaCard from '$lib/components/MangaCard.svelte';

	export let data: any;
	let pageNo = 1;

	// send the user to the manga chapters page
	function goToMangaChapters(id: any) {
		window.location.href = $page.url.origin + '/manga/' + id;
	}

	// function to get the data from the url
	const newData = async (pageNo: number) => {
		const url = import.meta.env.VITE_HOST_URL + `/api/manga?page=${pageNo}`;
		const res = await fetch(url);
		const data = await res.json();
		return data;
	};

	function nextPage() {
		pageNo = pageNo + 1;
	}

	function previousPage() {
		if (pageNo > 1) {
			pageNo = pageNo - 1;
		}
	}
</script>

<main class="p-4 bg-base-100">
	{#await newData(pageNo)}
		<p>loading...</p>
	{:then data}
		<div
			class="w-fit mx-auto grid grid-cols-2 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 justify-items-center justify-center gap-y-6 gap-x-4 mt-10 mb-5"
		>
			{#each data.mangas as manga}
				<MangaCard {manga} {goToMangaChapters} />
			{/each}
		</div>
	{:catch error}
		<p>error: {error.message}</p>
	{/await}

	<div class="flex justify-center">
		<div class="join grid grid-cols-2 w-1/4">
			<button class="join-item btn btn-outline" on:click={previousPage} disabled={pageNo === 1}>
				Previous Page {pageNo - 1}
			</button>
			<button class="join-item btn btn-outline" on:click={nextPage} disabled={!data}>
				Next Page {pageNo + 1}
			</button>
		</div>
	</div>
</main>
