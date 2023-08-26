<script lang="ts">
	import { page } from '$app/stores';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import MangaCard from '$lib/components/MangaCard.svelte';

	export let data: any;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	let { pageNo } = $page.params;

	// send the user to the manga chapters page
	function goToMangaChapters(id: any) {
		window.location.href = $page.url.origin + '/manga/' + id;
	}

	const crumbs = [
		{
			name: 'Home',
			url: '/'
		},
		{
			name: 'Manga',
			url: '/manga'
		}
	];

	const mangaTitles = data.mangas.map((manga: any) => manga.title).join(', ');
</script>

<svelte:head>
	<title>Manga List</title>
	<meta
		name="keywords"
		content={`manga, manga list, read manga, manga online, manga reader, manga website ${mangaTitles}`}
	/>
	<meta
		name="description"
		content="browse through an unlimited list of manga. Read manga online for free at animevariant with no ads, high quality images and support scanlation groups!"
	/>
</svelte:head>

<main class="p-4 bg-base-100">
	<Breadcrumbs {crumbs} />
	<h1 class="text-2xl font-bold text-center mb-6">Manga List</h1>
	<div
		class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
	>
		{#each data.mangas as manga}
			<MangaCard {manga} {goToMangaChapters} />
		{/each}
	</div>
</main>
