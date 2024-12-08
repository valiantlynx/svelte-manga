<script lang="ts">
	import { page } from '$app/stores';
	import {Breadcrumbs} from '@valiantlynx/svelte-ui';
	import Share from '$lib/components/share/Share.svelte';
	import Chat from '$lib/components/Chat.svelte';
  
	let data = $page.data;
	let episodeData = data.episodeData;
	let details = data.details;
  
	const crumbs = [
	  { name: 'Home', url: '/' },
	  { name: details.title, url: `/anime/${$page.params.id}` },
	  { name: `${$page.params.episodeid}`, url: `/anime/${$page.params.id}/episode/${$page.params.episodeid}` }
	];
  </script>
  
  <svelte:head>
	<title>{details.title} - Episode {$page.params.episodeid} - {$page.url.hostname}</title>
	<meta name="description" content={`Watch ${details.title} Episode ${$page.params.episodeid} online`} />
	<meta property="og:title" content={`${details.title} - Episode ${$page.params.episodeid}`} />
	<meta property="og:description" content={`Watch ${details.title} Episode ${$page.params.episodeid} online`} />
	<meta property="og:image" content={details.image} />
	<meta property="og:url" content={$page.url.href} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={`${details.title} - Episode ${$page.params.episodeid}`} />
	<meta name="twitter:description" content={`Watch ${details.title} Episode ${$page.params.episodeid} online`} />
	<meta name="twitter:image" content={details.image} />
  </svelte:head>
  
  <main class="w-full overflow-hidden text-ellipsis">
	<Breadcrumbs {crumbs} />
  
	<div class="mx-auto px-4 py-8">
	  <h1 class="text-4xl font-bold mb-4">{details.title}</h1>
	  <div class="text-lg mb-4">{details.genres}</div>
  
	  <div class="flex flex-col md:flex-row justify-between items-start space-y-12 md:space-y-0 md:space-x-8">
		<div class="aspect-w-16 aspect-h-9 w-full md:w-2/3">
		  <iframe
			src={episodeData.link}
			title={`${details.title} Episode ${$page.params.episodeid}`}
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
			class="video"
		  ></iframe>
		</div>
  
		<div class="md:w-1/3">
		  <img src={details.image} alt={`Cover of ${details.title}`} class="rounded-lg shadow-lg mb-4" />
		  <div class='space-y-2'>
			<h2 class="text-2xl font-bold">{details.title}</h2>
			<p class="text-sm">{details.othername}</p>
			<p class="">Released: {details.released}, Status: {details.status}</p>
			<p class="">Type: {details.type}</p>
			<p class=" italic">{details.summary || "No summary available."}</p>
		  </div>
		</div>
	  </div>
  
	  <h2 class="text-3xl font-bold mt-8 mb-4">Other Episodes</h2>
	  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
		{#each Array(parseInt(details.total_episode)) as _, i}
		  <a href={`/anime/${$page.params.id}/episode-${i + 1}`} class="group">
			<div class="relative cursor-pointer">
			  <div class="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-70 flex justify-center items-center text-xl font-bold">
				Episode {i + 1}
			  </div>
			  <img
				src={details.image}
				alt={`Episode ${i + 1}`}
				class="w-full h-40 object-cover"
			  />
			</div>
		  </a>
		{/each}
	  </div>
  

	  <div class="mt-8">
		<Share
		  title={`${details.title} Episode ${$page.params.episodeid} - ${$page.url.hostname}`}
		  url={$page.url.href}
		  image={details.image}
		  text={`Watch ${details.title} Episode ${$page.params.episodeid} online`}
		  hashtags="anime, streaming, episodes"
		/>
		<Chat />
	  </div>
	</div>
  </main>
  

  
<style>
	.video {
	  height: 100vh;
	  width: 100%;
	}
</style>
  