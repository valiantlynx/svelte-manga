<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import MangaGrid from '$lib/components/MangaGrid.svelte';

	export let data: any;
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

<h1 class="text-2xl font-bold text-center mb-6">Manga List</h1>
<Breadcrumbs {crumbs} />
<MangaGrid {data} />
