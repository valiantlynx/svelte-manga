<script lang="ts">
	import Stars from "$lib/components/stars/Stars.svelte";

	export let progress: any;
	export let handleRatingChange: any;

	let config: any = {
		readOnly: false,
    countStars: 5,
    range: {min: 0, max: 5, step: 0.001},
    score: parseFloat(progress.rating),
		showScore: true,
    scoreFormat: function(){ return `(${this.score.toFixed(0)}/${this.countStars})` },
		starConfig: {
      size: 30,
      fillColor: '#F9ED4F',
      strokeColor: "#000000",
			unfilledColor: '#FFFFFF',
      strokeUnfilledColor: '#000000F'
    }
  }
	
	const changeSliderInput = () => console.table(config);
</script>

<slot name="title"/>
<Stars bind:config on:change={changeSliderInput}/>

