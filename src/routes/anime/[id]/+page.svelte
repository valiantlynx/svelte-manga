<script lang="ts">
	import { page } from '$app/stores';
	import {Breadcrumbs} from '@valiantlynx/svelte-ui';
	import Feedback from '$lib/components/feedback/Feedback.svelte';

	let data = $page.data.anime;

	let { id } = $page.params;

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
			name: data.title,
			url: '/anime/' + id
		}
	];

	// get every sentence and word in the description. into an array. so that i can use as keywords
	let description = data.description?.split(' ');
	let descriptionArray: any = [];
	let sentence = '';

	// loop through the description array and add each word to the sentence
	for (let i = 0; i < description?.length; i++) {
		sentence += description[i] + ' ';

		// if the sentence is longer than 50 characters, add it to the array and reset the sentence
		if (sentence.length > 50) {
			descriptionArray.push(sentence);
			sentence = '';
		}
	}

	// if there are any words left in the sentence, add it to the array
	if (sentence.length > 0) {
		descriptionArray.push(sentence);
	}

	// if the last sentence is longer than 50 characters, split it into two sentences
	if (descriptionArray[descriptionArray.length - 1]?.length > 50) {
		let lastSentence = descriptionArray[descriptionArray.length - 1];
		descriptionArray[descriptionArray.length - 1] = lastSentence.slice(0, 50);
		descriptionArray.push(lastSentence.slice(50));
	}

	// if the last sentence is shorter than 50 characters, add the next sentence to it
	if (descriptionArray[descriptionArray.length - 1]?.length < 50) {
		let lastSentence = descriptionArray[descriptionArray.length - 1];
		descriptionArray[descriptionArray.length - 1] =
			lastSentence + descriptionArray[descriptionArray.length];
		descriptionArray.pop();
	}

</script>

<svelte:head>
  <title>{data.title}</title>
  <meta name="description" content={data.summary} />
  <meta property="og:title" content={data.title} />
  <meta property="og:description" content={data.summary} />
  <meta property="og:image" content={data.image} />
  <meta property="og:url" content={$page.url.origin + `/anime/${data.id}`} />
</svelte:head>

<main class="container mx-auto px-4 overflow-hidden text-ellipsis">
  <Breadcrumbs {crumbs} />

  <div class="flex flex-col md:flex-row">
    <div class="md:w-1/3">
      <img src={data.image} alt={data.title} class="w-full h-auto" />
    </div>
    <div class="md:w-2/3 mt-8 md:mt-0 md:ml-8">
      <h1 class="text-3xl font-bold mb-4">{data.title}</h1>
      <div class="mb-4">
        <span class="font-bold">Type:</span> {data.type}
      </div>
      <div class="mb-4">
        <span class="font-bold">Released:</span> {data.released}
      </div>
      <div class="mb-4">
        <span class="font-bold">Status:</span> {data.status}
      </div>
      <div class="mb-4">
        <span class="font-bold">Other Name:</span> {data.other_name}
      </div>
      <div class="mb-4">
        <span class="font-bold">Summary:</span> {data.summary || "No summary available."}
      </div>
    </div>
  </div>

  <div class="mt-8">
    <h2 class="text-2xl font-bold mb-4">Episodes</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {#each Array(Number(data.total_episode)).fill(0) as _, i}
		<a href={`/anime/${$page.params.id}/episode-${i + 1}`}>
			<div class="episode-card">
			<img src={data.image} alt="Episode {i + 1}" class="w-full h-auto" />
			<p>Episode {i + 1}</p>
			</div>
		</a>
      {/each}
    </div>
  </div>
</main>
<Feedback />
