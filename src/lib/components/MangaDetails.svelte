<script lang="ts">
    import { page } from "$app/stores";
	export let data: any;
</script>

<div class="w-full flex flex-col md:flex-row gap-4">
	<!-- manga image -->
	<div class="w-full md:w-1/5 h-full">
		<img
			class="w-full h-auto object-cover rounded-lg"
			src={`${import.meta.env.VITE_IMAGE_URL}${data.img}`}
			alt={data.title}
		/>
	</div>

	<!-- manga info -->
	<div class="w-full md:w-1/2 p-4 border rounded-lg shadow-md">
		<h2 class="text-xl font-bold mb-2">{data.title}</h2>
		<p class="mb-4">{data.description}</p>
		<a 
        class="btn btn-primary"
        href={`${$page.url.pathname}/${data.episodes[data.episodes.length - 1].chapterId}`}
        >Read First</a>
        <a 
        class="btn btn-primary"
        href={`${$page.url.pathname}/${data.episodes[0].chapterId}`}
        >Read Last</a>
	</div>

	<!-- manga stats -->
	<div class="  p-4 border rounded-lg shadow-md">
		<h2 class="text-xl font-bold mb-2">Manga Stats</h2>
		<div class="grid grid-cols-2 gap-4">
			<div class="flex flex-col">
				<span class="font-bold">Author:</span>

				<span>{data.author[0]}</span>
			</div>
			<div class="flex flex-col">
				<span class="font-bold">Genres:</span>
				{#each data.author.slice(1) as genre}
					<span>{genre}</span>
				{/each}
			</div>
			<div class="flex flex-col">
				<span class="font-bold">Artist:</span>
				<span>{data.artist}</span>
			</div>
			<div class="flex flex-col">
				<span class="font-bold">Views:</span>
				<span>{data.views}</span>
			</div>

			<div class="flex flex-col">
				<span class="font-bold">Last Updated:</span>
				<span>{data.lastUpdated}</span>
			</div>
		</div>
	</div>
</div>
