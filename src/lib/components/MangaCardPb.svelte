<script lang="ts">
	export let manga: any;
</script>

<div
	class="w-full bg-neutral text-neutral-content shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
>
	<a class=" w-full" href={'/manga/' + manga.sourceid} target="_self">
		<img
			class=" w-full group-hover:opacity-75 overflow-hidden rounded-t-xl"
			src={manga.img}
			alt={manga.title}
		/>

		<div class="px-4 py-3 w-full">
			<span class="mr-3 uppercase text-xs truncate block">{manga.title}</span>
			<p class="text-lg font-bold truncate block capitalize">{manga.title}</p>
			<div class="flex items-center">
				<p class="text-sm font-semibold cursor-auto truncate block">
					{manga.latestChapter}
				</p>
				<div class="ml-auto">
					<div class="rating rating-sm">
						<label class="cursor-auto" for="rating-8">:{manga.views}</label>
						<input type="radio" name="rating-8" class="mask mask-star-2 bg-info" checked />
					</div>
				</div>
			</div>
		</div>
	</a>
</div>
