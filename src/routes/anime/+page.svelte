<script>
	import { Breadcrumbs } from '@valiantlynx/svelte-ui';
	import { page } from '$app/stores';
	import { ContentCardImage } from '@valiantlynx/svelte-ui';
	import AnimevariantGridAds from '$lib/components/AnimevariantGridAds.svelte';
	import { onMount } from 'svelte';
  
	let pageNO = $page.data.pageNo;
	let animeList = $page.data.popularAnimeList;
	
	const crumbs = [
	  { name: 'Home', url: '/' },
	  { name: 'Anime', url: '/anime' }
	];
  
	let server;
  
	onMount(() => {
	  server = localStorage.getItem('selectedServer') || '';
	});
  
	// Update page number and reload data
	function changePage(newPage) {
	  pageNO = newPage;
	  window.location.href = `?page=${newPage}`;
	}
  </script>
  
  <div class="mx-auto px-4">
	<Breadcrumbs {crumbs} />
  
	<main class="bg-base-200 mb-4 border border-primary">
	  <h2 class="text-2xl font-bold text-start bg-primary rounded-b-lg text-primary-content">
		<i class="fa fa-fire-alt mx-4"></i>
		Popular Anime - Page {pageNO}
	  </h2>
  
	  <div class="mx-auto container gap-y-6 gap-x-4 px-4">
		{#each animeList as anime}
		  <ContentCardImage 
			link={`/anime/${anime.id}?server=${server}`}
			img={anime.image}
			alt={anime.title || ''}
			label1={anime.authors?.[0] || "No author"}
			label2={anime.episode_number || ''}
			title={anime.title || ''}
		  >
			<div class="rating rating-sm">
			  <label class="cursor-auto text-secondary">{anime.rating}</label>
			  <input type="radio" name="rating-8" class="mt-1 mask mask-star-2 bg-info" checked />
			</div>
		  </ContentCardImage>
		{/each}
	  </div>
  
	  <!-- Custom Pagination -->
	  <div class="pagination-container flex justify-center mt-4 mb-8">
		<button on:click={() => changePage(pageNO - 1)} disabled={pageNO <= 1} class="btn btn-primary">
		  Previous
		</button>
		<span class="mx-4">Page {pageNO}</span>
		<button on:click={() => changePage(pageNO + 1)} class="btn btn-primary">
		  Next
		</button>
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
  