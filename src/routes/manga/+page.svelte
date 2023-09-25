<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import MangaGrid from '$lib/components/MangaGrid.svelte';
	import JoinDiscord from '$lib/components/JoinDiscord.svelte';
	import ReadingProgress from '$lib/components/ReadingProgress.svelte';
	import ResponsiveBannerAd from '$lib/components/ResponsiveBannerAd.svelte';

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
<div class="flex flex-wrap justify-center">
	<MangaGrid {data} />

	<div class="mt-4 w-full lg:w-1/4">
		<ResponsiveBannerAd />
		<JoinDiscord />
		<ReadingProgress />
	</div>
</div>
