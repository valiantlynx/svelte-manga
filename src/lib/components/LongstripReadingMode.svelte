<script lang="ts">
	import { page } from '$app/stores';
	export let data: any;
	export let imageWidth: any;

</script>

<div class="flex flex-wrap justify-center max-w-full mx-auto">
	{#each data?.images as image}
		<div class={imageWidth == 'full' ? 'w-full' : 'w-3/5'}>
			<img
				src={image.imageUrl}
				alt={`${data.title} ${$page.params.chapterid} Page ${image.pageNumber}`}
				class="w-full rounded-lg shadow-md mb-4"
			/>
		</div>
	{/each}
</div>
