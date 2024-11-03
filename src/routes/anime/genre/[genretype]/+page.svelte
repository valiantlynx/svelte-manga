<script>
  import {Breadcrumbs} from '@valiantlynx/svelte-ui';
  import { page } from '$app/stores';
  import {ContentCardImage} from '@valiantlynx/svelte-ui';
  import PaginationSimple from '$lib/components/PaginationSimple.svelte';
  import AnimevariantGridAds from '$lib/components/AnimevariantGridAds.svelte';
  import { onMount } from 'svelte';

  let genretype = $page.params.genretype;
  let pageNO = 1;
  let animeList = $page.data.genreList

  const crumbs = [
		{
			name: 'Home',
			url: '/'
		},
    {
			name: 'Anime',
			url: '/anime'
		},
		{
			name: 'Genre List',
			url: '/anime/genre-list'
		},
		{
			name: `${genretype}`,
			url: `/anime/genre/${genretype}`
		}
	];

  let server;

  onMount(()=>{
    server = localStorage.getItem('selectedServer') || '';
    
});
</script>

<div class="mx-auto px-4">
  <Breadcrumbs {crumbs} />
 
<main class="bg-base-200 mb-4 border border-primary">
	<h2 class="text-2xl font-bold text-start  bg-primary rounded-b-lg text-primary-content">
		<i class="fa fa-fire-alt mx-4"></i>
		{genretype} Anime - Page {pageNO}
	</h2>
	<div class="col-span-full flex justify-end w-full px-4">
		<PaginationSimple action="?/latest" disabled={!animeList} />
	</div>
	<div class="mx-auto container gap-y-6 gap-x-4 px-4">
		{#each (animeList) as anime}
		
			<ContentCardImage 
				link={$page.url.origin + '/anime/' + (anime.id ? anime.id : '') + '?server=' + (server ? server : '')}
				img={anime.image}
				alt={anime.title ? anime.title : ''}
				label1={(anime.authors && anime.authors[0]) ? anime.authors[0] : "No author"}
				label2={anime.episode_number ? anime.episode_number : ''}
				title={anime.title ? anime.title : ''}
			 >
				<div class="rating rating-sm">
					<label class="cursor-auto text-secondary" for="rating-8">{anime.rating}</label>
					<input type="radio" name="rating-8" class="mt-1 mask mask-star-2 bg-info" checked />
				</div>
			</ContentCardImage>
		{/each}
	</div>
	<div class="col-span-full flex justify-end w-full px-4">
		<PaginationSimple action="?/latest" disabled={!animeList} />
	</div>
	<AnimevariantGridAds />
</main>
</div>



<style>
	.container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
	}
</style>
