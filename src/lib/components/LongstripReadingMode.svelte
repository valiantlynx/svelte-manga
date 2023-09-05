<script lang="ts">
	import { page } from '$app/stores';
	export let data: any;
	export let currentPage: any;
	let imageWidth = '3/5'; // Default image width

	function setImageWidth(mode: string) {
		imageWidth = mode;
		currentPage.set(0); // Reset current page when switching reading modes
	}
</script>



<div class="flex flex-wrap justify-center max-w-full mx-auto">
	{#each data?.images as image}
		<div class={imageWidth == 'full' ? 'w-full lg:w-3/5' : 'w-full lg:w-3/5'}>
			<img
				src={image.imageUrl}
				alt={`${data.title} ${$page.params.chapterid} Page ${image.pageNumber}`}
				class="w-full rounded-lg shadow-md"
			/>
		</div>
	{/each}
</div>
