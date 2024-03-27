<script lang="ts">
	import Stars from "$lib/components/stars/Stars.svelte";
	import { pb } from '$lib/utils/api';

	export let progress: any;
	export let handleRatingChange = async function (event: any) {
		const selectedValue = parseFloat(event.target.value);
		progress.rating = selectedValue;

		const pbData = {
			rating: progress.rating
		};
		await pb.collection('reading_progress').update(progress.id, pbData);
	}


	console.log(progress)

	let config: any = {
		readOnly: false,
		countStars: 5,
		range: {min: 0, max: 5, step: 0.001},
		score: 0, 
			showScore: true,
		scoreFormat: function(){ return `(${this.score.toFixed(2)}/${this.countStars})` },
			starConfig: {
		size: 30,
		fillColor: '#F9ED4F',
		strokeColor: "#000000",
				unfilledColor: '#FFFFFF',
		strokeUnfilledColor: '#000000F'
		}
	}

	// Reactive statement to update score based on progress
	$: config.score = parseFloat(progress.rating);

</script>

<slot name="title"/>
<div class="flex">
	<Stars bind:config on:change={handleRatingChange}/>
	<slot />
</div>