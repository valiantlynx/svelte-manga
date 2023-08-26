<script lang="ts">
	export let manga: any;
	export let goToMangaChapters: any;

	const imageSrc = `${import.meta.env.VITE_HOST_URL}/api${manga.img}?width=200&height=300`;
</script>

<div class="w-full bg-base-300 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
	<button
		class=" w-full"
		on:click={() => goToMangaChapters(manga.id)}
		on:keypress={() => goToMangaChapters(manga.id)}
	>
		<img
			class=" w-full group-hover:opacity-75 overflow-hidden rounded-t-xl"
			src={imageSrc}
			alt={manga.title}
		/>

		<div class="px-4 py-3 w-full">
			<span class=" mr-3 uppercase text-xs">{manga.author[0]}</span>
			<p class="text-lg font-bold truncate block capitalize">{manga.title}</p>
			<div class="flex items-center">
				<p class=" text-accent border-accent text-sm font-semibold cursor-auto">
					{manga.latestChapter}
				</p>
				<div class="ml-auto">
					<div class="rating rating-sm">
						<label class="cursor-auto" for="rating-8">{manga.rating}</label>
						<input type="radio" name="rating-8" class="mask mask-star-2 bg-info" checked />
					</div>
				</div>
			</div>
		</div>
	</button>
</div>
